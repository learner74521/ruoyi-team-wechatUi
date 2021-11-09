// pages/teamhome/team/team.js
const app = getApp();
const imageUrl = require("../../../util/imageUrl/imageUrl.js")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const request = require("../../../util/request/request.js")
Component({
	options: {
		addGlobalClass: true,
	},
	/**
	 * 页面的初始数据
	 */
	data: {
		selectBtn: [
			imageUrl.selectIconUrl_1,
			imageUrl.selectIconUrl_2
		],
		navIndex:null,
		teamList: [],
		map: imageUrl.indexMap,
		centerCircle: imageUrl.indexCircle,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		Custom: app.globalData.Custom,
		toggleDelay: false,
		TabColor: "orange",
		TabCur: 0,
		TabName: "推荐",
		bgVideo: imageUrl.teamVideoUrl
	},
	lifetimes: {
		// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
		attached: function () {
			var that=this
			var url = dataUrl.chatRoomUrl
			var data = {
				pageNum: 1,
				pageSize: 6,
				creatorOpenid:app.globalData.openid
			}
			console.log(data)
			request.request_json_post(url, JSON.stringify(data)).then(res => {
				console.log(res)
				this.setData({
					teamList: res.rows
				})
			})
			that.setData({
				toggleDelay: true
			})
			setTimeout(function () {
				that.setData({
					toggleDelay: false
				})
			},2000)
		},
	},
	pageLifetimes: {
		// 组件所在页面的生命周期函数
		show: function () {

			var that = this;
			var navIndex = this.data.navIndex;
			if (navIndex != null) {
        if (wx.getStorageSync('update')) {
          wx.removeStorageSync('update')
          wx.removeStorageSync('peopleNum') //清除缓存
        } else if (wx.getStorageSync('remove')) {
          console.log(wx.getStorageSync('remove'))
          wx.removeStorageSync('remove') //清除缓存
        }
      }
		},
	},
	methods: {
		/**
		 * 我的小组
		 */
		topage(e) {
			var type = e.currentTarget.dataset.type
			if (type == 1) {
				wx.navigateTo({
					url: '../teamhome/myteam/myteam',
				})
			} else {
				wx.navigateTo({
					url: '../teamhome/createteam/createteam',
				})
			}
		},
		/**
		 * 队伍详情
		 */
		derailsTap(e) {
			var index = e.currentTarget.dataset.index;
			this.setData({
        navIndex: index
      })
			wx.navigateTo({
				url: '../teamhome/details/details?data=' + JSON.stringify(this.data.teamList[index]),
			})
		},
	}
})