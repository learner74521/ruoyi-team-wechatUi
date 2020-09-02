Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    cardCur: 0,
    bgTopUrl:"https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/top1.jpg?sign=ce8d7c787157668b57db8e4e92747b9f&t=1586679222",
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    list: [{
      title: '创业Team',
      img: 'https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/plaza1.jpg?sign=4d625501a036159b3d75b1a984bdaa49&t=1586679556',
      url: '/indexes/indexes'
  },
    {
      title: '租车Team',
      img: 'https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/plaza2.jpg?sign=a4d90bfcda59ce58ecb3971396408bc3&t=1586679190',
      url: '/animation/animation'
    },
    {
      title: '游戏Team',
      img: 'https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/plaza3.jpg?sign=52a5e66eab3c10028c1ea6f12b147bc6&t=1586679209',
      url: '/gameteam/gameteam'
    }
  ]
},

lifetimes: {
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { console.log("attached")},
  moved: function () {console.log("moved") },
  detached: function () { console.log("detached")},
},
pageLifetimes: {
  // 组件所在页面的生命周期函数
  show: function () {console.log("show") },
  hide: function () {console.log("hide") },
  resize: function () { console.log("resize")},
},


  
methods:{
   // cardSwiper
   cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  toChild(e){
    var profix=e.currentTarget.dataset.url
    console.log(profix)
    wx.navigateTo({
      url: '/pages/plazahome'+profix,
    })
  }
}
})