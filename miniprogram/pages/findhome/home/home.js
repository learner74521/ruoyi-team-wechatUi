// pages/findhome/find/find.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {

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
  }
  
})