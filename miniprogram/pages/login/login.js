//index.js
const app = getApp();
var url=require("../../util/dataUrl/dataUrl.js");
var nowDateTime=require("../../util/nowDateTime.js")
Page({
  data: {
    bgGif: "https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgGifUrl-2020/loading-white.gif?sign=61d02d8fe9bb6698e6d7ddd1ebed7400&t=1586870048",
    logged: false,
    toggleDelay: false, //关闭的动画效果
    chooseIndex: 0, //选择个数d
    gameIndex: null, //热门游戏索引
    modelIndex: null, //喜欢模式的索引
    userList: {
      openid: "", //用户唯一标识
      nickName: "", //昵称
      gamelist: [{
          gameName: '', //游戏名
          gameModelName: '' //喜欢的游戏模式
        },
        {
          gameName: '',
          gameModelName: ''
        }
      ],

    },
    interestList: [{
        img: "../../images/game1.png",
        name: "和平精英",
        color: "red",
        isOk: false
      },
      {
        img: "../../images/game2.png",
        name: "王者荣耀",
        color: "olive",
        isOk: false
      },
      {
        img: "../../images/game3.png",
        name: "英雄联盟",
        color: "cyan",
        isOk: false
      },
      {
        img: "../../images/game4.png",
        name: "云顶之奕",
        color: "blue",
        isOk: false
      },
      {
        img: "../../images/game5.png",
        name: "绝地求生",
        color: "mauve",
        isOk: false,
      },
      {
        img: "../../images/game6.png",
        name: "其他",
        color: "purple",
        isOk: false
      }
    ],
    interestModelList: [{
      modelName: ["城市刚枪", "郊区打野", "聊天交友", "四黑匹配", "小姐姐", "高手上分"],
    }, {
      modelName: ["城市刚枪", "郊区打野", "聊天交友", "四黑匹配", "小姐姐", "高手上分"]
    }, {
      modelName: ["城市刚枪", "郊区打野", "聊天交友", "四黑匹配", "小姐姐", "高手上分"]
    }, {
      modelName: ["城市刚枪", "郊区打野", "聊天交友", "四黑匹配", "小姐姐", "高手上分"]
    }, {
      modelName: ["城市刚枪", "郊区打野", "聊天交友", "四黑匹配", "小姐姐", "高手上分"]
    }]
  },

  onLoad: function () {
    console.log(nowDateTime.getNewDateTime())
    //动画特效
    var that = this;
    var userList = that.data.userList;
    that.setData({
      toggleDelay: true
    })
    //延迟2秒执行
    setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 2000)

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        userList.openid = res.result.openid
        that.setData({
          userList: userList
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
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
  check(e) {
    var that = this;
    var chooseIndex = that.data.chooseIndex;
    var index = e.currentTarget.dataset.id;
    var interestList = []
    var interestList = that.data.interestList;
    var userList = that.data.userList;
    // 当点击次数小于等于2次或者选择已点击按钮处罚
    if (chooseIndex < 2 || interestList[index].isOk == true) {
      if (interestList[index].isOk == false && index != 5) {
        interestList[index].isOk = true; //赋值已被选中
        //选中将值赋给用户对象
        if (userList.gamelist[chooseIndex].gameName == "") {
          userList.gamelist[chooseIndex].gameName = interestList[index].name
        }
        that.setData({
          userList: userList,
          interestList: interestList,
          chooseIndex: chooseIndex + 1 //点击次数+1
        })
        return true;
      } else if (interestList[index].isOk == true) {
        interestList[index].isOk = false;
        for (let i = 0; i < 2; i++) {
          if (userList.gamelist[i].gameName == interestList[index].name) {
            userList.gamelist.splice(i, 1) //删除当前对象，i代表索引，1代表从i开始删除几个
            userList.gamelist.push({ //增加一个对象
              gameName: '',
              gameModelName: ''
            })
          }
        }
        that.setData({
          // userList:userList,
          interestList: interestList,
          chooseIndex: chooseIndex - 1
        })
        return false;
      } else if (index == 5) { //其他游戏暂未开放
        wx.showToast({
          title: '暂未开放！',
          image: "../../images/dele.png",
          duration: 2000
        })
        return false;
      }
    } else {
      wx.showToast({
        title: '最多选择两个',
        image: "../../images/dele.png",
        duration: 2000
      })
      return false;
    }
  },
  //游戏按钮
  gameTap: function (e) {
    // 验证通过打开底部弹窗
    if (this.check(e)) {
      this.setData({
        modalName: e.currentTarget.dataset.target,
        gameIndex: e.currentTarget.dataset.id
      })
    }
  },
  //继续选择游戏
  nextModalTap: function (e) {
    this.setData({
      modalName: null,
      modelIndex: null
    })
  },
  //选择喜欢的模块
  gameModelTap: function (e) {
    var index = e.currentTarget.dataset.id;
    var userList = this.data.userList;
    var gameIndex = this.data.gameIndex;
    var interestModelList = this.data.interestModelList;
    var chooseIndex = this.data.chooseIndex;
    //喜欢的模块赋值给用户对象
    userList.gamelist[chooseIndex - 1].gameModelName = interestModelList[gameIndex].modelName[index];
    this.setData({
      userList: userList,
      modelIndex: e.currentTarget.dataset.id,
    })
  },
  //未授权，从回调中得到用户信息
  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
      })
      var userInfo = e.detail.userInfo;
      app.globalData.userInfo = e.detail.userInfo;
      // var userList=this.data.userList;
      var userList = {
        "wxName": userInfo.nickName,
        "wxOpenid": this.data.userList.openid,
        "wxAvatar": userInfo.avatarUrl,
        "wxSex": userInfo.gender
      }
      wx.request({
        url: url.loginUrl,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: JSON.stringify(userList),
        dataType: 'json',
        success: (result) => {
          console.log(result.data)
        },
        fail: (res) => {
          console.log(res)
        },
      })
    }
    wx.reLaunch({
      url: '../bottomnav/bottomnav',
    })
  }
})