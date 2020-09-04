/**
 * 异步阻塞上传文件
 * url上传文件的地址
 * item要上传文件资源的路径 (本地路径)
 * key文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
 */
function asyncUpload(url, item, key){
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: url,
      filePath: item,
      name: key,
      header: {
        'Content-Type': 'multipart/form-data'
      },
      success(res) {
        console.log(res)
        var filedata = JSON.parse(res.data) //返回字符串转化为json对象
        resolve({
          data: filedata
        });
      },
      fail: res => {
        console.error(res)
        return wx.showToast({
          title: '上传失败',
          image: '../../images/dele.png',
          duration: 2000
        })
      }
    })
    })
}
  /**
   * 异步非阻塞上传文件
   * url上传文件的地址
   * item要上传文件资源的路径 (本地路径)
   * key文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
   */
  function uploadFile(url, item, key) {
    wx.uploadFile({
      url: url,
      filePath: item,
      name: key,
      header: {
        'Content-Type': 'multipart/form-data'
      },
      success(res) {
        var filedata = JSON.parse(res.data) //返回字符串转化为json对象
        return filedata
      },
      fail: res => {
        console.error(res)
        return wx.showToast({
          title: '上传失败',
          image: '../../images/dele.png',
          duration: 2000
        })
      }
    })
  }
  //暴露出去的方法
  module.exports = {
    asyncUpload,
    uploadFile
  }