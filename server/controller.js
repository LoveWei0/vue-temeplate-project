const multiparty = require('multiparty')
const path = require('path')
const fse = require('fs-extra')

/**
 * 获取文件后缀名
 * @param {*} filename
 * @returns 文件后缀
 */
const extractExt = filename => {
  return filename.slice(filename.lastIndexOf('.'), filename.length)
}

/**
 * 大文件存储目录
 */
const UPLOAD_DIR = path.resolve(__dirname, '..', 'target')

const pipeStream = (path, writeStream) => {
  new Promise(resolve => {
    const readStream = fse.createReadStream(path)
    readStream.on('end', () => {
      fse.unlinkSync(path)
      // @ts-ignore
      resolve()
    })
    readStream.pipe(writeStream)
  })
}

/**
 * 合并切片
 * @param {*} filePath 文件目录
 * @param {*} fileHash md5值
 * @param {*} size 切片的个数
 */
const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
  const chunkPaths = await fse.readdir(chunkDir)
  // 根据切片下标排序,否则直接读取目录,获得的顺序可能会出现错乱
  // @ts-ignore
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          // @ts-ignore
          end: (index + 1) * size
        })
      )
    )
  )
  fse.rmdirSync(chunkDir) // 合并后删除保存切片的目录
}

const resolvePost = req =>
  new Promise(resolve => {
    let chunk = ''
    req.on('data', data => {
      chunk += data
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })

/**
 * 返回已经上传切片数组
 * @param {*} fileHash
 * @returns 上传的文件流
 */
const createUploadedList = async fileHash =>
  fse.existsSync(path.resolve(UPLOAD_DIR, fileHash))
    ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash))
    : []

module.exports = class {
  // 合并切片
  async handleMerge(req, res) {
    const data = await resolvePost(req)
    const { md5, filename, fileChunkNum } = data
    const ext = extractExt(filename)
    const filePath = path.resolve(UPLOAD_DIR, `${md5}/${ext}`)
    await mergeFileChunk(filePath, md5, fileChunkNum)
    return rendAjax(res, {
      code: 2000,
      message: '合并成功'
    })
  }
  // 处理切片
  async handleFileChunk(req, res) {
    const multipart = new multiparty.Form()
    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        res.state = 500
        res.end('process file chunk failed')
        return
      }
      const [chunk] = files.file
      const [hash] = files.filename
      const [filename] = fields.fileName
      console.log('handleFileChunk->filename', filename)
      const filePath = path.resolve(UPLOAD_DIR, `${hash}`)
      const chunkDir = path.resolve(UPLOAD_DIR, hash)
      // 文件存在直接返回
      if (fse.existsSync(filePath)) {
        return rendAjax(res, {
          code: 2001,
          message: '文件已存在'
        })
      }
      // 切片目录不存在,创建切片目录
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }
      // fs-extra专用方法,fs.rename并且跨平台
      // fs-extra的rename方法windows平台会有权限问题
      try {
        await fse.move(chunk.path, path.resolve(chunkDir, filename))
      } catch (error) {
        console.log('handleFileChunk -> error', error)
      }
      rendAjax(res, {
        code: 200,
        message: '切片上传成功'
      })
      return
    })
  }
  // 验证是否已上传/已上传切片下标
  async handleVerifyUpload(req, res) {
    const data = await resolvePost(req)
    const { md5, fileName } = data
    const ext = extractExt(fileName)
    const filePath = path.resolve(UPLOAD_DIR, `${md5}/${ext}`)
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      )
    }
  }
}

/**
 * 传入JSON格式对象
 * @param {*} req .end结束时
 * @param {*} obj 目标对象
 */
const rendAjax = (req, obj) => {
  req.end(JSON.stringify(obj))
}
