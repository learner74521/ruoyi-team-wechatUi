// miniprogram/pages/plazahome/studyteam/studyteam.js
const imagesUrl=require("../../../util/imageUrl/imageUrl.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elements: [{
        title: '高等数学',
        name: 'Math',
        color: 'cyan',
        icon: imagesUrl.style1IconUrl
      },
      {
        title: '大学英语',
        name: 'English',
        color: 'blue',
        icon: imagesUrl.style2IconUrl
      },
      {
        title: 'Java',
        name: 'Java',
        color: 'purple',
        icon:imagesUrl.style3IconUrl
      },
      {
        title: 'C语言',
        name: 'C',
        color: 'mauve',
        icon: imagesUrl.style4IconUrl
      },
      {
        title: 'Python',
        name: 'Python',
        color: 'pink',
        icon: imagesUrl.style5IconUrl
      },
      {
        title: 'HTML',
        name: 'HTML',
        color: 'brown',
        icon: imagesUrl.style6IconUrl
      },
      {
        title: '安卓',
        name: 'Android',
        color: 'red',
        icon: imagesUrl.style7IconUrl
      },
      {
        title: 'C#',
        name: 'C#',
        color: 'orange',
        icon: imagesUrl.style8IconUrl
      },
      {
        title: 'C++',
        name: 'C++',
        color: 'olive',
        icon: imagesUrl.style9IconUrl
      },
      {
        title: 'Vue',
        name: 'Vue',
        color: 'green',
        icon: imagesUrl.style10IconUrl
      },
      {
        title: '微信小程序',
        name: 'Wechat',
        color: 'blue',
        icon: imagesUrl.style11IconUrl
      },
      {
        title: 'Linux',
        name: 'Linux',
        color: 'pink',
        icon: imagesUrl.style12IconUrl
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})