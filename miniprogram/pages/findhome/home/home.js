// pages/findhome/find/find.js
const app = getApp();
const request=require("../../../util/request/request.js")
const dataUrl=require("../../../util/dataUrl/dataUrl.js")
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    number: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    bgTopUrl: "https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/bgFind.jpg?sign=074d3b2cef543697aaf9101c96636c72&t=1594974053",
    navSelect: [{
        title: "推荐",
        icon: "camerafill"
      },
      {
        title: "关注",
        icon: "upstagefill"
      },
      {
        title: "附近",
        icon: "locationfill"
      },
      {
        title: "招募广场",
        icon: "discoverfill"
      },
    ]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      var that=this;
      var url=dataUrl.contentUrl
      var data={
        "contentLable":"游戏"
      }
      request.request_json_post(url,JSON.stringify(data)).then(res=>{
         console.log(res.rows)
         that.setData({
          contextList:res.rows
         })
         console.log(that.data.contextList)
      })
     
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
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    onScrollChange(e) {
      var scrollTop = parseInt(e.detail.scrollTop)
      if (scrollTop <= 300) {
        this.setData({
          number: scrollTop / 300
        })
      }
    }
  }
})