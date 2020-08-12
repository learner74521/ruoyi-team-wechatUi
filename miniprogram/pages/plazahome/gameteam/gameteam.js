// pages/plazahome/gameteam/gameteam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elements: [{
        title: '王者荣耀',
        name: 'Arena Of Valor',
        color: 'cyan',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/wangzhe.jpg?sign=2fcc50793ad1ab3536a058f3c7b1448d&t=1596774122',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/wangzhe.jpg?sign=be2c466511c7d078c3fb45d87a09236b&t=1596771243'
      },
      {
        title: '和平精英',
        name: 'Game For Peace',
        color: 'blue',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/hepingjingying.png?sign=01718d338070874c303318539bd90fed&t=1596774149',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/hepingjingying.png?sign=cc76733b32a52dc24b6f6dcff3ab1e8d&t=1596771273'
      },
      {
        title: '英雄联盟',
        name: 'LOL',
        color: 'purple',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/lol.jpg?sign=f06755d94dbc034165b067d51e72e338&t=1596774173',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/lol.png?sign=10a5412e27c0a4913d5b6bd950ba48d4&t=1596773844'
      },
      {
        title: '求生之路2',
        name: 'Left 4 Dead 2',
        color: 'mauve',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/left4dead.jpg?sign=60877f6e2ea155e3336b8d3c3de7ee24&t=1596774187',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/left4dead.jpg?sign=aab902e3e2ef24735ab771bc5ded3990&t=1596773863'
      },
      {
        title: 'QQ飞车',
        name: 'QQ Speed',
        color: 'pink',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/qqspeed.jpg?sign=fa0b04c81335b358243d808a6fb76145&t=1596774200',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/qqspeed.jpg?sign=38133082081ee0ddfb1018cabd101927&t=1596773884'
      },
      {
        title: '穿越火线',
        name: 'CF',
        color: 'brown',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/cf.jpg?sign=65c8af900278bc3a75ecf4de9271d223&t=1596798055',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/cf.jpg?sign=d6a15d38b6db7112f5afe97ce7654387&t=1596798008'
      },
      {
        title: '地下城与勇士',
        name: 'DNF',
        color: 'red',
        icon: 'https://bkimg.cdn.bcebos.com/pic/c75c10385343fbf26ba61988b07eca8064388f97?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxNTA=,g_7,xp_5,yp_5',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/dnf.jpg?sign=1a6bb12782a1657e86b174f61d15950d&t=1596774004'
      },
      {
        title: '极品飞车Online',
        name: 'Need for speed Online',
        color: 'orange',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/nfsonline.jpg?sign=a9cb2e8af3bb6490bdaeb6a96074f2ea&t=1596774331',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/nfsonline.jpg?sign=4eb15e60670c5b96f040c5625e1b75e1&t=1596774023'
      },
      {
        title: '绝地求生',
        name: 'PUBG',
        color: 'olive',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/pubg.jpg?sign=4307d2e48c74c3bc6a321c96d303baa9&t=1596774350',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/pubg.jpg?sign=3f8cc32df160245baa41ba3dfa017e9e&t=1596774055'
      },
      {
        title: '守望先锋',
        name: 'Overwatch',
        color: 'green',
        icon: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020/gameteam/overwatch.jpg?sign=79cc5a404580228198fa5b8a0585b5ba&t=1596774367',
        bgimg: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/game/overwatch.jpg?sign=6bd21117f938100e138a90bc59ba9035&t=1596774072'
      },
    ]

  },
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      currentData: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})