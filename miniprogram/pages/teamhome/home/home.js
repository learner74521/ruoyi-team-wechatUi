// pages/teamhome/team/team.js
const app=getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      Custom: app.globalData.Custom,
      TabColor:"orange",
      TabCur:0,
      TabName:"推荐",
      bgVideo:"https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgVideoUrl-2020/teamVideo.mp4?sign=63b66a10dc080924bde224f0070d768e&t=1588162535",
      topNavList:[
         {name:"推荐",color:"orange"},
         {name:"热门",color:"red"},
         {name:"已加",color:"olive"},
         {name:"我的",color:"cyan"}]
  },
  tabSelect(e) {
    var TabCur=e.currentTarget.dataset.id;
    var topNavList=[];
    topNavList=this.data.topNavList;
    var TabName=topNavList[TabCur].name
    var TabColor=topNavList[TabCur].color
    this.setData({
        TabCur: TabCur,
        TabName:TabName,
        TabColor:TabColor,
        modalName: null,
        TabIndex:-1
      })
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
  
  //移动按钮
  moveTap(e){
       var moveTap=e.currentTarget.dataset.tap;
       var index=e.currentTarget.dataset.id
       if(moveTap=="left"){
        this.setData({
          modalName: e.currentTarget.dataset.target,
          TabIndex:index
        })
       }else{
        this.setData({
          modalName: null,
          TabIndex:-1
        })
       }
  },
 
 
  }
})