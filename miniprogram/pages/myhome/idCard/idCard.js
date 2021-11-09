// pages/myhome/idCard/idCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxStuCard: 0,
    wxIdCard: 0

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var card = JSON.parse(options.card)
    this.setData({
      wxStuCard: card.wxStuCard,
      wxIdCard: card.wxIdCard
    })
  },

  /**
   * 跳转身份认证页面
   */
  identityTap(e) {
    if (this.data.wxIdCard == 1) {
      wx.showToast({
        title: '您已认证过！',
      })
    } else {
      wx.navigateTo({
        url: './identity/identity',
      })
    }
  },
  /**
   * 跳转学生认证页面
   */
  stuCardTap(e) {
    if (this.data.wxStuCard == 1) {
      wx.showToast({
        title: '您已认证过！',
      })
    } else {
      wx.navigateTo({
        url: './stuCard/stuCrad',
      })
    }
  },

})