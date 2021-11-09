// pages/myhome/setting/setting.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:'',
    navColor:''
  },
  onLoad:function(e){
  this.setData({
    checked:app.globalData.isMusic,
    navColor:app.globalData.navColor
  })
  },
  /**
   * 音效开关
   */
  switchTap(e){
   console.log(e.detail.value)
   if(!e.detail.value){
     app.globalData.isMusic=false
   }else{
    app.globalData.isMusic=true
   }
  },
  /**
   * 导航栏皮肤
   */
  navColorTap(e){
    var  navColor= e.currentTarget.dataset.color
    console.log(navColor)
    this.setData({
      navColor: navColor
    })
    if(navColor!=''){
      app.globalData.navColor=navColor
    }
  }
})