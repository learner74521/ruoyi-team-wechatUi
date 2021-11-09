// pages/myhome/about/about.js
const imageUrl = require("../../../util/imageUrl/imageUrl")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backimg: imageUrl.aboutus
  },

  back(){
    wx.navigateBack({
      delta: 0,
    })
  }
})