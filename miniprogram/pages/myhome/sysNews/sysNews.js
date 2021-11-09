// pages/myhome/sysNews/sysNews.js
const request = require("../../../util/request/request.js")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la',
    logoHttps: 'https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/Logo/logo-item1.png',
    sysNewsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = dataUrl.sysChatUrl
    var data = {
      pageNum: 1,
      pageSize: 6
    }
    request.request_json_post(url, data).then(res => {
      console.log(res)
      this.setData({
        sysNewsList: res.rows,
        total: res.total,
        pageNum: data.pageNum
      })
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    var url = dataUrl.sysChatUrl
    var sysNewsList=this.data.sysNewsList
    var data = {
      pageNum: this.data.pageNum + 1,
      pageSize: 6
    }
    if (this.data.total > this.data.sysNewsList.length)
      request.request_json_post(url, data).then(res => {
        sysNewsList.push(...res.rows)
        this.setData({
          sysNewsList: sysNewsList
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 转跳至表单页面
   */
  topage: function (e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../createsysteam/createsysteam?data=' + JSON.stringify(this.data.sysNewsList[index]),
    })
  }
})