Page({
  data: {
    PageCur: 'team',
    badge:99,
    badge_my:1
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