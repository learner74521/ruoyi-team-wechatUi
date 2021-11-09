const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}
const app = getApp();
const dataUrl = require('../../util/dataUrl/dataUrl.js');
const uploadAliyun = require('../../util/request/aliyunOss/uploadAliyun');
var SocketTask;
const innerAudioContext = wx.createInnerAudioContext()
const rm = wx.getRecorderManager();
//录音停止时调用

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
    }
  },

  data: {
    https: "https://img.linkcool.fun/",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    chats: [],
    openId: '',
    hasNews: false,
    textInputValue: '',
    scrollTop: 0,
    InputBottom: 0,
    scrollToMessage: '',
    hasKeyboard: false,
    sendText: '1',
    imgUrlList: [],
    isplay: false, //是否播放。默认否
    //录音
    hasRecord: false,
    isDot: "block",
    isTouchStart: false,
    isTouchEnd: false,
    value: '100',
    touchStart: 0,
    touchEnd: 0,
    vd: ''
  },
  //组件生命周期
  lifetimes: {
    attached: function (e) {
      this.setData({
        openId: app.globalData.openid,
        userInfo: app.globalData.userInfo
      })
      var that = this
      wx.authorize({
        scope: "scope.record",
        success: function () {
          console.log("录音授权成功");
        },
        fail: function () {
          console.log("录音授权失败");
        }
      })
      rm.onStop(e => {
        wx.showModal({
          title: '温馨提示',
          content: '录制已完成',
          cancelText: '重录',
          confirmText: '发送',
          success: res => {
            if (res.confirm) {
              var item = e.tempFilePath
              uploadAliyun.asyncUpload(item, 'audio').then(res => {
                setTimeout(function () {
                  that.send("audio", res.data), 100
                  that.setData({
                    modalName: ''
                  })
                });
              })
            }
          }
        })
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
          chats: onMessage_data.newsList.rows,
          hasNews: true
        })
        if (that.data.hasNews) {
          that.scrollToBottom(true)
        }
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
      innerAudioContext.stop()
    },

  },
  methods: {
    //获得焦点时键盘上升高度
    InputFocus(e) {
      this.setData({
        InputBottom: e.detail.height
      })
      console.log(e.detail.height)
    },
    //失去焦点键盘收起
    InputBlur(e) {
      this.setData({
        InputBottom: 0
      })
    },
    //发送消息
    send: function (type, write) {
      if (this.check(write)) {
        if (type == "image" || type == "audio") {
          var newsImage = write;
          var newsContent = '';
        } else {
          var newsImage = '';
          var newsContent = write;
        }
        var msg = {
          newsUserOpenid: this.data.openId,
          newsRoomId: this.properties.getRoomId,
          newsImage: newsImage,
          newsType: type,
          newsContent: newsContent,
          wxChatUserInfo: {
            creatorAvatar: app.globalData.userInfo.avatarUrl,
            creatorName: app.globalData.userInfo.nickName,
          }
        }
        console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
        SocketTask.send({
          data: JSON.stringify(msg)
        })
      }
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
      var wxChatUrl = dataUrl.wxChatUrl;
      var openid = app.globalData.openid;
      var roomid = this.properties.getRoomId
      SocketTask = wx.connectSocket({
        url: wxChatUrl + openid + "/" + roomid,
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
    //获取文本内容
    onTextBindnput: function (e) {
      var textInputValue = e.detail.value;
      this.setData({
        textInputValue: textInputValue
      })
    },
    //验证用户是否授权
    onGetUserInfo(e) {
      this.properties.onGetUserInfo(e)
    },
    //发送文本按钮
    onConfirmSendText: function (e) {
      var writeText = this.data.textInputValue
      this.send("text", writeText)
      this.setData({
        textInputValue: '',
      })
    },
    //选择图片并上传
    onChooseImage: function () {
      var that = this;
      var imgList = [];
      wx.showActionSheet({
        itemList: ['从手机相册选择', '拍照'],
        success: function (res) {
          if (res.tapIndex == 0) {
            wx.chooseImage({
              count: 4,
              sizeType: ['original', 'compressed'],
              sourceType: ['album'],
              success: res => {
                imgList = res.tempFilePaths
                console.log(imgList)
                var uploadData = []
                imgList.forEach(function (item, index) {
                  uploadAliyun.asyncUpload(item, 'images').then(res => {
                    console.log(res)
                    uploadData.push({
                      'index': index,
                      'imageUrl': res.data
                    })
                    uploadData.forEach(function (item, index) {
                      setTimeout(function () {
                        that.send("image", item.imageUrl), 100
                      });
                    })
                  })
                })
              }
            })
          } else {
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
              sourceType: ['camera'], //从相册选择
              success: res => {
                uploadAliyun.asyncUpload(res.tempFilePaths[0], 'images').then(res => {
                  setTimeout(function () {
                    that.send("image", res.data), 100
                  });
                })
              }
            })
          }
        }
      })
    },

    bindTouchStart: function (e) {
      this.startTime = e.timeStamp;
    },
    bindTouchEnd: function (e) {
      this.endTime = e.timeStamp;
    },
    //长按撤回
    withdrawTap: function (e) {
      var index = e.currentTarget.dataset.index
      var chats = this.data.chats;
      var createTime = chats[index].createTime;
      var createtime = parseInt(createTime / 1000);
      var nowTimestamp = Date.parse(new Date());
      nowTimestamp = parseInt(nowTimestamp / 1000);
      var Dvaule = nowTimestamp - createtime
      if (Dvaule <= 180) { //少于两分钟可以撤回
        wx.showActionSheet({
          itemList: ['撤回消息'],
          success: function (res) {
            if (res.tapIndex == 0) {
              wx.showToast({
                title: '暂不提供此服务',
                icon: 'none'
              })
            }
          }
        })
      }
    },
    //显示图片
    onMessageImageTap(e) {
      if (this.endTime - this.startTime < 350) {
        wx.previewImage({
          urls: [e.target.dataset.fileid],
        })
      }
    },
    //播放音频
    playTap: function (e) {
      var audioIndex = e.currentTarget.dataset.index
      var audio = e.currentTarget.dataset.audio
      innerAudioContext.src = audio,
      innerAudioContext.autoplay = true //自动播放
      innerAudioContext.obeyMuteSwitch = false; //静音模式下可以听到声音
      innerAudioContext.play();
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
        this.setData({
          audioIndex: audioIndex,
          isplay: true
        })
      })
      innerAudioContext.onEnded(() => {
        innerAudioContext.stop()
        this.setData({
          audioIndex: audioIndex,
          isplay: false
        })
      })
      innerAudioContext.onError(() => {
        console.log(res.errMsg);
        console.log(res.errCode);
      })
    },
    //暂停音频
    pauseTap(e) {
      var audioIndex = e.currentTarget.dataset.index
      innerAudioContext.pause()
      this.setData({
        audioIndex: audioIndex,
        isplay: false
      })
    },
    //录制音频
    audioTap(e) {
      var _this = this;
      var scopeType = 'record'
      wx.getSetting({
        success: result => {
          if (result.authSetting['scope.' + scopeType] == true) {
            _this.setData({
              modalName: 'bottomModal'
            })
          } else {
            wx.showModal({
              title: '请求授权录音',
              content: '【组队吧】需要获取您的录音，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      // console.log('dataAu:success', dataAu)
                      if (dataAu.authSetting['scope.' + scopeType] == true) {
                        _this.setData({
                          modalName: 'bottomModal'
                        })
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none'
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
    },
    // 点击录音按钮
    onRecordClick: function () {
      wx.getSetting({
        success: function (t) {
          console.log(t.authSetting), t.authSetting["scope.record"] ? console.log("已授权录音") : (console.log("未授权录音"),
            wx.openSetting({
              success: function (t) {
                console.log(t.authSetting);
              }
            }));
        }
      });
    },
    /**
     * 长按录音开始
     */
    recordStart: function (e) {
      var that = this;
      rm.start({
          format: "mp3",
          sampleRate: 32e3,
          encodeBitRate: 192e3
        }),
        that.setData({
          touchStart: e.timeStamp,
          isTouchStart: true,
          isTouchEnd: false,
          showPg: true,
        })
      var a = 15,
        o = 10;
      this.timer = setInterval(function () {
        that.setData({
          value: that.data.value - 100 / 1500
        }), (o += 10) >= 1e3 && o % 1e3 == 0 && (a--, console.log(a), a <= 0 && (rm.stop(),
          clearInterval(that.timer),
          that.animation2.scale(1, 1).step(),
          that.setData({
            animationData: that.animation2.export(),
            showPg: false,
          })));
      }, 10);
    },
    /**
     * 长按录音结束
     */
    recordTerm: function (e) {
      rm.stop(),
        this.setData({
          isTouchEnd: true,
          isTouchStart: false,
          touchEnd: e.timeStamp,
          showPg: false,
          value: 100
        }), clearInterval(this.timer);
    },

    hideModal(e) {
      this.setData({
        modalName: ''
      })
    },
    //自动滚动到底部
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
    //校验符合条件
    check(write) {
      if (write == '' || write == null) {
        wx.showToast({
          title: '内容不能为空！',
          icon: 'none'
        })
        return false;
      }
      return true;
    },
    //触顶加载事件
    async onScrollToUpper() {}
  }
})