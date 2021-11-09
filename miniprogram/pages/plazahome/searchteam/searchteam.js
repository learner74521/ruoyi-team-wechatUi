// pages/plazahome/searchteam/searchteam.js
const app = getApp();
const request = require("../../../util/request/request")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const teamType = require("../../../util/dataDict/label")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: teamType.teamType,
    teamList: []
  },

  formSubmit: function (e) {
    var data = {
      roomName: e.detail.value.roomName
    }
    var url = dataUrl.chatRoomSearchUrl;
    request.request_json_post(url, data).then(res => {
      console.log(res.rows)
      this.setData({
        teamList: res.rows
      })
      if (res.rows.length == 0) {
        wx.showToast({
          title: '未找到相关队伍！',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 进入小组 
   */
  toDetail(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      navIndex: index
    })
    wx.navigateTo({
      url: '../../teamhome/details/details?data=' + JSON.stringify(this.data.teamList[index]),
    })
  },
  
   onShow: function () {
    var navIndex = this.data.navIndex;
    var teamList = this.data.teamList;
    if (navIndex != null) {
      if (wx.getStorageSync('update')) {
        console.log(wx.getStorageSync('peopleNum'))
        teamList[navIndex].memberNum = wx.getStorageSync('peopleNum');
        wx.removeStorageSync('update')
        wx.removeStorageSync('peopleNum') //清除缓存
      } else if (wx.getStorageSync('remove')) {
        console.log(wx.getStorageSync('remove'))
        teamList.splice(navIndex, 1)
        wx.removeStorageSync('remove') //清除缓存
      }
      this.setData({
        teamList: teamList
      })
    }
  }
})