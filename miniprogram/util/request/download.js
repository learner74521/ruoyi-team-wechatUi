/**
 * 异步阻塞下载文件
 * url下载文件的地址
 */
function synDownload(url){
  wx.downloadFile({
    url: url,
    success (res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        wx.playVoice({
          filePath: res.tempFilePath
        })
      }
    }
  })
}
//暴露出去的方法
module.exports = {
  synDownload
}