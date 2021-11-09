// pages/teamhome/details/details.js
const app = getApp();
const map = require("../../../util/map/visitMap")
const dataUrl = require("../../../util/dataUrl/dataUrl")
const req = require("../../../util/request/request");
Page({

  /**
   * 页面的初始数据
   * }
   */
  data: {
    thisuid: '',
    teamInfo: '',
    joinedList: '',
    intro_hiddenName: true, // 介绍
    select_hiddenName: true, // 功能按钮
    into_hiddenName: true, // 加入队伍
    creator_hiddenName: true, // 退出/解散队伍
    select: [
      "聊天室",
      "路线规划",
      "天气查询",
      "退出队伍"
    ],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },

  selectAction: function (options) {
    var that = this
    var name = options.currentTarget.dataset.index;
    if (name == 0) {
      var roomid = this.data.teamInfo.roomId
      wx.navigateTo({
        url: '../../im/room/room?roomid=' + roomid,
      })
    } else if (name == 1) {
      console.log("路线规划")
      if(this.data.teamInfo.roomPosition!=''){
        map.visitMap(JSON.parse(this.data.teamInfo.roomPosition))
      }else{
        map.visitMap(this.data.teamInfo.roomPosition)
      }
    } else if (name == 2) {
      console.log("天气查询")
      wx.navigateTo({
        url: '../../map/weather/weather?position='+this.data.teamInfo.roomPosition
      })
    } else if (name == 3) {
      var teamname = this.data.teamInfo.roomName
      wx.showModal({
        title: '提示',
        content: "是否退出 '" + teamname + "' 队伍?",
        success(res) {
          if (res.confirm) {
              var joinedList=that.data.joinedList;
              if (joinedList.peopleOpenid == that.data.thisuid) {
                var url = dataUrl.PeopleQuitUrl;
                var data = {
                  peopleRoomId: joinedList.peopleRoomId,
                  peopleOpenid: joinedList.peopleOpenid,
                  peopleId: joinedList.peopleId
                }
                req.request_json_post(url, data).then(res => {
                  console.log(res)
                  if (res.code == 0) {
                    wx.setStorageSync('update', true)
                    wx.setStorageSync('peopleNum', that.data.teamInfo.memberNum - 1) //退出队伍人数
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                })
                return
              }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 移除聊天室
   */
  removeChatRoom() {
    var teamname = this.data.teamInfo.roomName
    var that = this
    wx.showModal({
      title: '提示',
      content: "是否解散 '" + teamname + "' 队伍?",
      success(res) {
        if (res.confirm) {
          var url = dataUrl.chatRoomRemoveUrl + "?roomid=" + that.data.teamInfo.roomId;
          req.request_json_post(url).then(res => {
            console.log(res)
            if (res.code == 0) {
              wx.setStorageSync('remove', true) //移除此队伍
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 展示小组介绍信息 
   */
  click_show: function (e) {
    this.setData({
      intro_hiddenName: !this.data.intro_hiddenName
    })
  },
  /**
   * 加入队伍
   */
  jointeam: function () {
    var that = this
    var teamInfo=this.data.teamInfo
    var data = {
      peopleOpenid: this.data.thisuid,
      peopleRoomId: teamInfo.roomId
    }
    var url = dataUrl.chatRoomJoinUrl;
    wx.showModal({
      title: "(●'◡'●)",
      content: '确定要加入队伍吗?',
      success: function (res) {
        if (res.confirm) {
          req.request_json_post(url, data).then(res => {
            console.log(res)
            if (res.code == 0) {
              wx.setStorageSync('update', true)
              wx.setStorageSync('peopleNum', teamInfo.memberNum + 1) //加入队伍人数
              teamInfo.memberNum++;
              var peopleUrl = dataUrl.chatRoomPeopleUrl
              var peopleData = {
                peopleRoomId: teamInfo.roomId
              }
              req.request_json_post(peopleUrl, peopleData).then(e => {
                console.log(e)
                e.rows.forEach(function (item, index) {
                  if (that.data.thisuid == item.peopleOpenid) {
                    that.setData({
                      joinedList: e.rows[index],
                      teamInfo:teamInfo,
                      intro_hiddenName: true,
                      select_hiddenName: false,
                      into_hiddenName: true,
                    })
                  }
                })
              })
            } else {
              wx.showToast({
                title: '加入失败',
                icon: 'none'
              })
            }
          })
        } else {
          console.log('取消加入')
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var teamInfo = JSON.parse(options.data)
    that.setData({
      thisuid: app.globalData.openid,
      teamInfo: teamInfo
    })
    console.log(teamInfo)
    if (that.data.thisuid == teamInfo.creatorOpenid) {
      console.log("队伍创建者")
      that.setData({
        intro_hiddenName: true,
        select_hiddenName: false,
        creator_hiddenName: false,
      })
      return;
    } else {
      var url = dataUrl.chatRoomPeopleUrl
      var data = {
        peopleRoomId: teamInfo.roomId
      }
      req.request_json_post(url, data).then(res => {
        res.rows.forEach(function (item, index) {
          if (that.data.thisuid == item.peopleOpenid) {
            that.setData({
              joinedList: res.rows[index],
              intro_hiddenName: true,
              select_hiddenName: false,
              into_hiddenName: true,
            })
            return;
          }
        });
      })
    }
    that.setData({
      intro_hiddenName: false,
      into_hiddenName: false,
      select_hiddenName: true
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})