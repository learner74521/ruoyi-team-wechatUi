//app.js
const nowDateTime = require("./util/dateTime/nowDateTime.js");
const request = require("./util/request/request.js")
const dataUrl = require("./util/dataUrl/dataUrl.js");
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'wx-teamyml-2020',
        traceUser: true,
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: e => {
        console.log('[云函数] [login] user openid: ', e.result.openid)
        this.globalData.openid = e.result.openid
        // 获取用户信息
        // wx.getSetting({
        //   success: res=>{
        //     if (res.authSetting['scope.userInfo']) {
        //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        //       console.log(res)
        //       wx.getUserInfo({
        //         success: res => {
        //           console.log(res)
        //           // 可以将 res 发送给后台解码出 unionId
        //           this.globalData.userInfo = res.userInfo
        //           var url=dataUrl.userEditUrl
        //           var data={
        //            "wxOpenid":e.result.openid,
        //            "wxName": res.userInfo.nickName,
        //            "wxAvatar": res.userInfo.avatarUrl
        //           }
        //           request.request_json_post(url,JSON.stringify(data)).then(res=>{console.log(res)})
        //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //           // 所以此处加入 callback 以防止这种情况
        //           if (this.userInfoReadyCallback) {
        //             this.userInfoReadyCallback(res)
        //             request.request_json_post(url,JSON.stringify()).then(res=>{console.log(res)})
        //           }
        //         },
        //         fail(res){
        //           wx.reLaunch({
        //             url: '/pages/login/login',
        //           })
        //         }
        //       })
        //     } else {
        //       // 未授权，跳转到授权页面
        //       wx.reLaunch({
        //         url: '/pages/login/login',
        //       })
        //     }
        //   }
        // })
      }
    })
  },
  //用户上线
  // onShow: function () {
  //   console.log(nowDateTime.getNewDateTime())
  //   console.log("app.js ---onShow---")
  // },
  //用户下线
  // onHide: function () {
  //   console.log("app.js ---onHide---");
  // },
  //小程序停用
  // onError: function (msg) {
  //   console.log("app.js ---onError---" + msg);
  // },
  globalData: {
    isMusic: true, //导航跳转音效开启
    navColor:'black'
  }
})