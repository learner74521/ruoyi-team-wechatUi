//开发接口
const httpsDevPrefix = "https://www.linkcool.fun";
const wssDevPrefix="wss://www.linkcool.fun/wss/wechatapi/"
//测试接口
const testPrefix = "http://localhost:8088";
const prefix = testPrefix
module.exports = {
  wxChatUrl: wssDevPrefix,
  loginUrl: prefix + "/wechatapi/wxuser/post",
  uploadUrl: prefix + "/common/upload",
  contentAddUrl: prefix + "/wechatapi/content/add",
  contentUrl: [
    prefix + "/wechatapi/content/list",
    prefix + "/wechatapi/content/list",
    prefix + "/wechatapi/content/list",
    prefix + "/wechatapi/content/list"
  ],
  contentDeleteUrl: prefix + "/wechatapi/content/delete",
  statisticsAddLookUrl: prefix + "/wechatapi/statistics/addLook",
  commentUrl: prefix + "/wechatapi/comment/listById",
  commentAddUrl: prefix + "/wechatapi/comment/add",
  commentDeleteUrl: prefix + "/wechatapi/comment/delete",
  replyAddUrl: prefix + "/wechatapi/reply/add",
  replyDeleteUrl: prefix + "/wechatapi/reply/delete",
  signAddUrl: prefix+"/wechatapi/sign/add",
  signUrl: prefix+"/wechatapi/sign/list",
  userAddUrl: prefix+"/wechatapi/wxuser/add",
  interestAddUrl: prefix+"/wechatapi/interest/add"
}