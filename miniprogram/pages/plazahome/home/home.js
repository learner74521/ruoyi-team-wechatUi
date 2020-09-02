const imageUrl=require("../../../util/imageUrl/imageUrl.js")
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    cardCur: 0,
    bgTopUrl:imageUrl.topImageUrl,
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
      img: imageUrl.plaza1ImageUrl,
      url: '/gameteam/gameteam'
  },
    {
      title: '学习Team',
      img: imageUrl.plaza2ImageUrl,
      url: '/studyteam/studyteam'
    },
    {
      title: '兴趣Team',
      img: imageUrl.plaza3ImageUrl,
      url: '/interestteam/interestteam'
    },
    {
      title: '创业Team',
      img: imageUrl.plaza4ImageUrl,
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