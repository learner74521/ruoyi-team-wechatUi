// pages/findhome/comment/comment.js
const app = getApp();
const request = require("../../../util/request/request.js")
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
var nowDateTime = require("../../../util/dateTime/nowDateTime.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: "https://www.linkcool.fun",
    // https: "http://localhost:8088",
    onConfirmSendText: 'onCommentSendText', //发送按钮
    isReply: false, //是否评论回复
    showBcak: false, //隐藏返回按钮
    userOpenid: '', //初始化openid
    textInputValue: '', //评论或回复内容
    placeholderVaule: '评论...', //提示
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var content = JSON.parse(options.content);
    var lookNum= content.wxDiscoverStatistics.statisticsLookNum++;
    wx.setStorageSync('lookNum',lookNum+1);
    this.setData({
      content: content,
      userOpenid: app.globalData.openid
    })
    var url = dataUrl.commentUrl
    var data = content.contentId
    request.request_json_post(url, JSON.stringify(data)).then(res => {
      console.log(res)
      that.setData({
        commentList: res.rows
      })

    })
  },
  //获得焦点时键盘上升高度
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height,
      showBcak: false
    })
  },
  //失去焦点键盘收起
  InputBlur(e) {
    var showBcak;
    console.log(this.data.isReply)
    if (this.data.isReply) { //判断是评论还是回复状态
      showBcak = true;
    } else if (!this.data.isReply) {
      showBcak = false;
    }
    this.setData({
      InputBottom: 0,
      showBcak: showBcak
    })
  },
  //图片详情
  onMessageImageTap(e) {
    wx.previewImage({
      urls: [e.target.dataset.fileid],
    })
  },
  //获取文本内容
  onTextBindnput: function (e) {
    var textInputValue = e.detail.value;
    this.setData({
      textInputValue: textInputValue
    })
  },
  //返回评论区域
  backCommentTap(e) {
    this.setData({
      onConfirmSendText: 'onCommentSendText', //恢复发送评论
      placeholderVaule: '评论...',
      textInputValue: '', //清空文本
      isReply: false, //退出回复状态
      showBcak: false //隐藏返回按钮
    })
  },
  //删除评论
  deleteCommentTap(e) {
    var indices = e.currentTarget.dataset.id;
    var url = dataUrl.commentDeleteUrl
    var _commentList = this.data.commentList;
    var data = _commentList[indices].commentId;
    var content = this.data.content;
    request.request_json_post(url, JSON.stringify(data)).then(res => {
      if (res.code == 0) {
        var commentNum = content.wxDiscoverStatistics.statisticsCommentNum--;
        wx.setStorageSync('commentNum', commentNum-1)//评论数量改变缓存到手机
        _commentList.splice(indices, 1) //删除一个索引为indices的对象
        this.setData({
          content: content,
          commentList: _commentList
        })
      }
    })

  },
  //删除评论回复
  deleteReplyTap(e) {
    var indices = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.did;
    var url = dataUrl.replyDeleteUrl
    var _commentList = this.data.commentList;
    var data = _commentList[indices].wxDiscoverReplyList[index].replyId;
    var content = this.data.content;
    request.request_json_post(url, JSON.stringify(data)).then(res => {
      if (res.code == 0) {
        var commentNum = content.wxDiscoverStatistics.statisticsCommentNum--;
        wx.setStorageSync('commentNum', commentNum-1)
        _commentList[indices].wxDiscoverReplyList.splice(index, 1) //删除一个索引为indices的对象
        this.setData({
          content: content,
          commentList: _commentList
        })
      }
    })
  },
  //提交评论文本
  onCommentSendText(e) {
    var url = dataUrl.commentAddUrl;
    var content = this.data.content;
    var data = {
      contentId: this.data.content.contentId,
      commentUserOpenid: app.globalData.openid,
      commentText: this.data.textInputValue
    }
    request.request_json_post(url, JSON.stringify(data)).then(res => {
      if (res.code == 0) {
        var commentNum = content.wxDiscoverStatistics.statisticsCommentNum++;
        wx.setStorageSync('commentNum', commentNum+1)
        var _data = {
          contentId: this.data.content.contentId,
          commentUserOpenid: app.globalData.openid,
          commentText: this.data.textInputValue,
          createTime: nowDateTime.getNewDateTime(),
          wxChatUserInfo: {
            creatorName: app.globalData.userInfo.nickName,
            creatorAvatar: app.globalData.userInfo.avatarUrl,
          }
        }
        var _commentList = this.data.commentList;
        _commentList.splice(0, 0, _data) //往索引为0的位置放入一个对象
        this.setData({
          content: content,
          textInputValue: '',
          commentList: _commentList
        })
      }
    })
  },
  //提交回复文本
  onReplySendText(e) {
    var url = dataUrl.replyAddUrl;
    var indices = this.data.indices;
    var content = this.data.content;
    var data = {
      contentId: this.data.content.contentId,
      commentId: this.data.commentId,
      fromOpenid: app.globalData.openid,
      replyText: this.data.textInputValue,
      toOpenid: this.data.toOpenid
    }
    request.request_json_post(url, JSON.stringify(data)).then(res => {
      if (res.code == 0) {
        var commentNum = content.wxDiscoverStatistics.statisticsCommentNum++;
        wx.setStorageSync('commentNum', commentNum+1)
        var _data = {
          commentId: this.data.commentId,
          fromOpenid: app.globalData.openid,
          replyText: this.data.textInputValue,
          toOpenid: this.data.toOpenid,
          createTime: nowDateTime.getNewDateTime(),
          wxChatUserInfo: {
            creatorName: app.globalData.userInfo.nickName,
            creatorAvatar: app.globalData.userInfo.avatarUrl,
          }
        }
        var _commentList = this.data.commentList;
        _commentList[indices].wxDiscoverReplyList.splice(0, 0, _data) //往回复内容索引为0的位置放入一个对象
        this.setData({
          content: content,
          textInputValue: '',
          commentList: _commentList
        })
      }
    })

  },
  //回复评论
  CommentReplyTap(e) {
    var indices = e.currentTarget.dataset.id;
    var creatorName = this.data.commentList[indices].wxChatUserInfo.creatorName
    var commentUserOpenid = this.data.commentList[indices].commentUserOpenid
    var commentId = this.data.commentList[indices].commentId
    this.setData({
      isReply: true,
      showBcak: true,
      indices: indices,
      commentId: commentId,
      toOpenid: commentUserOpenid,
      onConfirmSendText: 'onReplySendText',
      placeholderVaule: '回复@' + creatorName
    })
  },
  //回复评论
  replyTap(e) {
    var indices = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.did;
    var creatorName = this.data.commentList[indices].wxDiscoverReplyList[index].wxChatUserInfo.creatorName
    var fromOpenid = this.data.commentList[indices].wxDiscoverReplyList[index].fromOpenid
    var commentId = this.data.commentList[indices].commentId
    this.setData({
      isReply: true,
      showBcak: true,
      indices: indices,
      commentId: commentId,
      toOpenid: fromOpenid,
      onConfirmSendText: 'onReplySendText',
      placeholderVaule: '回复@' + creatorName
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var url = dataUrl.statisticsAddLookUrl;
    var data=this.data.content.contentId
    request.request_json_post(url, JSON.stringify(data)).then(res => {
   
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})