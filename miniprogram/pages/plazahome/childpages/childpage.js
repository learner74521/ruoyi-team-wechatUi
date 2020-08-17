// miniprogram/pages/plazahome/childpages/childpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
    title: 'null',
    tablist: ['全部', '双排', '五黑', '王者局', '带妹'],
    wteams: [{
        id: 1,
        gtype: 'wangzhe',
        type: '带妹',
        name: '带妹上分'
      },
      {
        id: 2,
        gtype: 'wangzhe',
        type: '五黑',
        name: '快乐五黑'
      },
      {
        id: 3,
        gtype: 'wangzhe',
        type: '王者局',
        name: '上分50星'
      },
      {
        id: 4,
        gtype: 'wangzhe',
        type: '五黑',
        name: '熬夜冠军'
      },
      {
        id: 5,
        gtype: 'wangzhe',
        type: '双排',
        name: '奥里给'
      },
      {
        id: 6,
        gtype: 'wangzhe',
        type: '双排',
        name: '一起双排'
      }
    ]
  },
  // 选项卡切换
  selected: function(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    // if (index == 0) {
    //   that.setData({
    //     selected: 0
    //   })
    // } else if (index == 1) {
    //   that.setData({
    //     selected: 1
    //   })
    // } else if (index == 2) {
    //   that.setData({
    //     selected: 2
    //   })
    // } else {
    //   that.setData({
    //     selected: 3
    //   })
    // }
    that.setData({
      selected: index
    })
  },


  methods: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      title: options.name
    })
  }
})