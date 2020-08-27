/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

// for react native
// var location = {
//     protocol: "https"
// }

function getUrl(){
    var apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
    var xmppUrl = "//im-api-v2.easemob.com/ws"
    if(window.location.href.indexOf("www.test.com") !== -1 ){
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
        xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
    }
    else if(window.location.href.indexOf("172.17.1.95") !== -1){
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
        xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
    }
    else if(window.location.href.indexOf("localhost") !== -1){
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
        xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
    }
    return {
        apiUrl: apiUrl,
        xmppUrl: xmppUrl
    }
}


var config = {
    socketServer: '//im-api-v2.easemob.com/ws',    // socket Server地址

    restServer: '//a1.easemob.com',               // rest Server地址
    
    appkey: '1131200717046573#mustard',        // App key
    
    https : false,                            // 是否使用https
    
    isHttpDNS: true,                          // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl 
    
    isMultiLoginSessions: false,              // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能
    
    isDebug: false,                           // 打开调试，会自动打印log，在控制台的console中查看log
    
    autoReconnectNumMax: 2,                   // 断线重连最大次数
    
    heartBeatWait: 30000,                     // 心跳间隔（只在小程序中使用）
    
    delivery: true,                           // 是否发送已读回执
    
    useOwnUploadFun: false         // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传url）
}
export default config
