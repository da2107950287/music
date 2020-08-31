// import danmuHtml from './index.html'
// import danmuControl from './danmu-control.html'
// import danmuInput from './danmu-input.html'
import './index.scss'
// import {CommentManager} from 'comment-core-library/build/CommentCoreLibrary'
import CommentManager from "../../../assets/js/commentmanager"
// import 'comment-core-library/build/style.css'
import { parseDom, isElement } from '../../../assets/js/utils'
import { ElSwitch } from 'element-ui'

/**
 * 弹幕组件
 */
export default class AliplayerDanmuComponent {
  /**
   * @constructor 弹幕组件构造函数
   * @param {Array danmuList 弹幕数组, 参考 CommentCoreLibrary 文档 https://github.com/jabbany/CommentCoreLibrary/}
   * @param {id 或者 Element, sendEl, 发送弹幕的输入框, 默认为 null}  
   */
  constructor(danmukuList, sendEl = 'controlbar') {
    this.sendEl = sendEl
    this.danmukuList = danmukuList
    this.html = parseDom(`<div class="aliplayer-danmuku abp">
    <div class="danmu container"></div>
   </div>`)
    this.danmuControlHtml = parseDom(`<div class="ali-danmuku-control">
    <div class="ali-danmu-input-wrap"></div>
    <div class="toggle-button-wrapper">
    <input type="checkbox" id="toggle-button" name="switch">
    <label for="toggle-button" class="button-label">
        <span class="circle"></span>
        <span class="text on">弹幕</span>
        <span class="text off">弹幕</span>
    </label>
</div>
  </div>`)
    // <i class="iconfont icon-danmu-close"></i>
    //   <div class="player-tooltip close"></div>
    //   <i class="iconfont icon-danmu-open" style="display: none;"></i>
    //   <div class="player-tooltip open"></div>  
    this.sendEl = sendEl
    this.danmuInput = sendEl === null ? null : parseDom(`<div class="ali-danmu-input">
    <input type="text" placeholder="">
    <button class="danmu-input-enter"></button>
  </div>`)
    this.CM = null
    this.userDanmuOpen = true     // 用户打开关闭弹幕的状态, 默认为 true 打开
  }

  createEl(el, player) {
    const lang = player._options && player._options.language
    this.isEn = lang && lang === 'en-us'
    if (this.danmuInput !== null) {
      this.danmuInput.querySelector('.danmu-input-enter').innerText = this.isEn ? 'Enter' : '发送'
      this.danmuInput.querySelector('input').setAttribute('placeholder', this.isEn ? 'Input danmu' : '输入弹幕')
    }

    // this.danmuControlHtml.querySelector('.player-tooltip.close').innerText = this.isEn ? 'Close Bullect' : '关闭弹幕'
    // this.danmuControlHtml.querySelector('.player-tooltip.open').innerText = this.isEn ? 'Open Bullect' : '打开弹幕'

    if (this.sendEl === 'controlbar') {
      let danmuInputWrapEle = this.danmuControlHtml.querySelector('.ali-danmu-input-wrap')
      danmuInputWrapEle.style.display = 'inline-block'
      danmuInputWrapEle.appendChild(this.danmuInput)
    } else if (this.sendEl !== null) {
      if (isElement(this.sendEl)) {
        this.sendEl.appendChild(this.danmuInput)
      } else if (typeof this.sendEl === 'string') {
        let sendEl = document.querySelector(this.sendEl)
        if (isElement(sendEl)) {
          sendEl.appendChild(this.danmuInput)
        } else {
          throw new Error('sendEl must be an element or selector string')
        }
      } else {
        throw new Error('sendEl must be an element or selector string')
      }
    }

    el.querySelector('.prism-controlbar').appendChild(this.danmuControlHtml)
    let videoSiblingElement = el.querySelector('video').nextElementSibling
    if (videoSiblingElement) {
      el.insertBefore(this.html, videoSiblingElement)
    } else {
      el.appendChild(this.html)
    }
    this.CM = new CommentManager(this.html.querySelector('.danmu'))     // 初始化 CommentManager

    this.CM.init()
    this.CM.load(this.danmukuList)

    /* 根据视频播放器的 timeupdate 事件更新弹幕的事件轴   */
    el.querySelector('video').ontimeupdate = () => {
      if (el.querySelector('video') !== null) {
        this.CM.time(el.querySelector('video').currentTime * 1000)
      }
    }

    let danmuCloseElement = this.danmuControlHtml.querySelector('.off')
    let danmuOpenElement = this.danmuControlHtml.querySelector('.on')
    /* 绑定控制条关闭弹幕处理函数 */
    danmuCloseElement.onclick = () => {
      this.userDanmuOpen = false
      danmuCloseElement.style.display = 'none'
      danmuOpenElement.style.display = 'inline-block'
      this.CM.clear()
      this.CM.stop()
    }
    /* 绑定控制条打开弹幕控制条 */
    danmuOpenElement.onclick = () => {
      danmuOpenElement.style.display = 'none'
      danmuCloseElement.style.display = 'inline-block'
      this.userDanmuOpen = true
      this.CM.start()
    }

    if (this.danmuInput !== null) {
      let danmuInputEle = this.danmuInput.querySelector('.ali-danmu-input input')
      let danmuEnter = this.danmuInput.querySelector('.danmu-input-enter')

      danmuEnter.onclick = this.sendDanmuHandle.bind(this)

      danmuInputEle.onkeydown = (e) => {
        if (e.keyCode === 13) {
          this.sendDanmuHandle.call(this)
        }
      }

    }
  }

  // 弹幕发送按钮点击事件和弹幕输入框按下 enter 键, 处理事件
  sendDanmuHandle(message) {
    console.log(message, "hjdhaj")
    let danmuInputEle = this.danmuInput.querySelector('.ali-danmu-input input')
    let danmuText = danmuInputEle.value || message
    let commentSize = [16, 18, 25, 36, 45]
    let commentColor = [0xffffff, 0x0000ff, 0xcc0000, 0xff66ff, 0xffff33]
    if (danmuText === '') {
      return
    }

    this.send({
      "mode": 1,
      "text": danmuText,
      "stime": 1000,
      "size": commentSize[this.randomIndex(5)],
      "color": commentColor[this.randomIndex(5)]
    })
    danmuInputEle.value = ''
    danmuInputEle.focus()
  }

  randomIndex(max) {
    return Math.floor(Math.random() * max)
  }

  play(player, e) {
    if (this.userDanmuOpen) {
      this.CM.start()
    }
  }

  pause(player, e) {
    if (this.userDanmuOpen) {
      this.CM.stop()
    }
  }

  send(danmuku) {
    console.log(danmuku)
    this.CM.send(danmuku)
  }

  /**
   * 暴露出去的插入弹幕的方法
   * @param {Object danmuku 弹幕对象 只能一条一条插入}
   */
  insert(danmuku) {
    this.CM && this.CM.insert(danmuku)
  }

  dispose() {
    if (this.danmuInput !== null) {
      this.danmuInput.parentNode && this.danmuInput.parentNode.removeChild(this.danmuInput)
    }
  }
}