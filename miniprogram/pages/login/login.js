//index.js
const app = getApp();
var dataUrl = require("../../util/dataUrl/dataUrl.js");
var request = require("../../util/request/request.js");
var nowDateTime = require("../../util/dateTime/nowDateTime.js")
const imageUrl = require("../../util/imageUrl/imageUrl.js")
Page({
  data: {
    bgGif: imageUrl.loadingGifUrl,
    logged: false,
    toggleDelay: false, //关闭的动画效果
    chooseIndex: 0, //选择个数d
    gameIndex: null, //热门游戏索引
    modelIndex: null, //喜欢模式的索引
    list: [{
        interestName: '', //游戏名
        interestModelName: '' //喜欢的游戏模式
      },
      {
        interestName: '',
        interestModelName: ''
      }
    ],
    interestList: [{
        // img: "../../images/game1.png",
        name: "旅游",
        color: "red",
        isOk: false
      },
      {
        // img: "../../images/game2.png",
        name: "学习",
        color: "olive",
        isOk: false
      },
      {
        // img: "../../images/game3.png",
        name: "团购",
        color: "cyan",
        isOk: false
      },
      {
        // img: "../../images/game4.png",
        name: "社团",
        color: "blue",
        isOk: false
      },
      {
        // img: "../../images/game5.png",
        name: "游戏",
        color: "mauve",
        isOk: false,
      },
      {
        // img: "../../images/game6.png",
        name: "其他",
        color: "purple",
        isOk: false
      }
    ],
    interestModelList: [{
      modelName: ["登山", "背包旅行", "自驾出游", "滑雪", "亲子", "聚会"],
    }, {
      modelName: ["Photoshop", "英语四六级", "软考", "专升本", "小语种", "高考"]
    }, {
      modelName: ["服饰", "生活用品", "电脑外设", "化妆品", "零食", "水果"]
    }, {
      modelName: ["音乐", "体育运动", "影视", "古风", "科技", "电竞"]
    }, {
      modelName: ["MOBA", "FPS", "吃鸡", "MC", "竞速", "战争"]
    }]
  },

  onLoad: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           app.globalData.userInfo = res.userInfo;
    //         }
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //动画特效
    var that = this;
    that.setData({
      toggleDelay: true
    })
    //延迟2秒执行
    setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 2000)
  },
  //获取用户昵称
  nickNameInput: function (e) {
    var nickName = e.detail.value;
    var userList = this.data.userList
    userList.nickName = nickName
    this.setData({
      userList: userList
    })
  },

  //验证是否合格
  // check(e) {
  //   var that = this;
  //   var chooseIndex = that.data.chooseIndex;
  //   var index = e.currentTarget.dataset.id;
  //   var interestList = []
  //   var interestList = that.data.interestList;
  //   var list = that.data.list;
  //   // 当点击次数小于等于2次或者选择已点击按钮处罚
  //   if (chooseIndex < 2 || interestList[index].isOk == true) {
  //     if (interestList[index].isOk == false && index != 5) {
  //       interestList[index].isOk = true; //赋值已被选中
  //       //选中将值赋给用户对象
  //       if (list[chooseIndex].interestName == "") {
  //         list[chooseIndex].interestName = interestList[index].name
  //       }
  //       that.setData({
  //         list: list,
  //         interestList: interestList,
  //         chooseIndex: chooseIndex + 1 //点击次数+1
  //       })
  //       return true;
  //     } else if (interestList[index].isOk == true) {
  //       interestList[index].isOk = false;
  //       for (let i = 0; i < 2; i++) {
  //         if (list[i].interestName == interestList[index].name) {
  //           list.splice(i, 1) //删除当前对象，i代表索引，1代表从i开始删除几个
  //           list.push({ //增加一个对象
  //             interestName: '',
  //             interestModelName: ''
  //           })
  //         }
  //       }
  //       that.setData({
  //         list: list,
  //         interestList: interestList,
  //         chooseIndex: chooseIndex - 1
  //       })
  //       return false;
  //     } else if (index == 5) { //其他游戏暂未开放
  //       wx.showToast({
  //         title: '暂未开放！',
  //         image: "../../images/dele.png",
  //         duration: 2000
  //       })
  //       return false;
  //     }
  //   } else {
  //     wx.showToast({
  //       title: '最多选择两个',
  //       image: "../../images/dele.png",
  //       duration: 2000
  //     })
  //     return false;
  //   }
  // },
  // 游戏按钮
  // gameTap: function (e) {
  // 验证通过打开底部弹窗
  //   if (this.check(e)) {
  //     this.setData({
  //       modalName: e.currentTarget.dataset.target,
  //       gameIndex: e.currentTarget.dataset.id
  //     })
  //   }
  // },
  //继续选择游戏
  nextModalTap: function (e) {
    this.setData({
      modalName: null,
      modelIndex: null
    })
  },
  // //选择喜欢的模块
  // gameModelTap: function (e) {
  //   var index = e.currentTarget.dataset.id;
  //   var list = this.data.list;
  //   var gameIndex = this.data.gameIndex;
  //   var interestModelList = this.data.interestModelList;
  //   var chooseIndex = this.data.chooseIndex;
  //   //喜欢的模块赋值给用户对象
  //   list[chooseIndex - 1].interestModelName = interestModelList[gameIndex].modelName[index];
  //   this.setData({
  //     list: list,
  //     modelIndex: e.currentTarget.dataset.id,
  //   })
  // },

  //隐藏授权提示弹框
  DialogModal(e) {
    this.setData({
      modalName: 'DialogModal'
    })
  },
  //隐藏授权提示弹框
  hideModal(e) {
    this.setData({
      modalName: ''
    })
  },
  onGetUserInfo(e) {
    var that=this
    // wx.showModal({
    //   title: '温馨提示',
    //   content: '正在请求您的个人信息',
    //   success(res) {
    //     if (res.confirm) {
          wx.getUserProfile({
          desc: "获取你的昵称、头像、地区及性别",
          success: res => {
               console.log(JSON.parse(res.rawData))
              //  var userInfo = JSON.parse(res.rawData);
               app.globalData.userInfo = JSON.parse(res.rawData);
               console.log(app.globalData.userInfo)
               console.log(app.globalData.userInfo.nickName)
               var url = dataUrl.userAddUrl
                var data = {
                  "wxName": app.globalData.userInfo.nickName,
                  "wxOpenid": app.globalData.openid,
                  "wxAvatar": app.globalData.userInfo.avatarUrl,
                  "wxSex": app.globalData.userInfo.gender
                }
                console.log(JSON.stringify(data) )
                request.request_json_post(url, JSON.stringify(data)).then(res => {
                 
                  console.log(res)
                  // if (into) {
                  //   request.request_json_post(interestUrl, JSON.stringify(interestData)).then(res => {})
                  // }
                  if (res.code == 0) {
                    wx.reLaunch({
                      url: '../bottomnav/bottomnav',
                    })
                  }
                })
          },
          fail: res => {
             //拒绝授权
            wx.showModal({
              title:"提示",
              content:"授权失败不可以使用",
              showCancel:false
            })
            return;
          }
    })
  },
  //未授权，从回调中得到用户信息
  // onGetUserInfos: function (e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //     })
      // wx.showModal({
      //   title: '温馨提示',
      //   content: '正在请求您的个人信息',
      //   success(res) {
      //     if (res.confirm) {
            // wx.getUserProfile({
            //   desc: "获取你的昵称、头像、地区及性别",
            //   success: res => {
            //     console.log(res)
            //     let wxUserInfo = res.userInfo;
                
            //    var userInfo = e.detail.userInfo;
            //    app.globalData.userInfo = e.detail.userInfo;
            //    var url = dataUrl.userAddUrl
            //     var data = {
            //       "wxName": userInfo.nickName,
            //       "wxOpenid": app.globalData.openid,
            //       "wxAvatar": userInfo.avatarUrl,
            //       "wxSex": userInfo.gender
            //     }
            //     request.request_json_post(url, JSON.stringify(data)).then(res => {
                  // if (into) {
                  //   request.request_json_post(interestUrl, JSON.stringify(interestData)).then(res => {})
                  // }
              //     if (res.code == 0) {
              //       wx.reLaunch({
              //         url: '../bottomnav/bottomnav',
              //       })
              //     }
              //   })
              // },
              // fail: res => {
                //拒绝授权
                // that.showErrorModal('您拒绝了请求');
            //     return;
            //   }
            // })
          // } else if (res.cancel) {
          //   //拒绝授权 showErrorModal是自定义的提示
          //   that.showErrorModal('您拒绝了请求');
          //   return;
          // }
      //   }
      // })

      // var into=e.currentTarget.dataset.into; //判断是否点击跳过
      // var interestUrl = dataUrl.interestAddUrl
      // var list = this.data.list
      // var interestData = {
      //   "interestOpenid": app.globalData.openid,
      //   "interestGamename": list[0].interestName,
      //   "interestModel": list[0].interestModelName,
      //   "interestGamenameNd": list[1].interestName,
      //   "interestModelNd": list[1].interestModelName,
      // }

    // }
  // }
})