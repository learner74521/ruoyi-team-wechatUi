// pages/newshome/news/news.js
const app = getApp()
const imageUrl = require("../../../util/imageUrl/imageUrl.js")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const request = require("../../../util/request/request.js")
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    bgTopUrl: imageUrl.topImageUrl,
    badge: 1,
    newsList: [],
    navIndex:null
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      var url = dataUrl.chatRoomNewsUrl
      var data = {
        creatorOpenid: app.globalData.openid
      }
      request.request_json_post(url, data).then(res => {
        res.rows.forEach(function (item, index) {
          if (item.wxChatUnread.updateTime != null) {
            item.wxChatUnread.updateTime = item.wxChatUnread.updateTime.substring(5, 19)
          }
        });
        this.setData({
          newsList: res.rows
        })
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
      var navIndex = this.data.navIndex;
      if (navIndex != null) {
        if (wx.getStorageSync('update')) {
          wx.removeStorageSync('update')
          wx.removeStorageSync('peopleNum') //清除缓存
        } else if (wx.getStorageSync('remove')) {
          console.log(wx.getStorageSync('remove'))
          wx.removeStorageSync('remove') //清除缓存
        }
      }
      var url = dataUrl.chatRoomNewsUrl
      var data = {
        creatorOpenid: app.globalData.openid
      }
      request.request_json_post(url, data).then(res => {
        console.log(res)
        res.rows.forEach(function (item, index) {
          if (item.wxChatUnread.updateTime != null) {
            item.wxChatUnread.updateTime = item.wxChatUnread.updateTime.substring(5, 19)
          }
        });
        if(this.data.NavIndex===undefined||this.data.NavIndex==-1){
          this.setData({
            newsList: res.rows
          })
        }else{
          var newsList=res.rows
          newsList[this.data.NavIndex].wxChatUnread.unreadNumber=0
          this.setData({
            newsList: newsList,
            NavIndex:-1
          })
        }
      })
    },
    hide: function () {
      console.log("hide")
    },
    resize: function () {
      console.log("resize")
    },
  },

  methods: {
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
      if (this.data.ListTouchDirection == 'left') {
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
    //进入聊天室
    Navigator: function (e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        NavIndex:index
      })
      wx.navigateTo({
        url: '../im/room/room?roomid=' + this.data.newsList[index].roomId,
      })
    },
    //跳转队伍
    intoTeamTap(e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        navIndex:index
      })
      wx.navigateTo({
        url: '../teamhome/details/details?flag=1&&data=' + JSON.stringify(this.data.newsList[index]),
      })
    }
  }
})