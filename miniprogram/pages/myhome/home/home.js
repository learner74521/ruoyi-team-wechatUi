// pages/myhome/home/home.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    mycard:["身份认证","学生认证","真实认证"],
    bgImage:"https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/home1.jpg?sign=2e1dc24ddcb2713bf2c15de58425979f&t=1586869313",
    bgGif:"https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgGifUrl-2020/wave.gif?sign=75e9f4470ba31910da925cba207ad5f1&t=1586869837",
    infoCard:false,
    infoVip:true,
    iconList: [{
      icon: 'picfill',
      color: 'red',
      badge: 0,
      name: '上传'
    }, {
      icon: 'vip',
      color: 'orange',
      badge: 1,
      name: 'vip'
    }, {
      icon: 'addressbook',
      color: 'yellow',
      badge: 0,
      name: '身份认证'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'warnfill',
      color: 'cyan',
      badge: 0,
      name: '举报'
    }, {
      icon: 'questionfill',
      color: 'blue',
      badge: 0,
      name: '帮助'
    }],
   
  },
methods:{
  SetPage(){
    wx.navigateTo({
      url: 'url',
    })
  },
  serviceTap(){
    wx.navigateTo({
      url: 'url',
    })
  }
},
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      var userInfo=app.globalData.userInfo;
      this.setData({
        userInfo:userInfo
      })  
      console.log(userInfo)
    },
    moved: function () {console.log("moved") },
    detached: function () { console.log("detached")},
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {console.log("show") },
    hide: function () {console.log("hide") },
    resize: function () { console.log("resize")},
  }
})