// pages/teamhome/myteam/myteam.js
const app = getApp();
const request = require("../../../util/request/request")
const dataUrl = require("../../../util/dataUrl/dataUrl")
const teamType = require("../../../util/dataDict/label")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		total: '',
		pageNum: 1,
		thisuid: '',
		TabCur: 0,
		scrollLeft: 0,
		mytype: [
			"我创建的队伍",
			"我加入的队伍"
		],
		typeList: teamType.teamType,
		teamList: [],
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
	 * 顶部导航栏选择类别事件
	 */
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60
		})
		if (this.data.TabCur == 0) {
			this.mycreateteam()
		} else {
			this.myjoinedteam()
		}
	},

	/**
	 * 请求我创建的队伍
	 */
	mycreateteam() {
		var url = dataUrl.chatRoomUrlCreator
		var data = {
			pageNum: this.data.pageNum,
			pageSize: 6,
			creatorOpenid: this.data.thisuid
		}
		request.request_json_post(url, data).then(res => {
			console.log(res.rows)
			var tempList = this.data.teamList // 原列表存入变量
			tempList.push(...res.rows) // 加入新数据
			this.setData({
				total: res.total,
				teamList: res.rows,
			})
		})
	},
	/**
	 * 我加入的队伍
	 */
	myjoinedteam() {
		var url = dataUrl.chatRoomJoinedUrl
		// var url = dataUrl.chatRoomUrlCreator
		var data = {
			pageNum: this.data.pageNum,
			pageSize: 6,
			creatorOpenid: this.data.thisuid
		}
		request.request_json_post(url, data).then(res => {
			console.log(res.rows)
			var tempList = this.data.teamList // 原列表存入变量
			tempList.push(...res.rows) // 加入新数据
			this.setData({
				total: res.total,
				teamList: res.rows,
			})
		})
	},
	/**
	 * 检测底部上滑事件
	 */
	onScrolltolower(e) {

		if (this.data.teamList.length < this.data.total) { // 判断当前列表元素数量是否小于所有元素之和
			this.setData({
				pageNum: data.pageNum + 1 // 下一页
			})
			if (TabCur == 0) {
				this.mycreateteam();
			} else {
				this.myjoinedteam();
			}
		} else {
			wx.showToast({
				title: '没有更多了！',
				icon: 'none'
			})
		}
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
			url: '../details/details?flag=1&&data=' + JSON.stringify(this.data.teamList[index]),
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			thisuid: app.globalData.openid
		})
		if (options.tab == 1) {
			this.setData({
				TabCur: options.tab,
				scrollLeft: (options.tab) * 60
			})
			this.myjoinedteam()
		} else {
			this.mycreateteam()
		}
	},
  onShow:function(){
		var navIndex = this.data.navIndex;
    var teamList=this.data.teamList;
    if (navIndex != null) {
     if(wx.getStorageSync('update')){
			 teamList.splice(navIndex,1)
       wx.removeStorageSync('update')
       wx.removeStorageSync('peopleNum') //清除缓存
     }else if(wx.getStorageSync('remove')){
       console.log(wx.getStorageSync('remove'))
      teamList.splice(navIndex,1)
      wx.removeStorageSync('remove') //清除缓存
     }
     this.setData({
      teamList:teamList
     })
    }
	}
})
