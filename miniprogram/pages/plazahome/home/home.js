Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    cardCur: 0,
    bgTopUrl:"https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/top1.jpg?sign=1a9da133ae073a1018020e1194e17088&t=1596614203",
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
      title: '游戏Team',
      img: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/plaza-game.jpg?sign=ecb2d4edcc3744b917eb53634405b291&t=1596617513',
      url: '/gameteam/gameteam'
    },
      {
        title: '学习Team',
        img: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/plaza-study.jpg?sign=a82b7e09f77ecb76867fbeecc9dba303&t=1596614171',
        url: '/studyteam/studyteam'
      },
      {
        title: '兴趣Team',
        img: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/plaza-interest.jpg?sign=c1dac23d03a5d0a1e7668e6cb4773a52&t=1596618528',
        url: '/interestteam/interestteam'
      },
    {
      title: '创业Team',
      img: 'https://7778-wxteam-eric-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020/plaza-pioneer.jpg?sign=b97bf4a62931ddabc7d90a487484616f&t=1596614183',
      url: '/pioneerteam/pioneerteam'
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