// pages/myhome/idCard/stuCard/stuCrad.js
const app = getApp();
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const algorithm = require("../../../util/algorithm/algorithm.js") //算法
const uploadAliyun = require("../../../util/request/aliyunOss/uploadAliyun.js") //上传
const request = require("../../../util/request/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    text: ''
  },

  /**
   * 编辑发言内容
   * @param {*} e  
   */
  textareaInput(e) {
    var textInputValue = e.detail.value;
    this.setData({
      text: textInputValue
    })
  },
  /**
   * 选择图片
   */
  chooseImage(e) {
    var that = this;
    var imgList = this.data.imgList; //本地临时地址
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: res => {
        imgList.push(...res.tempFilePaths)
        if (imgList.length <= 3) {
          that.setData({
            imgList: imgList
          })
        } else {
          imgList = imgList.slice(0, imgList.length - res.tempFilePaths.length)
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

  },
  /**
   * 查看图片
   */
  viewImage(e) {
    var index = e.currentTarget.dataset.id
    wx.previewImage({
      urls: this.data.imgList,
      current: this.data.imgList[index]
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
          imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 提交反馈
   */
  sendtap: function (e) {
    if (this.check()) {
      var that = this
      var uploadData = []; //返回的地址数组
      var result = []; //排序后的地址
      var imgList = this.data.imgList; //本地临时地址
      var imageUrl = []
      imgList.forEach(function (item, index) {
        uploadAliyun.asyncUpload(item, 'bugImg').then(res => {
          console.log(res.data)
          uploadData.push({
            'index': index,
            'imageUrl': res.data.fileName
          })
          result = algorithm.sortLsit(uploadData) //冒泡排序
        })
      })
      wx.showModal({
        title: '反馈成功！',
        content: '感谢您的反馈',
        showCancel: false, //是否显示取消按钮
        confirmText: "好的", //默认是“确定”
        success: function (res) {
          var url = dataUrl.feedbackAddUrl
          for (var i = 0; i < result.length; i++) {
            imageUrl.push(result[i].imageUrl)
          }
          var data = {
            feedbackUserOpenid: app.globalData.openid,
            feedbackText: that.data.text,
            feedbackImages: JSON.stringify(imageUrl),
          }
          if (res.confirm) {
            request.request_json_post(url, data).then(res => {
              that.setData({
                imgList: [],
                text: ''
              })
            })
          }
        },
      })
    }
  },
  //检验符合条件
  check() {
    if (this.data.text == '') {
      wx.showToast({
        title: '请填写内容!',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      return true;
    }
  }
})
