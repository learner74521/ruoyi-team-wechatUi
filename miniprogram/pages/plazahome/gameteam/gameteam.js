// pages/plazahome/gameteam/gameteam.js
const imagesUrl=require("../../../util/imageUrl/imageUrl.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elements: [{
      title: '王者荣耀',
      name: 'Arena Of Valor',
      color: 'cyan',
      icon: imagesUrl.game1Iconurl,
      bgimg:imagesUrl.game1Imageurl
    },
    {
      title: '和平精英',
      name: 'Game For Peace',
      color: 'blue',
      icon: imagesUrl.game2Iconurl,
      bgimg:imagesUrl.game2Imageurl
    },
    {
      title: '英雄联盟',
      name: 'LOL',
      color: 'purple',
      icon: imagesUrl.game3Iconurl,
      bgimg:imagesUrl.game3Imageurl
    },
    {
      title: '求生之路2',
      name: 'Left 4 Dead 2',
      color: 'mauve',
      icon: imagesUrl.game4Iconurl,
      bgimg:imagesUrl.game4Imageurl
    },
    {
      title: 'QQ飞车',
      name: 'QQ Speed',
      color: 'pink',
      icon: imagesUrl.game5Iconurl,
      bgimg:imagesUrl.game5Imageurl
    },
    {
      title: '穿越火线',
      name: 'CF',
      color: 'brown',
      icon: imagesUrl.game6Iconurl,
      bgimg:imagesUrl.game6Imageurl
    },
    {
      title: '地下城与勇士',
      name: 'DNF',
      color: 'red',
      icon: imagesUrl.game7Iconurl,
      bgimg:imagesUrl.game7Imageurl
    },
    {
      title: '极品飞车Online',
      name: 'Need for speed Online',
      color: 'orange',
      icon: imagesUrl.game8Iconurl,
      bgimg:imagesUrl.game8Imageurl
    },
    {
      title: '绝地求生',
      name: 'PUBG',
      color: 'olive',
      icon: imagesUrl.game9Iconurl,
      bgimg:imagesUrl.game9Imageurl
    },
    {
      title: '守望先锋',
      name: 'Overwatch',
      color: 'green',
      icon: imagesUrl.game10Iconurl,
      bgimg:imagesUrl.game10Imageurl
    },
  ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})