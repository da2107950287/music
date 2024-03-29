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
  let qs = location.href.split('?')[1] || '',
    args = {},
    items = qs.length ? qs.split("&") : [];
  items.forEach((item, i) => {
    let arr = item.split('='),
      name = decodeURIComponent(arr[0]),
      value = decodeURIComponent(arr[1]);
    name.length && (args[name] = value)
  })
  return args;
}
export function shieldEmoticon(message) {
  let msg = message;
  msg = msg.replace(/\[em2_(0[1-9]|1[0-9]|20)\]/ig, " ");
  msg = msg.replace(/\[em2_(20[1-9]|2[1-9][0-9]|300)\]/ig, " ");
  return msg;
}
export function showEm(str) {
  if (!$.trim(str)) {
    return '';
  }
  str = str.replace(/\</g, '&lt;');
  str = str.replace(/\>/g, '&gt;');
  str = str.replace(/\n/g, '<br/>');
  str = str.replace(/\[em_([0-9]*)\]/g, '<img src="//view.csslcloud.net/img/em/$1.gif" border="0" style="width:20px" />');
  str = str.replace(/\[em2_([0-9]*)\]/g, '<img src="//view.csslcloud.net/img/em2/$1.png" border="0" style="width:20px"/>');

  var nmsg = '';    //解析表情
  $.each(str.split(' '), function (i, n) {
    n = $.trim(n);
    if (n.indexOf('[uri_') == 0 && n.indexOf(']') == n.length - 1 && n.length > 6) {
      var u = n.substring(5, n.length - 1) + ' ';
      console.log(u)
      nmsg += '<a target="_blank" style="color: #2f53ff" href="' + u + '">' + u + '</a>' + ' ';
    } else {
      nmsg += n + ' ';
    }

  });

  // var nmsg = '';      //解析图片
  var reg = new RegExp(/\[img_http(s)?:\/\/(.*?)\]/g);
  var isImage = reg.test(str)
  if (isImage) {

    var sIndex = str.indexOf('_') + 1;
    nmsg = str.slice(sIndex, str.length - 1);
    var imgTag = '<div class="chatImage" style="width: 100%" ><img src="' + nmsg + '"  style="width: 100%;cursor:pointer;" /></div>';
    return imgTag;
  }

  return nmsg;
}
