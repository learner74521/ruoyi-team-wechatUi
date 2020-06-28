const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}
const app = getApp();
var SocketTask;
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    envId: String,
    collection: String,
    groupId: String,
    groupName: String,
    userInfo: Object,
    getRoomId: Number,
    onGetUserInfo: {
      type: Function,
    },
    getOpenID: {
      type: Function,
    },
  },

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    chats: [],
    textInputValue: '',
    openId: app.globalData.openid,
    scrollTop: 0,
    InputBottom: 0,
    scrollToMessage: '',
    hasKeyboard: false,
    sendText: '1'
  },
  lifetimes: {
    attached:function(e){
        this.setData({
          openId:app.globalData.openid
        })
    },
    ready: function (e) {
      var that = this;
      that.connectSocket();
      SocketTask.onOpen(res => {
        console.log('监听 WebSocket 连接打开事件。', res)

      })
      SocketTask.onError(onError => {
        console.log('监听 WebSocket 错误。错误信息', onError)
        this.webSocket();
      })

      SocketTask.onMessage(onMessage => {
        console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
        var onMessage_data = JSON.parse(onMessage.data)
        
          that.setData({
            chats: onMessage_data
          })
         
      
      })
    },

    detached: function () {
      SocketTask.close({
        success: function (res) {
          console.log("已关闭 WebSocket", res)
        },
        fail: function (res) {
          console.log("关闭 WebSocket失败", res)
        }
      })
      SocketTask.onClose(onClose => {
        console.log('监听 WebSocket 连接关闭事件。', onClose)
      })
    },

  },
  methods: {
    //键盘上升高度
    InputFocus(e) {
      this.setData({
        InputBottom: e.detail.height
      })
    },
    InputBlur(e) {
      this.setData({
        InputBottom: 0
      })
    },
    send: function (e) {
      var msg = {
        newsUserOpenid:this.data.openId,
        newsRoomId:111,
        newsImage:'',
        newsContent: 'china',
        wxChatUserInfo:{
          creatorAvatar:app.globalData.userInfo.avatarUrl,
          creatorName:app.globalData.userInfo.nickName,
        }
      }
      var that = this;
      console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
      SocketTask.send({
          data: JSON.stringify(msg)

        },
        function () {
          console.log('已发送', res)
        })
    },
    /**
     * 断开重新连接
     */
    webSocket: function () {
      console.log("开始重新连接")
      this.connectSocket();
    },
    /**
     * 创建一个 WebSocket 连接
     */
    connectSocket: function () {
      var openid = app.globalData.openid;
      var roomid = this.properties.getRoomId
      SocketTask = wx.connectSocket({
        url: "ws://localhost:80/wechatapi/" + openid + "/" + roomid,
        header: {
          'content-type': 'application/json'
        },
        method: 'post',
        success: function (res) {
          console.log('WebSocket连接创建', res)
          console.log('成功', res)
        },
        fail: function (err) {
          wx.showToast({
            title: '网络异常！',
          })
          console.log(err)
        },
      })
    },
    onGetUserInfo(e) {
      this.properties.onGetUserInfo(e)
    },
    getOpenID() {
      return this.properties.getOpenID()
    },
    async onChooseImage(e) {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: async res => {
          const {
            envId,
            collection
          } = this.properties
          const doc = {
            _id: `${Math.random()}_${Date.now()}`,
            groupId: this.data.groupId,
            avatar: this.data.userInfo.avatarUrl,
            nickName: this.data.userInfo.nickName,
            msgType: 'image',
            sendTime: new Date(),
            sendTimeTS: Date.now(), // fallback
          }

          this.setData({
            chats: [
              ...this.data.chats,
              {
                ...doc,
                _openid: this.data.openId,
                tempFilePath: res.tempFilePaths[0],
                writeStatus: 0,
              },
            ]
          })
          this.scrollToBottom(true)

          const uploadTask = wx.cloud.uploadFile({
            cloudPath: `${this.data.openId}/${Math.random()}_${Date.now()}.${res.tempFilePaths[0].match(/\.(\w+)$/)[1]}`,
            filePath: res.tempFilePaths[0],
            config: {
              env: envId,
            },
            success: res => {
              this.try(async () => {
                await this.db.collection(collection).add({
                  data: {
                    ...doc,
                    imgFileID: res.fileID,
                  },
                })
              }, '发送图片失败')
            },
            fail: e => {
              this.showError('发送图片失败', e)
            },
          })

          uploadTask.onProgressUpdate(({
            progress
          }) => {
            this.setData({
              chats: this.data.chats.map(chat => {
                if (chat._id === doc._id) {
                  return {
                    ...chat,
                    writeStatus: progress,
                  }
                } else return chat
              })
            })
          })
        },
      })
    },

    onMessageImageTap(e) {
      wx.previewImage({
        urls: [e.target.dataset.fileid],
      })
    },

    scrollToBottom(force) {
      if (force) {
        console.log('force scroll to bottom')
        this.setData(SETDATA_SCROLL_TO_BOTTOM)
        return
      }

      this.createSelectorQuery().select('.body').boundingClientRect(bodyRect => {
        this.createSelectorQuery().select(`.body`).scrollOffset(scroll => {
          if (scroll.scrollTop + bodyRect.height * 3 > scroll.scrollHeight) {
            console.log('should scroll to bottom')
            this.setData(SETDATA_SCROLL_TO_BOTTOM)
          }
        }).exec()
      }).exec()
    },

    async onScrollToUpper() {
      if (this.db && this.data.chats.length) {
        const {
          collection
        } = this.properties
        const _ = this.db.command
        const {
          data
        } = await this.db.collection(collection).where(this.mergeCommonCriteria({
          sendTimeTS: _.lt(this.data.chats[0].sendTimeTS),
        })).orderBy('sendTimeTS', 'desc').get()
        this.data.chats.unshift(...data.reverse())
        this.setData({
          chats: this.data.chats,
          scrollToMessage: `item-${data.length}`,
          scrollWithAnimation: false,
        })
      }
    }
  }
})