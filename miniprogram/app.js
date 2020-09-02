//app.js
var nowDateTime=require("./util/dateTime/nowDateTime.js")
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
       // 获取用户信息
       wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }else{
            // 未授权，跳转到授权页面
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        }
       })
       console.log("app.js ---onLaunch---")
  },
  //用户上线
  onShow:function(){
    // var nowDateTime=nowDateTime.getNewDateTime
    console.log(nowDateTime.getNewDateTime())
        console.log("app.js ---onShow---")
  },
  //用户下线
  onHide:function(){
    console.log("app.js ---onHide---");
  },
  //小程序停用
  onError: function (msg){
    console.log("app.js ---onError---" + msg);
  },
  globalData: {
    isMusic:true,//跳转音效开启
   
  }
})
