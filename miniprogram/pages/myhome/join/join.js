// pages/myhome/join/join.js
const imageUrl = require("../../../util/imageUrl/imageUrl")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backimg: imageUrl.joinus
  },
  back() {
    wx.navigateBack({
      delta: 0,
    })
  }

})