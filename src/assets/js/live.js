/**
 * 观看直播 WEB SDK 方法封装
 * */
// let DWLive = window.DWLive;

class HuodeScene {
  constructor() {
    DWLive = window.DWLive;
  }

  login(options) {
    if (
      typeof options !== "object" ||
      !DWLive ||
      typeof DWLive.init !== "function"
    ) {
      return false;
    }

    DWLive.init({
      userid: options.userId,
      roomid: options.roomId,
      viewername: options.viewerName,
      // viewertoken: options.viewerToken,
      viewercustomua: "web",
      isH5play: false,// 是否是h5播放器,观看直播PC端使用flash，移动端使用h5播放器
      fastMode: true
    });

    DWLive.onLoginSuccess = function (result) {
      options.success && options.success(result);
    };

    DWLive.onLoginError = function (error) {
      options.fail && options.fail(error);
    };
  }
  liveStart(callback) {

    DWLive.onLiveStart = function (result) {
      callback && callback(result);
    };
  }

  destroy(options) {
    // 销毁实例
    DWLive.destroy && DWLive.destroy();
    // 退出登录
    DWLive.logout &&
      DWLive.logout({
        success(data) {
          options.success && options.success(data);
        },
        error(data) {
          options.fail && options.fail(data);
        }
      });
  }

  showControl(show) {
    const _show = !!show;
    DWLive.showControl && DWLive.showControl(_show);
    console.log("控制条显示隐藏")
  }

  docAdapt(adapt) {
    const _adapt = !!adapt;
    DWLive.docAdapt && DWLive.docAdapt(_adapt);
  }

  setSound(volume) {
    const _volume = parseFloat(volume);
    DWLive.setSound && DWLive.setSound(_volume);
  }

  toggleBarrage(isBarrage) {
    const _isBarrage = !!isBarrage;
    console.log(isBarrage, _isBarrage)
    // 打开视频弹幕
    DWLive.openBarrage && DWLive.openBarrage(_isBarrage);
    // 打开关闭文档弹幕
    if (_isBarrage) {
      DWLive.openDocBarrage && DWLive.openDocBarrage();

    } else {
      DWLive.closeDocBarrage && DWLive.closeDocBarrage();
    }
  }

  sendBarrage(message = "", color = "0xffffff") {
    if (typeof message !== "string") {
      return false;
    }
    // 发送弹幕，color为十六进制颜色值(0xffffff)，仅支持PC端
   console.log(message)
    DWLive.barrage && DWLive.barrage(message, color);

  }

  sendPublicChatMsg(message = "") {
    if (typeof message !== "string") {
      return false;
    }
    DWLive.sendPublicChatMsg && DWLive.sendPublicChatMsg(message);
  }

  requestInteraction(
    options = {
      video: true,
      audio: true
    }
  ) {
    if (typeof options !== "object") {
      return false;
    }
    DWLive.requestInteraction({
      video: options.video,
      audio: options.audio
    });
  }

  hangupInteraction() {
    DWLive.hangupInteraction && DWLive.hangupInteraction();
  }

  getPublishingQuestionnaire() {
    DWLive.getPublishingQuestionnaire && DWLive.getPublishingQuestionnaire();
  }

  submitQuestionnaire(options, callback) {
    if (typeof options !== "object" || !DWLive.submitQuestionnaire) {
      return false;
    }
    DWLive.submitQuestionnaire(options, function (result) {
      callback && callback(result);
    });
  }

  //提交打卡
  submitAttendance(pid, callback) {
    if (typeof pid !== "string" || !DWLive.hdCommitPunch) {
      return false;
    }
    DWLive.hdCommitPunch(pid, function (result) {
      callback && callback(result);
    });
  }

  //开始打卡
  onStartAttendance(callback) {
    //观看直播过程中，讲师发送打卡
    DWLive.onHdLiveStartPunch = function (result) {
      if (
        !result ||
        typeof result !== "object" ||
        JSON.stringify(result) === "{}"
      ) {
        return;
      }
      const datas = {
        pid: result.punchId,
        expireTime: result.expireTime,
        remainDuration: result.remainDuration
      };
      callback && callback(datas);
    };
    // 打卡中刚进入直播间打开回调，无打卡无回调
    DWLive.getHDPunchInfo = function (result) {
      const data = result.data;
      if (!result.success || !data.isExists) {
        return;
      }
      const datas = {
        pid: data.punch.id,
        expireTime: data.punch.expireTime,
        remainDuration: data.punch.remainDuration
      };
      callback && callback(datas);
    };
  }

  //结束打卡
  onEndAttendance(callback) {
    DWLive.onHdLiveStopPunch = function (result) {
      callback && callback(result);
    };
  }

  onAnnouncement(callback) {
    // 刚进入直播间显示公告
    DWLive.onAnnouncementShow = data => {
      callback(data);
    };
    // 直播过程中发布或修改公告
    DWLive.onAnnouncementRelease = data => {
      callback(data);
    };
    // 删除公告
    DWLive.onAnnouncementRemove = data => {
      callback(data);
    };
  }

  onInformation(callback) {
    // 禁言后发送公聊回调
    DWLive.onInformation = data => {
      callback(data);
    };
  }

  onBanChat(callback) {
    // 群体禁言
    DWLive.onBanChat = data => {
      callback(data);
    };
  }

  onUnBanChat(callback) {
    // 群体解禁言
    DWLive.onUnBanChat = data => {
      callback(data);
    };
  }

  onQuestionnairePublish(callback) {
    DWLive.onQuestionnairePublish = data => {
      if (data.questionnaireId) {
        this.getPublishingQuestionnaire();
      } else {
        callback && callback(data);
      }
    };
    this.getPublishingQuestionnaire();
  }

  onQuestionnairePublishStop(callback) {
    DWLive.onQuestionnairePublishStop = function (data) {
      callback && callback(data);
    };
  }

  onLoginSuccess(callback) {
    DWLive.onLoginSuccess = function (result) {
      callback && callback(result);
    };
  }

  onLoginError(callback) {
    DWLive.onLoginError = function (error) {
      callback && callback(error);
    };
  }

  onPlayerLoad(callback) {
    DWLive.onPlayerLoad = function (video) {
      callback && callback(video);
    };
  }

  onUserCount(callback) {
    DWLive.onUserCountMessage = function (count) {
      callback && callback(count);
    };
  }

  onOnlineTeachers(callback) {
    DWLive.onOnlineTeachers = function (count) {
      callback && callback(count);
    };
  }

  // 接受公聊事件
  onPublicChatMessage(callback) {
    DWLive.onPublicChatMessage = function (message) {
      callback && callback(message);
    };
  }

  // 聊天审核事件
  onPublicChatLogManage(callback) {
    DWLive.onPublicChatLogManage = function (message) {
      callback && callback(message);
    };
  }

  // 获取直播间配置信息，如：连麦
  onRoomSetting(callback) {
    DWLive.onRoomSetting = function (options) {
      callback && callback(options);
    };
  }

  // 接受连麦
  onInteractionAccept(callback) {
    window.on_cc_live_interaction_accept = function (type) {
      callback && callback(type);
    };
  }

  // 挂断连麦
  onInteractionDisconnect(callback) {
    window.on_cc_live_interaction_disconnect = function (data, type) {
      callback && callback(data, type);
    };
  }

  // 连麦接通
  onInteractionRemoteMedia(callback) {
    window.on_cc_live_interaction_remote_media = function (
      type,
      chatuser,
      stream
    ) {
      callback && callback(type, chatuser, stream);
    };
  }

  // 请求连麦 60s 内没有接受，超时断开
  onInteractionRequestTimeout(callback) {
    window.on_cc_live_interaction_request_timeout = function (type) {
      callback && callback(type);
    };
  }

  // 取消连麦
  onInteractionCancal(callback) {
    window.on_cc_live_interaction_cancal = function (type) {
      callback && callback(type);
    };
  }

  // 连麦定时器
  onInteractionInterval(callback) {
    window.on_cc_live_interaction_interval = function (type, time) {
      callback && callback(type, time);
    };
  }

  // 获取本地流信息
  onInteractionLocalMedia(callback) {
    window.on_cc_live_interaction_local_media = function (type, stream) {
      callback && callback(type, stream);
    };
  }

  // 请求互动错误
  onInteractionError(callback) {
    window.on_cc_live_interaction_error = function (type, error, message) {
      callback && callback(type, error, message);
    };
  }
}

export default HuodeScene;