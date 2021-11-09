// pages/myhome/home/home.js
const app = getApp();
const imageUrl = require("../../../util/imageUrl/imageUrl.js");
const dataUrl = require("../../../util/dataUrl/dataUrl.js");
const request = require("../../../util/request/request.js");
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
    mycard: ["身份认证","学生认证", "真实认证"],
    bgImage: imageUrl.home1ImageUrl,
    bgGif: imageUrl.wareGifUrl,
    infoCard: 0,
    infoVip: 0,
    iconList: [
    //   {
    //   icon: 'vip',
    //   color: 'orange',
    //   badge: 1,
    //   name: 'vip',
    //   navPage: 'vip'
    // },
     {
      icon: 'refund',
      color: 'red',
      badge: 0,
      name: '打卡',
      navPage: 'sign'
    }, {
      icon: 'addressbook',
      color: 'yellow',
      badge: 0,
      name: '身份认证',
      navPage: 'idCard'
    }, {
      icon: 'group',
      color: 'olive',
      badge: 1,
      name: '推荐组队',
      navPage: 'sysNews'
    },
     {
      icon: 'formfill',
      color: 'cyan',
      badge: 0,
      name: '版本日志',
      navPage: 'log'
    }, 
    {
      icon: 'questionfill',
      color: 'blue',
      badge: 0,
      name: '帮助',
      navPage: 'help'
    }],

  },
  methods: {
    //设置按钮
    SetPage() {
      wx.navigateTo({
        url: '../myhome/setting/setting',
      })
    },
   
      handleContact (e) {
          console.log(e.detail.path)
          console.log(e.detail.query)
      },

    //转跳客服  
    serviceTap() {
      wx.navigateTo({
        url: 'url',
      })
    },
    navPageTap(e) {
      var page=e.currentTarget.dataset.page
      if(page=='vip'){
            wx.showToast({
              title: 'vip暂未开通！',
              icon: 'none',
              duration:2000
            })
      }else if(page=='idCard'){
        wx.navigateTo({
          url: "../myhome/"+page+"/"+page+"?card="+JSON.stringify(this.data.card),//传送已经认证的身份
        })
      }else{
        wx.navigateTo({
          url: "../myhome/"+page+"/"+page,
        })
      }
    },
   bugBackTap(e){
    wx.navigateTo({
      url: "../myhome/bugBack/bugBack",
    })
   },
   aboutTap(e){
    wx.navigateTo({
      url: "../myhome/about/about",
    })
   },
   joinTap(e){
    wx.navigateTo({
      url: "../myhome/join/join",
    })
   }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      var that=this
      var userInfo = app.globalData.userInfo;
      this.setData({
        userInfo: userInfo
      })
      var url=dataUrl.wxuserUrl
      var data={
        wxOpenid:app.globalData.openid
      }
      request.request_json_post(url,data).then(res=>{
        console.log(res.rows[0].wxStuCard)
        var infoCard
        if(res.rows[0].wxStuCard==1){
          infoCard= 1
        }else if(res.rows[0].wxIdCard==1&&res.rows[0].wxStuCard!=1){
          infoCard= 2
        }else{
          infoCard= 0
        }
        var card={
          "wxStuCard":res.rows[0].wxStuCard,
          "wxIdCard":res.rows[0].wxIdCard
        }
        that.setData({
          infoVip:res.rows[0].wxVip,
          infoCard:infoCard,
          wxStuCard:res.rows[0].wxStuCard,
          card:card
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
      console.log("show")
    },
    hide: function () {
      console.log("hide")
    },
    resize: function () {
      console.log("resize")
    },
  }
})