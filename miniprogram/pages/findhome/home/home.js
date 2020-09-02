// pages/findhome/find/find.js
const app = getApp();
const request = require("../../../util/request/request.js")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const imageUrl = require("../../../util/imageUrl/imageUrl.js")
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
    navIndex:null,
    isMyseft: true, //判断是否是用户
    name: 'scale-down', //点赞动画效果名
    // https: "https://www.linkcool.fun",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    findTopUrl: imageUrl.findImageUrl, //顶部图片地址
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
      }
    ]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log("attached")
      var that = this;
      var url = dataUrl.contentUrl[0]
      var data = {
        "contentLabel": "兴趣",
        "contentUserOpenid": app.globalData.openid
      }
      request.request_json_post(url, JSON.stringify(data)).then(res => {
        that.setData({
          contentList: res.rows
        })
      })
    },
    moved: function () {
      console.log("moved")
    },
    detached: function () {
      if (wx.getStorageSync('commentNum') != null) {
        wx.removeStorageSync('commentNum') //清除缓存
      }

    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      var contentList = this.data.contentList
      var navIndex = this.data.navIndex
      if(navIndex!=null){
      if(wx.getStorageSync('lookNum')){
        contentList[navIndex].wxDiscoverStatistics.statisticsLookNum=wx.getStorageSync('lookNum')
        if (wx.getStorageSync('commentNum')) {
          contentList[navIndex].wxDiscoverStatistics.statisticsCommentNum = wx.getStorageSync('commentNum')
        }
        this.setData({
          contentList: contentList
        })
      }
    }
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
      var that = this;
      var tabCur = e.currentTarget.dataset.id;
      this.setData({
        TabCur: tabCur,
      })
      var url = dataUrl.contentUrl[1]
      var data = {
        "contentLabel": "游戏",
        "contentUserOpenid": app.globalData.openid
      }
      request.request_json_post(url, JSON.stringify(data)).then(res => {
        that.setData({
          contentList: res.rows
        })
        console.log(that.data.contentList)
      })
    },

    //图片详情
    onMessageImageTap(e) {
      wx.previewImage({
        urls: [e.target.dataset.fileid],
      })
    },
    //删除按钮
    contentDeleteTap(e) {
      var index = this.data.index
      console.log(index)
      var url = dataUrl.contentDeleteUrl
      var _contentList = this.data.contentList;
      var data = _contentList[index].contentId
      console.log(data)
      request.request_json_post(url, JSON.stringify(data)).then(res => {
        console.log(res)
        if (res.code == 0) {
          _contentList.splice(index, 1) //删除一个索引为indices的对象
          this.setData({
            modalName: null,
            contentList: _contentList
          })
        }
      })
    },
    //点赞按钮
    goodTap(e) {
      var that = this;
      var anmiatonVaule = e.currentTarget.dataset.class;
      var index = e.currentTarget.dataset.id;
      var anmiaton = [];
      var _contentList = this.data.contentList;
      if (_contentList[index].status) {
        _contentList[index].wxDiscoverStatistics.statisticsGoodNum = _contentList[index].wxDiscoverStatistics.statisticsGoodNum - 1

      } else {
        _contentList[index].wxDiscoverStatistics.statisticsGoodNum = _contentList[index].wxDiscoverStatistics.statisticsGoodNum + 1
      }
      _contentList[index].status = !_contentList[index].status
      anmiaton[index] = anmiatonVaule;
      that.setData({
        animation: anmiaton,
        contentList: _contentList
      })
      setTimeout(function () {
        that.setData({
          animation: ''
        })
      }, 1000)
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
    //显示窗口
    showModelTap(e) {
      var index = e.currentTarget.dataset.id;
      var openid = e.currentTarget.dataset.openid;
      var isMyseft
      if (openid == app.globalData.openid) {
        isMyseft = false
      } else {
        isMyseft = true
      }
      this.setData({
        index: index,
        modalName: e.currentTarget.dataset.target,
        isMyseft: isMyseft
      })
    },
    //隐藏窗口
    hideModalTap(e) {
      this.setData({
        modalName: null
      })
    },

    //跳转创建动态页面
    navSendShareTap() {
      wx.navigateTo({
        url: "../findhome/sendShare/sendShare"
      })
    },
    //跳转创建招募页面
    navSendRecruitTap() {
      wx.navigateTo({
        url: "../findhome/sendRecruit/sendRecruit"
      })
    },
    //评论跳转
    navCommentTap: function (e) {
      var index = e.currentTarget.dataset.id;
      var data = JSON.stringify(this.data.contentList[index])
      this.setData({
        navIndex: index
      })
      wx.navigateTo({
        url: "../findhome/comment/comment?content=" + data
      })
    }
  }
})