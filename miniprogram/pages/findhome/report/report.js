// pages/findhome/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 验证表单
   * 验证form表单是否填写完整
   */
  checkForm: function (data) {
    for (var item in data) {
      if (data[item]) {
        return true
      }
      
    }
    return false;
  },
  /**
   * 提交表单
   */
  formSubmit: function (e) {
    var data_form = e.detail.value;
    if (!this.checkForm(data_form)) {
      wx.showToast({
        title: '请将选择至少一项违规信息',
        icon: 'none',
        duration: 1000,
      })
    } else {
      wx.showToast({
        title: '感谢您的反馈，管理员将会进行审核!',
        icon: 'none',
        duration: 2000,
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1,
        })
      },2000)
     
    }

  }

})