const app = getApp();
const imageUrl = require("../../../util/imageUrl/imageUrl.js")
const request = require("../../../util/request/request")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const teamType = require("../../../util/dataDict/label")
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    https: 'https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la',
    thisuseropenid: '',
    cardCur: 0,
    bgTopUrl: imageUrl.topImageUrl,
    TabCur: 0,
    scrollLeft: 0,
    typeList: teamType.teamType,
    teamList: [],
    total: '',
    pageNum: 1,
    swiperList: [],
    navIndex: null
  },


  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        thisuseropenid: app.globalData.openid,
      })
      var url = dataUrl.chatRoomUrl
      var data = {
        roomTypeId: 0,
        pageNum: 1,
        pageSize: 6
      }
      request.request_json_post(url, data).then(res => {
        console.log(res)
        this.setData({
          teamList: res.rows,
          total: res.total
        })
      })
      var sysurl = dataUrl.sysChatUrl
      var sysdata = {
        pageNum: 1,
        pageSize: 5
      }
      request.request_json_post(sysurl, sysdata).then(res => {
        console.log(res)
        this.setData({
          swiperList: res.rows,
        })
      })

    },
    moved: function () {
      console.log("moved")
    },
    detached: function () {
      console.log("detached")
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
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
  },
  methods: {
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current,
      })
    },
    /**
     * 搜索
     */
    searchTap(e) {
      wx.navigateTo({
        url: '../plazahome/searchteam/searchteam',
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
        url: '../teamhome/details/details?data=' + JSON.stringify(this.data.teamList[index]),
        // url: '../teamhome/details/details',
      })
    },
    /**
     * 切换菜单栏事件 
     */
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
      console.log(this.data.TabCur)
      this.setData({
        reqtype: {
          roomTypeId: this.data.TabCur
        }
      })
      // 请求筛选队伍列表
      var url = dataUrl.chatRoomUrl
      var data = {
        roomTypeId: this.data.TabCur,
        pageNum: 1,
        pageSize: 6
      }
      request.request_json_post(url, data).then(res => {
        console.log(res)
        this.setData({
          total: res.total,
          teamList: res.rows
        })
      })
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
    /**
     * 检测底部上滑事件
     */
    onScrolltolower(e) {
      var url = dataUrl.chatRoomUrl
      if (this.data.teamList.length < this.data.total) { // 判断当前列表元素数量是否小于所有元素之和
        var data = {
          roomTypeId: this.data.TabCur,
          // creatorOpenid: app.globalData.openid
          pageNum: this.data.pageNum + 1,
          pageSize: 6
        }
        request.request_json_post(url, data).then(res => {
          console.log(res.rows)
          var tempList = this.data.teamList // 原列表存入变量
          tempList.push(...res.rows) // 加入新数据
          this.setData({
            total: res.total,
            teamList: tempList,
            pageNum: data.pageNum
          })
        })
      } else {
        wx.showToast({
          title: '没有更多了！',
          icon: 'none'
        })
      }
    },

    /**
     * 点击海报进入表单事件
     */
    topage(e) {
      var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '../../../../createsysteam/createsysteam?data=' + JSON.stringify(this.data.swiperList[index]),
      })
    }
  }
})