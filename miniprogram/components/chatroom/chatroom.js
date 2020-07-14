const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}
const app = getApp();
const dataUrl=require('../../util/dataUrl/dataUrl');
const upload = require('../../util/request/upload');
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
    }
  },

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    chats: [],
    openId: '',
    hasNews:false,
    textInputValue: '',
    scrollTop: 0,
    InputBottom: 0,
    scrollToMessage: '',
    hasKeyboard: false,
    sendText: '1',
    imgUrlList:[]
  },
  //组件生命周期
  lifetimes: {
    attached: function (e) {
      this.setData({
        openId: app.globalData.openid,
        userInfo: app.globalData.userInfo
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
          chats: onMessage_data,
          hasNews:true
        })
        if(that.data.hasNews){
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
    },

  },
  methods: {
    //获得焦点时键盘上升高度
    InputFocus(e) {
      this.setData({
        InputBottom: e.detail.height
      })
    },
    //失去焦点键盘收起
    InputBlur(e) {
      this.setData({
        InputBottom: 0
      })
    },
    //发送消息
    send: function (type,write) {
      if(type=="image"){
        var newsImage=write;
        var newsContent='';
      }else{
        var newsImage='';
        var newsContent=write;
      }
      var msg = {
        newsUserOpenid: this.data.openId,
        newsRoomId: this.properties.getRoomId,
        newsImage:newsImage,
        newsType:type,
        newsContent:newsContent,
        wxChatUserInfo: {
          creatorAvatar: app.globalData.userInfo.avatarUrl,
          creatorName: app.globalData.userInfo.nickName,
        }
      }
      console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
      SocketTask.send({
          data: JSON.stringify(msg)
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
    onConfirmSendText:function(e){
    var writeText=this.data.textInputValue
    this.send("text",writeText)
    this.setData({
      textInputValue:'',
    })
    },
    //选择图片并上传
    onChooseImage:function(){
      var that=this;
      var imgList = [];
      wx.chooseImage({
        count: 4,
        sourceType: ['album', 'camera'],
        success: res => {
          imgList = res.tempFilePaths
          imgList.forEach(function (item, index) {
            const url=dataUrl.uploadUrl
            upload.asyncUpload(url,item,'file').then(res=>{
              var uploadData=[]
              uploadData.push({'index':index,'imageUrl':res.data.url})
               uploadData.forEach(function (item, index){
                 setTimeout(function(){
                 that.send("image",item.imageUrl),100
                 } );
              })
          })
          })
        }
      })
    },
    

    onMessageImageTap(e) {
      wx.previewImage({
        urls: [e.target.dataset.fileid],
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