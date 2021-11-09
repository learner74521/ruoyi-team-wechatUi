// pages/myhome/idCard/stuCard/stuCrad.js
const app = getApp();
const dataUrl = require("../../../../util/dataUrl/dataUrl.js")
const algorithm = require("../../../../util/algorithm/algorithm.js") //算法
const uploadAliyun = require("../../../../util/request/aliyunOss/uploadAliyun.js") //上传
const request = require("../../../../util/request/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: false, //检验开启，可以发送
    imgList: [{
      "photo": [],
      "selfie": []
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url=dataUrl.idcardUrl
    var data={
      authenticationUserOpenid:app.globalData.openid,
      authenticationType:1
    }
    request.request_json_post(url,data).then(res=>{
      if(res.rows.length!=0)
      if(res.rows[0].authenticationPass==2){
        this.setData({
          check:true
        })
      }
    })
  },
  /**
   * 选择图片
   */
  chooseImage(e) {
    var that = this;
    var attr = e.currentTarget.dataset.attr
    var imgList = this.data.imgList; //本地临时地址
    var itemList=[];
    if(attr=='photo'){
      itemList=['拍照','从手机相册选择',]
    }else{
      itemList=['拍照']
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], //从相册选择
            success: res => {
              imgList[0][`${attr}`].push(...res.tempFilePaths)
              if (imgList.length <= 2)
                that.setData({
                  imgList: imgList
                })
              else {
                wx.showToast({
                  title: '图片超额!',
                  icon: 'loading',
                  duration: 1000,
                })
              }
            }
          })
        } else {
          wx.chooseImage({
            count: 2,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: res => {
              imgList[0][`${attr}`].push(...res.tempFilePaths)
              if (imgList[0][`${attr}`].length <= 2) {
                that.setData({
                  imgList: imgList
                })
              } else {
                imgList[0][`${attr}`] = imgList[0][`${attr}`].slice(0, imgList[0][`${attr}`].length - res.tempFilePaths.length)
                that.setData({
                  imgList: imgList
                })
                wx.showToast({
                  title: '图片超额!',
                  icon: 'loading',
                  duration: 1000,
                })
              }

            }
          })
        }

        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },
  /**
   * 查看图片
   */
  viewImage(e) {
    var attr = e.currentTarget.dataset.attr
    var index = e.currentTarget.dataset.id
    console.log(this.data.imgList[0][`${attr}`])
    console.log(this.data.imgList[0][`${attr}`][index])
    wx.previewImage({
      urls: this.data.imgList[0][`${attr}`],
      current: this.data.imgList[0][`${attr}`][index]
    });
  },
  /**
   * 删除图片
   */
  delImg(e) {
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          var imgList = this.data.imgList
          var attr = e.currentTarget.dataset.attr
          imgList[0][`${attr}`].splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 提交
   */
  sendtap: function (e) {
    if (this.check()) {
      var that = this
      var uploadData = []; //返回的证件地址数组
      var result = []; //排序后的地址
      var selfieUrl; //返回的自拍照
      var selfie = this.data.imgList[0].selfie[0]
      var imgList = []
      imgList.push(...this.data.imgList[0].photo)
      var imageUrl = []
      wx.showLoading({
        title: '证件上传中',
      })
      //上传证件
      imgList.forEach(function (item, index) {
        uploadAliyun.asyncUpload(item, 'IDCardImg').then(res => {
          console.log(res.data)
          uploadData.push({
            'index': index,
            'imageUrl': res.data
          })
          result = algorithm.sortLsit(uploadData) //冒泡排序
        })
      })
      //上传自拍照
      uploadAliyun.asyncUpload(selfie, 'IDCardImg').then(res => {
        selfieUrl = res.data
      })
      setTimeout(function(){
      wx.hideLoading();
      wx.showModal({
        title: '已提交',
        content: '正在审核',
        showCancel: false, //是否显示取消按钮
        confirmText: "确定",  //默认是“确定”
        confirmColor: 'skyblue', //确定文字的颜色
        success: function (res) {
          var url = dataUrl.idcardAddUrl
          for (var i = 0; i < result.length; i++) {
            imageUrl.push(result[i].imageUrl)
          }
          var data = {
            authenticationUserOpenid: app.globalData.openid,
            authenticationType: '1',
            authenticationPhoto: JSON.stringify(imageUrl),
            authenticationSelfie: selfieUrl

          }
          if (res.confirm) {
            request.request_json_post(url, data).then(res => {
              if (res.code == 0) {
                that.setData({
                  imgList: [{
                    "photo": [],
                    "selfie": []
                  }],
                  check: true
                })
              }
            })
          } 
        },
        fail: function (res) {}, //接口调用失败的回调函数
        complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
      })
    },1500)
    }
  },
  //检验符合条件
  check() {
    if (this.data.imgList[0].photo.length < 2 || this.data.imgList[0].selfie.length < 1) {
      wx.showToast({
        title: '提供证件不全!',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      return true;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})