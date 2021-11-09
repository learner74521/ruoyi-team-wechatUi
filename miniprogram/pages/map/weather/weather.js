//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    update: '',//更新时间
    basic: {},
    today: {},//今天天气状况
    tomorrow: {},//明天天气状况
    afterTomor: {},//后天天气状况
    lifestyle: [],//天气指数
    profix: 'https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/iconWeatherUrl-2020/',//天气对应地址
    weatherList: [{
      icon: 'icon-svg-',
      name: '气象指数',
      color: 'mauve',
    }, {
      icon: 'icon-chuanyizhishu',
      name: '穿衣指数',
      color: 'red'
    }, {
      icon: 'icon-ganmaoyaowu',
      name: '患病指数',
      color: 'cyan',
    }, {
      icon: 'icon-yundong',
      name: '运动指数',
      color: 'olive'
    }, {
      icon: 'icon-chuhang',
      name: '出行指数',
      color: 'orange',
    }, {
      icon: 'icon-ziwaixian',
      name: '紫外线指数',
      color: 'yellow',
    }, {
      icon: 'icon-xiche',
      name: '洗车指数',
      color: 'pink'
    }, {
      icon: 'icon-kongqi',
      name: '空气指数',
      color: 'purple',
    }, ]
  },
  onLoad: function (options) {
    console.log(options)
    if (options.position != '') {
      var position = JSON.parse(options.position)
      var latitude = position.latitude;
      var longitude = position.longitude;
      this.getWeatherInfo(latitude, longitude);
    } else {
      wx.getSetting({
        success: (res) => {
          // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
          // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
          // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '【组队吧】需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      // console.log('dataAu:success', dataAu)
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        that.navigateToMap();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none'
                        })
                        setTimeout(() => {
                          this.getLocation();
                        }, 1500)
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            this.getLocation();
          } else {
            this.getLocation();
          }
        }
      })
    }
  },
  //选择地点
  chooselocal(e) {
    var that = this
    wx.chooseLocation({
      success(params) {
        console.log(params)
        if (that.data.latitude == params.latitude && that.data.longitude == params.longitude) {
          wx.showToast({
            title: '未更换地理位置',
            icon: 'none'
          })
        } else {
          that.getWeatherInfo(params.latitude, params.longitude);
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function (e) {
    console.log(e.target.dataset.index)
  },
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.getWeatherInfo(latitude, longitude);
      }
    })
  },
  getWeatherInfo: function (latitude, longitude) {
    var _this = this;
    var key = '548100dbd3ca4101bbd5d473a74a1711'; //你自己的key
    var url = 'https://free-api.heweather.com/s6/weather?key=' + key + '&location=' + longitude + ',' + latitude;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        var lifestyle = res.data.HeWeather6[0].lifestyle;
        var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];
        var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];
        var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];
        var basic = res.data.HeWeather6[0].basic;
        var update = res.data.HeWeather6[0].update.loc;
        _this.setData({
          update: update,
          basic: basic,
          lifestyle: lifestyle,
          today: daily_forecast_today,
          tomorrow: daily_forecast_tomorrow,
          afterTomor: daily_forecast_afterTomor,
          todyIcon: _this.data.profix + daily_forecast_today.cond_code_d + '.png',
          tomorrowIcon: _this.data.profix + daily_forecast_tomorrow.cond_code_d + '.png',
          afterTomorIcon: _this.data.profix + daily_forecast_afterTomor.cond_code_d + '.png'
        });
      }
    })
  }
})