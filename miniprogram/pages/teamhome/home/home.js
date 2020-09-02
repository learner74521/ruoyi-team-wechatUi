// pages/teamhome/team/team.js
const app = getApp();
const imageUrl=require("../../../util/imageUrl/imageUrl.js")
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
    TabColor: "orange",
    TabCur: 0,
    TabName: "推荐",
    bgVideo: imageUrl.teamVideoUrl,
    topNavList: [{
        name: "推荐",
        color: "orange"
      },
      {
        name: "热门",
        color: "red"
      },
      {
        name: "已加",
        color: "olive"
      },
      {
        name: "我的",
        color: "cyan"
      }
    ],
    teamname:["一起回滕州","潍坊同行","一起联盟吧","组队下单拼多多","组队五一出行","吃鸡上车大神带飞"]
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log("attached")
    },
    moved: function () {
      console.log("moved")
    },
    detached: function () {
      console.log("detached")
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log("show")
    },
    hide: function () {
      console.log("hide")
    },
    resize: function () {
      console.log("resize")
    },
  },
  methods: {
    //上导航
    tabSelect(e) {
      var TabCur = e.currentTarget.dataset.id;
      var topNavList = [];
      topNavList = this.data.topNavList;
      var TabName = topNavList[TabCur].name
      var TabColor = topNavList[TabCur].color
      this.setData({
        TabCur: TabCur,
        TabName: TabName,
        TabColor: TabColor,
        modalName: null,
        TabIndex: -1
      })
    },
    //移动按钮
    moveTap(e) {
      var moveTap = e.currentTarget.dataset.tap;
      var index = e.currentTarget.dataset.id
      if (moveTap == "left") {
        this.setData({
          modalName: e.currentTarget.dataset.target,
          TabIndex: index
        })
      } else {
        this.setData({
          modalName: null,
          TabIndex: -1
        })
      }
    },


  }
})