import WebIM from "assets/js/WebIM";
var Test = {
  state: {
    msgList: {
      contact: {},
      group: {},
      chatroom: {},
    },
    currentMsgs: []
  },
  getters: {
    onGetCurrentChatObjMsg(state) {
      return state.currentMsgs;
    },
  },
  mutations: {
    //更新消息列表
    updateMsgList(state, payload) {
      const { chatType, chatId, msg, bySelf, time, mid } = payload;
      let status = "unread";
      if (!state.msgList[chatType][chatId]) {
        state.msgList[chatType][chatId] = [{
          msg,
          bySelf,
          time: time || "",
          mid: mid,
          status: status,
          ...payload
        }];
      }
      else {
        state.msgList[chatType][chatId].push({
          msg,
          bySelf,
          type: time || "",
          mid: mid,
          status,
          ...payload
        });
      }
      state.currentMsgs = Object.assign({}, state.msgList[chatType][chatId]);
      state.msgList = Object.assign({}, state.msgList);
    },
  },
  actions: {
    //发送文本消息
    onSendText: function (context, payload) {
      const { chatType, chatId, message } = payload;
      const id = WebIM.conn.getUniqueId();
      const time = +new Date();
      const chatroom = chatType === "chatroom";
      const msgObj = new WebIM.message("txt", id);
      msgObj.set({
        msg: message,
        to: chatId,
        roomType: chatroom,
        success: function () {
          context.commit("updateMsgList", {
            chatType,
            chatId: chatId,
            msg: message,
            bySelf: true,
            time: time,
            mid: id,
            status: "sending"
          });
        },

        fail: function (e) {
          console.log("Send private text error", e);
        }
      });
      if (chatType === "group" || chatType === "chatroom") {
        msgObj.setGroup("groupchat");
      }
      WebIM.conn.send(msgObj.body);
    },
    //发送图片
		sendImgMessage: function (context, payload) {
			const { chatType, chatId, roomType, file, callback } = payload;
			const id = WebIM.conn.getUniqueId();
			const msgObj = new WebIM.message("img", id);
			msgObj.set({
				apiUrl: WebIM.config.apiURL,
				file: file,
				to: chatId,
				roomType: roomType,
				onFileUploadError: function (error) {
					console.log("图片上传失败", error);
					callback();
				},
				onFileUploadComplete: function (data) {
					let url = data.uri + "/" + data.entities[0].uuid;
					context.commit("updateMsgList", {
						msg: url,
						chatType,
						chatId: chatId,
						bySelf: true,
						type: "img",
						time: data.timestamp,
						mid: id,
						status: "sending"
					});
					callback();
				},
				success: function () {
					console.log("图片发送成功");
				}
			});
			if (chatType === "group" || chatType === "chatroom") {
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
  }
}
export default Test;