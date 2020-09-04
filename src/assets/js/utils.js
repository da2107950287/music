export function parseDom(html) {
  let ele = document.createElement('div')
  ele.innerHTML = html
  return ele.childNodes[0]
}
export function isElement(value) {
  return isObjectLike(value)
  //判断value是一个object-like对象
}
export function getRequest() {
  var url;
  if (window.location.hash) {
    url = window.location.hash;
    url = "?"+url.split("?")[1];
    
  } else {
    url = window.location.search; //获取url中"?"符后的字串
  }
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  console.log(theRequest)
  return theRequest;
}
