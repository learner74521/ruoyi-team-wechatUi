// pages/teamhome/createteam/createteam.js
const app = getApp();
const req = require("../../../util/request/request");
const dataUrl = require("../../../util/dataUrl/dataUrl")
const teamType = require("../../../util/dataDict/label")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loactionFlag: '选定位置',
    useropenid: '',
    date: '', // 当前日期
    maxdate: '', // 可设置的最大日期
    roomTypeId: teamType.teamType,
    latitude: '',
    longitude: ''
  },
  /**
   * 日期切换 
   */
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      useropenid: app.globalData.openid
    })
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    console.log("当前间戳:" + timestamp)
    var nowdate = new Date(timestamp * 1000)
    var now_M = (nowdate.getMonth() + 1 < 10 ? '0' + (nowdate.getMonth() + 1) : nowdate.getMonth() + 1);
    var now_D = nowdate.getDate() < 10 ? '0' + nowdate.getDate() : nowdate.getDate();
    var now_Y = nowdate.getFullYear();
    console.log("当前时间:" + now_Y + '-' + now_M + '-' + now_D)

    //加1天的时间：
    var add1 = timestamp + 60 * 60 * 24 * 1;
    console.log("加1天时间戳:" + add1)
    var after1 = new Date(add1 * 1000)
    var after1_M = (after1.getMonth() + 1 < 10 ? '0' + (after1.getMonth() + 1) : after1.getMonth() + 1);
    var after1_D = after1.getDate() < 10 ? '0' + after1.getDate() : after1.getDate();
    var after1_Y = after1.getFullYear();
    this.setData({
      date: after1_Y + '-' + after1_M + '-' + after1_D
    })
    console.log("明天日期" + this.data.date)


    //加30天的时间：
    var add30 = timestamp + 60 * 60 * 24 * 30;
    console.log("加30天时间戳:" + add30)
    var after30 = new Date(add30 * 1000)
    var after30_M = (after30.getMonth() + 1 < 10 ? '0' + (after30.getMonth() + 1) : after30.getMonth() + 1);
    var after30_D = after30.getDate() < 10 ? '0' + after30.getDate() : after30.getDate();
    var after30_Y = after30.getFullYear();
    this.setData({
      maxdate: after30_Y + '-' + after30_M + '-' + after30_D
    })
    console.log('30天后日期' + after30_Y + '-' + after30_M + '-' + after30_D)
  },

  /**
   * 类型选择事件
   */
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 验证表单
   */
  //验证form表单是否填写完整
  checkForm: function (data) {
    for (var item in data) {
      if (!data[item]) {
        return false
      }
    }
    return true;
  },

  /**
   * 定位
   */
  getLocation: function () {
    var that = this
    wx.chooseLocation({
      success(params) {
        console.log(params)
        that.setData({
          latitude: params.latitude,
          longitude: params.longitude,
          name: params.name,
        })
      }
    })
  },

  /**
   * 提交表单
   */
  formSubmit: function (e) {
    var data_form = e.detail.value;
    // var location = {

    // }
    console.log("表单:")
    data_form.roomPosition = JSON.stringify({
        "latitude": this.data.latitude,
        "longitude": this.data.longitude,
      }),
      data_form.roomSite = this.data.name
    console.log(data_form)

    var url = dataUrl.chatRoomCreateUrl;
    if (this.data.name == '' || this.data.latitude == '') {
      wx.showToast({
        title: '请选择目的地位置',
        icon: 'none',
        duration: 1000
      })
    } else if (!this.checkForm(data_form)) {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        duration: 1000,
      })
    } else {
      wx.showModal({
        title: "(●'◡'●)",
        content: '确认要创建队伍吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('确定创建')
            req.request_json_post(url, data_form).then(res => {
              console.log(res)
            })
            wx.showToast({
              title: '加载中...',
              icon: 'loading',
              duration: 300
            })
            wx.redirectTo({
              url: '../myteam/myteam',
            })
          } else {
            console.log('取消创建')
          }
        }
      })
    }
  }
})