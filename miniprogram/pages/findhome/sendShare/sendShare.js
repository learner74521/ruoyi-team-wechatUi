const app = getApp();
const label = require("../../../util/label/label.js") //标签
const dataUrl = require("../../../util/dataUrl/dataUrl.js")
const algorithm = require("../../../util/algorithm/algorithm.js") //算法
const upload = require("../../../util/request/upload.js") //上传
const request = require("../../../util/request/request.js")
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
    ColorList: label.labelList
  },

  /**
   * 发表
   */
  sendtap: function (e) {
    var that=this
    var uploadData = []; //返回的地址数组
    var result=[]; //排序后的地址
    var imgList = this.data.imgList; //本地临时地址
    var imageUrl=[]
    imgList.forEach(function (item, index) {
      const url = dataUrl.uploadUrl
      upload.asyncUpload(url, item, 'file').then(res => {
        uploadData.push({
          'index': index,
          'imageUrl': res.data.url
        })
        result = algorithm.sortLsit(uploadData) //冒泡排序
      })
    })
   

    wx.showModal({
      title: '发表成功！',
      content: '是否前往查看',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        var url=dataUrl.contentAddUrl
        for(var i=0;i<result.length;i++){
          imageUrl.push(result[i].imageUrl)
        }
        var data={
          contentUserOpenid:app.globalData.openid,
          contentText:that.data.text,
          contentType:'text_image',
          contentImages:JSON.stringify(imageUrl),
          contentLabel:that.data.labelList[0].title
        }
         if (res.cancel) {
          request.request_json_post(url,data).then(res=>{
            console.log(res)
          })
         } else {
          request.request_json_post(url,data).then(res=>{
            console.log(res)
          })
         }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
   })

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
      count: 9,
      sourceType: ['album', 'camera'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: res => {
        imgList.push(...res.tempFilePaths)
        if(imgList.length<=9)
        that.setData({
          imgList: imgList
        })
        else{
          wx.showToast({
            title: '图片超额!',
            icon:'loading',
            duration:1000,
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