

import { parseDom } from '../../../assets/js/utils'

/**
 * 倍速播放组件
 */
export default class RateComponent {
  /**
   * @constructor 倍速播放组件构造函数
   */
  constructor() {
    this.html = parseDom(`<div id="rate-components" class="rate-components">
    <div class="current-rate">x1.0</div>
    <ul class="rate-list">
      <li class="li" data-rate="2.0">x2.0</li>
      <li class="li" data-rate="1.5">x1.5</li>
      <li class="li" data-rate="1.25">x1.25</li>
      <li class="li"  data-rate="1.0" class="current">x1.0</li>
      <li class="li" data-rate="0.5">x0.5</li>
    </ul>
  </div>`)
  }

  createEl(el) {
    let eleControlbar = el.querySelector('.prism-controlbar')
    eleControlbar.appendChild(this.html)
  }

  ready(player, e) {
    let currentRateEle = this.html.querySelector('.current-rate')
    let rateListEle = this.html.querySelector('.rate-list')
    let timeId = null

    // 隐藏设置里面的倍速播放
    let settingRate = document.querySelector('.prism-setting-item.prism-setting-speed')
    if (settingRate) {
      settingRate.classList.add('player-hidden')
    }

    currentRateEle.onclick = () => {
      rateListEle.style.display = 'block'
    }
    currentRateEle.onmouseleave = () => {
      timeId = setTimeout(() => {
        rateListEle.style.display = 'none'
      }, 100);
    }

    rateListEle.onmouseenter = () => {
      clearTimeout(timeId)
    }
    rateListEle.onmouseleave = () => {
      rateListEle.style.display = 'none'
    }

    rateListEle.onclick = ({ target }) => {
      let rate = target.dataset.rate
      if (rate) {
        player.setSpeed(rate)
        if (target.className !== 'current') {
          let currentEle = rateListEle.querySelector('.current')
          if (currentEle) {
            currentEle.className = ''
          }
          target.className = 'current'
        }
        rateListEle.style.display = 'none'
        currentRateEle.innerText = rate + 'x'

      }
    }
  }

}