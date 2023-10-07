export function saveObjArr(name, data) {
  // localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

export function getObjArr(name) {
  // localStorage 获取数组对象方法
  const result = window.localStorage.getItem(name)
  if (result && result !== 'undefined') {
    return JSON.parse(result)
  }
  return false
}

export function clearLocalStorage(name) {
  localStorage.removeItem(name)
}
