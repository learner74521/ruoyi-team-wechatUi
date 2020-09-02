const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    imgList: [],
    index: null,
  },

  /**
   * 发表
   */
  sendtap: function(e) {
    var that = this
    for (var i = 0; i < that.data.imgList.length; i++) {
      wx.uploadFile({
        url: 'https://www.linkcool.fun:8089/Medical/upload.action',
        filePath: that.data.imgList[i],
        name: 'head_img',
        header: {
          "Content-Type": "multipart/form-data"
        },

        success: res => {
          console.log('[上传文件] 成功：', res)

        },
        fail: e => {
          console.error('[上传文件] 失败：', e)

        }
      })
    }
    wx.showModal({
      title: '温馨提示',
      content: '确定发表动态~',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          var text = e.detail.value.udiscuss;
          that.setData({
            text: text
          });
          var openid = app.globalData.openid
          var log = {
            uid: openid,
            content: text,
          }
          console.log(log)
          wx.request({
            url: 'https://www.linkcool.fun:8089/Medical/insertphoto.action',
            data: JSON.stringify(log),
            header: {
              "content-type": "application/json"
            },
            method: "post",
            dataType: 'json',
            success(res) {
              var result = res.data
              console.log(res.data)
              if (result == 1) {
                that.setData({
                  text: '',
                  imgList: [],
                })
                wx.navigateTo({
                  url: '../../menu/comment/comment',
                })
              } else if (result == 0) {
                wx.showToast({
                  title: '文字图片为空!',
                  duration: 2000
                })
              }
            }
          })
        } else if (res.cancel) {
          wx.request({
            url: 'https://www.linkcool.fun:8089/Medical/clearlist.action',
            method: 'GET',
            header: {
              "content-type": "application/json"
            },
            dataType: 'json',
            success: function(res) {
              console.log("111111111" + res.data)
              var result = res.data
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
    })
  },
  /**
   * 选择图片
   */
  ChooseImage(e) {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        console.log(this.data.imgList)
      }
    })

  },
  /**
   * 查看图片
   */
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  /**
   * 删除图片
   */
  DelImg(e) {
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
})