// pages/findhome/find/find.js
const app = getApp();
const request = require("../../../util/request/request.js")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const imageUrl = require("../../../util/imageUrl/imageUrl.js")
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    number: 0,
    navIndex: null,
    district: '',
    contentList: [],
    // prev:false,//刷新最新
    isMyseft: true, //判断是否是用户
    name: 'scale-down', //点赞动画效果名
    https: "https://img.linkcool.fun/",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    findTopUrl: imageUrl.findImageUrl, //顶部图片地址
    navSelect: [{
        title: "最新",
        icon: "discoverfill"
      },
      {
        title: "关注",
        icon: "likefill"
      },
      {
        title: "附近",
        icon: "locationfill"
      },
    ]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.newPage();
    },
    moved: function () {
      console.log("moved")
    },
    detached: function () {

    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      let pages = getCurrentPages();
      let currPage = pages[pages.length - 1]; //当前页面
      if (currPage.data.prev) {
        this.setData({
          TabCur: 0,
        })
        this.newPage();
      }
      var contentList = this.data.contentList
      var navIndex = this.data.navIndex
      if (navIndex != null) {
        if (wx.getStorageSync('lookNum')) {
          contentList[navIndex].wxDiscoverStatistics.statisticsLookNum = wx.getStorageSync('lookNum')
          wx.removeStorageSync('lookNum') //清除缓存
          if (wx.getStorageSync('commentNum')) {
            contentList[navIndex].wxDiscoverStatistics.statisticsCommentNum = wx.getStorageSync('commentNum')
            wx.removeStorageSync('commentNum') //清除缓存
          }
          this.setData({
            contentList: contentList
          })
        }
      }
    },
  },
  methods: {
    //上导航
    tabSelect(e) {
      var that = this;
      var tabCur = e.currentTarget.dataset.id;
      this.setData({
        TabCur: tabCur,
        contentList: []
      })
      if (tabCur == 0) {
        this.newPage();
      } else if (tabCur == 1) {
        this.newPage();
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
                            wx.navigateBack()
                          }, 1500)
                        }
                      }
                    })
                  }
                }
              })
            } else if (res.authSetting['scope.userLocation'] == undefined) {
              that.navigateToMap();
            } else {
              that.navigateToMap();
            }
          }
        })
      }

    },

    //图片详情
    onMessageImageTap(e) {
      wx.previewImage({
        urls: [e.target.dataset.fileid],
      })
    },
    //删除按钮
    contentDeleteTap(e) {
      var index = this.data.index
      console.log(index)
      var url = dataUrl.contentDeleteUrl
      var _contentList = this.data.contentList;
      var data = _contentList[index].contentId
      console.log(data)
      request.request_json_post(url, JSON.stringify(data)).then(res => {
        console.log(res)
        if (res.code == 0) {
          _contentList.splice(index, 1) //删除一个索引为indices的对象
          this.setData({
            modalName: null,
            contentList: _contentList
          })
        }
      })
    },
    //点赞按钮
    goodTap(e) {
      var that = this;
      var anmiatonVaule = e.currentTarget.dataset.class;
      var index = e.currentTarget.dataset.id;
      var anmiaton = [];
      var _contentList = this.data.contentList;
      if (_contentList[index].status) {
        _contentList[index].wxDiscoverStatistics.statisticsGoodNum = _contentList[index].wxDiscoverStatistics.statisticsGoodNum - 1

      } else {
        _contentList[index].wxDiscoverStatistics.statisticsGoodNum = _contentList[index].wxDiscoverStatistics.statisticsGoodNum + 1
      }
      _contentList[index].status = !_contentList[index].status
      anmiaton[index] = anmiatonVaule;
      that.setData({
        animation: anmiaton,
        contentList: _contentList
      })
      setTimeout(function () {
        that.setData({
          animation: ''
        })
      }, 1000)
    },
    //获取距离顶部的高度值
    onScrollChange(e) {
      var scrollTop = parseInt(e.detail.scrollTop)
      if (scrollTop <= 300) {
        this.setData({
          number: scrollTop / 300
        })
      }
    },
    //监听下拉到底部事件
    onScrolltolower(e) {
      var url = dataUrl.contentUrl[this.data.TabCur]
      var pageNum = this.data.pageNum + 1
      var data;
      if (this.data.contentList.length < this.data.pageTotal) {
        if (this.data.TabCur != 2) {
          data = {
            contentUserOpenid: app.globalData.openid,
            pageNum: pageNum,
            pageSize: 10,
          }
        } else {
          data = {
            contentUserOpenid: app.globalData.openid,
            contentCity: this.data.contentCity,
            pageNum: pageNum,
            pageSize: 10,
          }
        }
        request.request_json_post(url, data).then(res => {
          var contentList = this.data.contentList
          contentList.push(...res.rows)
          this.setData({
            pageNum: pageNum,
            contentList: contentList
          })
        })
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
      }
    },
    //显示窗口
    showModelTap(e) {
      var index = e.currentTarget.dataset.id;
      var openid = e.currentTarget.dataset.openid;
      var isMyseft
      if (openid == app.globalData.openid) {
        isMyseft = false
      } else {
        isMyseft = true
      }
      this.setData({
        index: index,
        modalName: e.currentTarget.dataset.target,
        isMyseft: isMyseft
      })
    },
    //隐藏窗口
    hideModalTap(e) {
      this.setData({
        modalName: null
      })
    },

    //跳转创建动态页面
    navSendShareTap() {
      wx.navigateTo({
        url: "../findhome/sendShare/sendShare"
      })
    },
    //评论跳转
    navCommentTap: function (e) {
      var index = e.currentTarget.dataset.id;
      var data = JSON.stringify(this.data.contentList[index])
      this.setData({
        navIndex: index
      })
      wx.navigateTo({
        url: "../findhome/comment/comment?content=" + data + "&TabCur=" + this.data.TabCur
      })
    },
    /**
     * 设置关注
     */
    addCareTap(e) {
      var index = this.data.index
      var url = dataUrl.careAddUrl
      var data = {
        createOpenid: app.globalData.openid,
        careOpenid: this.data.contentList[index].contentUserOpenid
      }
      request.request_json_post(url, data).then(res => {
        console.log(res)
        this.setData({
          modalName: '',
        })
        if (res.code == 0) {
          wx.showToast({
            title: '关注成功！',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '不能重复关注',
            icon: 'none'
          })
        }

      })
    },
    onReachBottom: function (res) {
      console.log(res)
    },
    /**
     * 取消关注
     */
    deleteCareTap(e) {
      var that = this;
      var index = this.data.index
      var contentList = this.data.contentList
      var url = dataUrl.careDeleteUrl
      var careOpenid = this.data.contentList[index].contentUserOpenid
      var data = {
        createOpenid: app.globalData.openid,
        careOpenid: careOpenid
      }
      var contentArray = []
      request.request_json_post(url, data).then(res => {
        console.log(res)
        if (res.code == 0) {
          contentList.forEach(function (item, index) {
            if (item.contentUserOpenid != careOpenid) {
              contentArray.push(item)
            }
          })
          that.setData({
            contentList: contentArray,
            modalName: '',
          })
          wx.showToast({
            title: '关注已取消',
            icon: 'success'
          })
        }
      })
    },
    //刷新
    newPage() {
      var that = this;
      var url = dataUrl.contentUrl[this.data.TabCur]
      var data = {
        contentUserOpenid: app.globalData.openid,
        pageNum: 1,
        pageSize: 10,
      }
      request.request_json_post(url, data).then(res => {
        if (res.total != 0) {
          that.setData({
            pageNum: data.pageNum,
            contentList: res.rows,
            pageTotal: res.rows[0].pageTotal
          })
        }
      })
    },

    //获取当前地址
    navigateToMap() {
      var that = this;
      wx.getLocation({
        type: 'wgs84', // 参考系
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log("纬度=" + latitude + " 经度=" + longitude);
          // 构建请求地址
          var qqMapApi = 'https://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + latitude + ',' +
            longitude + "&key=" + 'OMBBZ-NIQC2-UHKUB-C2JON-FNE5S-TZBSZ' + "&get_poi=1";
          wx.request({
            url: qqMapApi,
            data: {},
            method: 'GET',
            success: (res) => {
              console.log(res)
              that.setData({
                contentCity: res.data.result.address_component.district,
              })
              var data = {
                contentCity: res.data.result.address_component.district,
                contentUserOpenid: app.globalData.openid,
                pageNum: 1,
                pageSize: 10,
              }
              var url = dataUrl.contentUrl[2]
              request.request_json_post(url, data).then(res => {
                if (res.total != 0) {
                  that.setData({
                    contentList: res.rows,
                    pageTotal: res.rows[0].pageTotal
                  })
                }
              })
            }
          })
        }
      })
    },

    /**
     * 举报
     */
    ChooseCheckbox(e) {
      wx.navigateTo({
        url: '../findhome/report/report',
      })
    }
  }
})