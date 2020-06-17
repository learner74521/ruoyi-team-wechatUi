const app=getApp();
Page({
  data: {
    PageCur: 'team',
    badge:99,
    badge_my:1
  },
  onLoad:function(e){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      }
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '组队吧--一款交友组队的小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/bottomnav/bottomnav'
    }
  },
  onUnload:function(){
    console.log("bottomnav ---onUnload---")
  }
})