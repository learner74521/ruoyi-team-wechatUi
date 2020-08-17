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
    mycard: ["身份认证", "学生认证", "真实认证"],
    bgImage: "https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/home1.jpg?sign=919b504259fedcc647aad1e1e054f408&t=1596614420",
    bgGif: "https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgGifUrl-2020/wave.gif?sign=64f1b90b1f5fe127d903a1041245912c&t=1596614399",
    infoCard: false,
    infoVip: true,
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
  methods: {
    SetPage() {
      wx.navigateTo({
        url: 'url',
      })
    },
    serviceTap() {
      wx.navigateTo({
        url: 'url',
      })
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      var userInfo = app.globalData.userInfo;
      this.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    },
    moved: function() {
      console.log("moved")
    },
    detached: function() {
      console.log("detached")
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      console.log("show")
    },
    hide: function() {
      console.log("hide")
    },
    resize: function() {
      console.log("resize")
    },
  }
})