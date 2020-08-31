export function parseDom (html) {
  let ele = document.createElement('div')
  ele.innerHTML = html
  return ele.childNodes[0]
}
export function isElement(value) {
  return isObjectLike(value)
  //判断value是一个object-like对象
}