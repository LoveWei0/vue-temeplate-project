/**
 * 去除参数中的空格字符
 * @param {*} obj
 */
export const objValueTrim = obj => {
  const newObj = {}
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      newObj[key] = obj[key]
    } else {
      newObj[key] = Number.isFinite(obj[key])
        ? +obj[key].toString().trim()
        : obj[key]
        ? obj[key].toString().trim()
        : ''
    }
  }
  return newObj
}

// 过滤数据中的空
export const objCleanEmpty = obj => {
  const newParams = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      if (element !== null && element !== '') {
        newParams[key] = element
      }
    }
  }
  return newParams
}
