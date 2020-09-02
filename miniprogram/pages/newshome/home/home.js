// pages/newshome/news/news.js
const imageUrl=require("../../../util/imageUrl/imageUrl.js")
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    bgTopUrl:imageUrl.topImageUrl,
    badge:1
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { console.log("attached")},
    moved: function () {console.log("moved") },
    detached: function () { console.log("detached")},
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {console.log("show") },
    hide: function () {console.log("hide") },
    resize: function () { console.log("resize")},
  },
   
  methods:{
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  Navigator:function(e){
    const roomid=111
    wx.navigateTo({
      url: '../im/room/room?roomid='+roomid,
    })
  }
}
})