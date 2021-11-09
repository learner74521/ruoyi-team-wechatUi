var app = getApp();
const dataUrl = require("../../../util/dataUrl/dataUrl")
const request = require("../../../util/request/request.js")
const nowDate = require("../../../util/dateTime/nowDateTime")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    qdView: false,
    is_qd: false,
    hiddenName: true,
    nbsp: null,
    date: '',
    monthDaySize: '',
    arr: [],
  },
  /**
   * 显隐按钮
   * 是否签到
   */
  quxiaoQd: function (e) {
    var that = this;
    that.setData({
      qdView: true,
      is_qd: true,
      hiddenName: true
    })
  },
  /**
   * 显隐按钮
   */
  hiddenQd: function (e) {
    var that = this;
    that.setData({
      hiddenName: true
    })
  },
  /**
   * 事件处理函数
   */
  calendarSign: function (e) {
    var that = this;
    that.setData({
      hiddenName: false
    })
    var url = dataUrl.signAddUrl
    var signDay = that.data.date
    var list = that.data.list
    var data = {
      signOpenid: app.globalData.openid,
      signDay: signDay
    };
    /**
     * 签到日期传送接口
     */
    if (list.length != 0) {
      if (nowDate.getNewDate() != list[list.length - 1].createDate) {
        request.request_json_post(url, JSON.stringify(data)).then(res => {
          console.log(res)
          list.push({
            signOpenid: app.globalData.openid,
            signDay: signDay,
            createDate: nowDate.getNewDate()
          })
          this.setData({
            list: list
          })
        })
      }
    } else {
      request.request_json_post(url, JSON.stringify(data)).then(res => {
        console.log(res)
        list.push({
          signOpenid: app.globalData.openid,
          signDay: signDay,
          createDate: nowDate.getNewDate()
        })
        this.setData({
          list: list
        })
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   * 获取年、月、日
   * 计算1号对应星期，本月天数
   */
  onLoad: function () {
    var that = this;
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    var date = mydate.getDate();
    that.setData({
      date: date
    })
    var day = mydate.getDay();
    var nbsp = 7 - ((date - day) % 7);
    if (nbsp >= 7) {
      that.setData({
        nbsp: nbsp - 7
      })
    } else {
      that.setData({
        nbsp: nbsp
      })
    }
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      let monthDaySize = 31;
      that.setData({
        monthDaySize: monthDaySize
      })
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      let monthDaySize = 30;
      that.setData({
        monthDaySize: monthDaySize
      })
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        let monthDaySize = 29;
        that.setData({
          monthDaySize: monthDaySize
        })
      } else {
        let monthDaySize = 28;
        that.setData({
          monthDaySize: monthDaySize
        })
      }
    };

    /**
     *  获取签到日期接口
     *  签到日期放进新数组，下标做为标记
     */
    var url = dataUrl.signUrl
    var data = {
      signOpenid: app.globalData.openid,
      createDate: nowDate.getNewDate()
    }
    request.request_json_post(url, data).then(res => {
      // 判断是否签到过 
      var list = res.rows
      console.log(res)
      that.setData({
        list: list
      })
      var arr = new Array(date)
      for (var i = 0; i < date + 1; i++) {
        for (var j = 0; j < res.rows.length; j++) {
          if (res.rows[j].signDay == date) {
            that.setData({
              is_qd: true
            })
          }
          if (res.rows[j].signDay == i) {
            arr[i] = res.rows[j].signDay
          }
        }
      }
      that.setData({
        arr: arr
      })
    })
  }
})