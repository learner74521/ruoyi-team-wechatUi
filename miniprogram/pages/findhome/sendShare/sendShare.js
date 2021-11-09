const app = getApp();
const label = require("../../../util/dataDict/label.js") //标签
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const algorithm = require("../../../util/algorithm/algorithm.js") //算法
const uploadAliyun = require("../../../util/request/aliyunOss/uploadAliyun.js") //上传
const request = require("../../../util/request/request.js")
const QQMapWX = require("../../../util/map/qqmap-wx-jssdk")
const qqMapsdk = new QQMapWX({
  key: 'OMBBZ-NIQC2-UHKUB-C2JON-FNE5S-TZBSZ' //申请的开发者秘钥key
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warnTitle: "小主~，快来分享你的动态吧 ^_^ !", //警告提示
    warn: false, //警告关闭
    check: true, //检验开启，不能发送
    text: '',
    labelList: [],
    imgList: [],
    index: null,
    result: [], //排序后的地址
    ColorList: label.labelList,
    district: '', //所在城市
    position: {}, //地理位置
  },

  onLoad: function (e) {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 参考系
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("纬度=" + latitude + " 经度=" + longitude);
        that.getLocal(latitude, longitude)
      }
    })
  },
  getLocal: function (latitude, longitude) {
    let that = this;
    qqMapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res)
        var position = {
          latitude: latitude,
          longitude: longitude
        }
        // 从返回值中提取需要的业务地理信息数据
        that.setData({
          district: res.result.address_component.district,
          position: position
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
 /**
  * 请求发表
  * @param {*} results 图片列表
  */
  requestSend(results) {
    var that = this
    var result = results; //排序后的地址
    var imgList = that.data.imgList; //本地临时地址
    var imageUrl = []
    if (result.length == imgList.length) {
      wx.showModal({
        title: '发表成功！',
        content: '是否前往查看',
        showCancel: true, //是否显示取消按钮
        cancelText: "否", //默认是“取消”
        confirmText: "是", //默认是“确定”
        success: function (res) {
          console.log(JSON.stringify(that.data.position))
          var url = dataUrl.contentAddUrl
          for (var i = 0; i < result.length; i++) {
            imageUrl.push(result[i].imageUrl)
          }
          var data = {
            contentUserOpenid: app.globalData.openid,
            contentText: that.data.text,
            contentType: 'text_image',
            contentImages: JSON.stringify(imageUrl),
            contentLabel: that.data.labelList[0].title,
            contentCity: that.data.district,
            contentPosition: JSON.stringify(that.data.position)
          }
          if (res.cancel) {
            request.request_json_post(url, JSON.stringify(data)).then(res => {
              if (res.code == 0) {
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                prevPage.setData({
                  prev: true
                });
                that.setData({
                  imgList: [],
                  labelList: [],
                  text: ''
                })
              }
            })
          } else {
            request.request_json_post(url, JSON.stringify(data)).then(res => {
              if (res.code == 0) {
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                prevPage.setData({
                  prev: true
                });
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '上传出错或图片太大，请检查网络！',
        icon: 'none',
        duration:2000
      })
    }
  },

  /**
   * 发表
   */
  sendtap: function (e) {
    var that = this
    var results = []; //排序后的地址
    var imgList = this.data.imgList; //本地临时地址
    var uploadData = [] //上传后的地址
    var  duration
    if(imgList.length<=4){
      duration=2000
    }else{
      duration=imgList.length*500
    }
    imgList.forEach(function (item, index) {
      uploadAliyun.asyncUpload(item, 'profile').then(res => {
        uploadData.push({
          'index': index,
          'imageUrl': res.data
        })
        results = algorithm.sortLsit(uploadData) //冒泡排序

      })
    })
    wx.showLoading({
      title: '上传中',
    })
    setTimeout(function () {
      wx.hideLoading()
      that.requestSend(results)
    }, duration)

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
    this.checkTap()
  },
  /**
   * 选择图片
   */
  chooseImage(e) {
    var that = this;
    var imgList = this.data.imgList; //本地临时地址
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: res => {
        imgList.push(...res.tempFilePaths)
        if (imgList.length <= 6)
          that.setData({
            imgList: imgList
          })
        else {
          imgList = imgList.slice(0, imgList.length - res.tempFilePaths.length)
          that.setData({
            imgList: imgList
          })
          wx.showToast({
            title: '图片超额!',
            icon: 'loading',
            duration: 2000,
          })
        }
        this.checkTap()
      }
    })
  },
  /**
   * 查看图片
   */
  viewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
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
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  //选择标签
  chooseLabelTap(e) {
    var index = e.currentTarget.dataset.id;
    var labelList = []
    labelList[0] = this.data.ColorList[index];
    this.setData({
      labelList: labelList,
    })
    this.checkTap()
  },
  /**
   * 验证符合发表条件
   * @param {} e 
   */
  checkTap() {
    var warnTitle = '',
      warn = false,
      check = true
    if (this.data.text != '' || this.data.imgList.length != 0) {
      if (this.data.labelList.length != 0) {
        warnTitle = "小主~，快分享给大家吧 ^_^！"
        warn = false
        check = false
      } else {
        warnTitle = "小主~，请选择标签！"
        warn = true
        check = true
      }
    } else {
      warnTitle = "小主~，请填写发言内容或上传图片！"
      warn = true
      check = true
    }
    this.setData({
      warnTitle: warnTitle,
      warn: warn,
      check: check
    })
  }
})