// pages/findhome/find/find.js
const app = getApp();
const request=require("../../../util/request/request.js")
const dataUrl=require("../../../util/dataUrl/dataUrl.js")
const imageUrl=require("../../../util/imageUrl/imageUrl.js")
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    number: 0,
    https:"http://www.linkcool.fun:8088",
    userOpenid:app.globalData.openid,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    findTopUrl: imageUrl.findImageUrl,//顶部图片地址
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
      }]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      var that=this;
      var url=dataUrl.contentUrl[0]
      var data={
        "contentLabel":"兴趣",
        "contentUserOpenid":app.globalData.openid
      }
      request.request_json_post(url,JSON.stringify(data)).then(res=>{
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
    //上导航
    tabSelect(e) {
      var that=this;
      var tabCur= e.currentTarget.dataset.id;
      this.setData({
        TabCur: tabCur,
      })
      var url=dataUrl.contentUrl[1]
      var data={
        "contentLabel":"兴趣",
        "contentUserOpenid":app.globalData.openid
      }
      request.request_json_post(url,JSON.stringify(data)).then(res=>{
         that.setData({
          contextList:res.rows
         })
         console.log(that.data.contextList)
      })
    },
    //跳转评论区

    //点赞按钮
    goodTap(e) {

    },
    //获取距离顶部的高度值
    onScrollChange(e) {
      var scrollTop = parseInt(e.detail.scrollTop)
      if (scrollTop <= 300) {
        this.setData({
          number: scrollTop / 300
        })
      }
    },
    navCommentTap:function(e){

      wx.navigateTo({
        url:"../findhome/comment/comment"
      })
    }
  }
})