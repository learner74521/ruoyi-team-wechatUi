var QQMapWX = require('../../../util/map/qqmap-wx-jssdk');//腾讯地图sdk
var amapFile = require('../../../util/map/amap-wx.js');//高德地图的sdk
Page({
  data: {
    weather: {}
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '3c16e5abde0a47fe5d91b8d7c6e033de' });
   
    myAmapFun.getWeather({
      success: function (data) {
        console.log(data)
        that.setData({
          weather: data
        });
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    })
  }
})