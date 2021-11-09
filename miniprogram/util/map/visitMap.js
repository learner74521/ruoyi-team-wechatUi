const key = 'OMBBZ-NIQC2-UHKUB-C2JON-FNE5S-TZBSZ'
const referer = "组队吧-小程序端"

function visitMap(e) {
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
                    navigateToMap(e);
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none'
                    })
                    setTimeout(() => {
                      wx.navigateBack(e)
                    }, 1500)
                  }
                }
              })
            }
          }
        })
      } else if (res.authSetting['scope.userLocation'] == undefined) {
        navigateToMap(e);
      } else {
        navigateToMap(e);
      }
    }
  })
}

//获取当前地址
function navigateToMap(e) {
  wx.getLocation({
    type: 'wgs84', // 参考系
    success: function (param) {
      var latitude, longitude;
      if (e != '') {
        latitude = e.latitude;
        longitude = e.longitude;
      } else {
        latitude = param.latitude;
        longitude = param.longitude;
      }
      console.log("纬度=" + latitude + " 经度=" + longitude);
      // 构建请求地址
      var qqMapApi = 'https://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + latitude + ',' +
        longitude + "&key=" + key + "&get_poi=1";
      wx.request({
        url: qqMapApi,
        data: {},
        method: 'GET',
        success: (res) => {
          console.log(res)
          let endPoint = JSON.stringify({ //终点
            'name': res.data.result.address,
            'latitude': latitude,
            'longitude': longitude
          });
          wx.navigateTo({
            url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
          })
        }
      })
    }
  })
}
module.exports = {
  visitMap
};