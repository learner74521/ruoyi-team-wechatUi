//开发接口
const  devPrefix ="https://www.linkcool.fun";
//测试接口
const  testPrefix ="http://192.168.194.1:8088";
const prefix=devPrefix
module.exports = {
  wxChatUrl:"ws://www.linkcool.fun/wechatapi/",
  loginUrl: prefix+"/wechatapi/wxuser/post", 
  uploadUrl: prefix+"/common/upload",
  contentUrl:[prefix+"/wechatapi/content/list",
              prefix+"/wechatapi/content/list",
              prefix+"/wechatapi/content/list",
              prefix+"/wechatapi/content/list"
               ]
  
}

