const app = getApp();
const imageUrl = require("../../util/imageUrl/imageUrl.js")
const dataUrl = require("../../util/dataUrl/dataUrl.js")
const request = require("../../util/request/request.js")
Page({
  data: {
    footMusicUrl: imageUrl.footMusicUrl, //音效地址
    PageCur: 'plaza', //默认首页
    badge: 0,
    badge_my: 1,
    color: ""
  },
  onLoad: function (e) {
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: e => {
    //     console.log('[云函数] [login] user openid: ', e.result.openid)
    //     app.globalData.openid = e.result.openid
    //     wx.getUserProfile({
    //       success: res => {
    //         var url = dataUrl.userEditUrl
    //         var data = {
    //           "wxOpenid": e.result.openid,
    //           "wxName": res.userInfo.nickName,
    //           "wxAvatar": res.userInfo.avatarUrl
    //         }
    //         request.request_json_post(url, JSON.stringify(data)).then(res => {
    //           console.log(res)
    //         })
    //       }
    //     })
    //   }
    // })
  },
  //检索消息条数
  onShow: function (e) {
    if (app.globalData.navColor) {
      this.setData({
        color: app.globalData.navColor
      })
    }
    var url = dataUrl.chatUnreadUrl
    var data = {
      userOpenid: app.globalData.openid
    }
    request.request_json_post(url, data).then(res => {
      console.log(res)
      if (res != null) {
        this.setData({
          badge: res
        })
      } else {
        this.setData({
          badge: 0
        })
      }
    })
  },
  //各组件跳转添加音效
  NavChange(e) {
    var cur = e.currentTarget.dataset.cur
    if (cur == 'news') {
      var url = dataUrl.chatUnreadUrl
      var data = {
        userOpenid: app.globalData.openid
      }
      request.request_json_post(url, data).then(res => {
        if (res != null) {
          this.setData({
            badge: res
          })
        }
      })
    }
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = app.globalData.isMusic
    innerAudioContext.src = this.data.footMusicUrl
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
    })
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })

  },
  //分享
  onShareAppMessage() {
    return {
      title: '组队吧--一款交友组队的小程序',
      imageUrl: '../../images/share.jpg',
      path: '/pages/bottomnav/bottomnav'
    }
  },
  onUnload: function () {
    console.log("bottomnav ---onUnload---")
  },
  onReachBottom: function () {
    console.log("bottomnav ---onReachBottom---")
  }
})