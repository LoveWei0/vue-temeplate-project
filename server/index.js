const Controller = require('./controller')
const http = require('http')
const server = http.createServer()

const controller = new Controller()

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    // @ts-ignore
    res.status = 200
    res.end()
    return
  }
  if (req.url === '/fileChunk/presence') {
    await controller.handleVerifyUpload(req, res)
    return
  }
  if (req.url === '/fileChunk/merge') {
    await controller.handleMerge(req, res)
    return
  }
  if (req.url === '/fileChunk') {
    await controller.handleFileChunk(req, res)
  }
  if (req.url === '/') {
    res.end('Welcome')
  }
})

server.listen(3000, () => console.log('正在监听3000端口'))
