//开发接口
const httpsDevPrefix = "https://www.linkcool.fun";
const wssDevPrefix = "wss://www.linkcool.fun/wss/wechatapi/";
//测试接口
const testPrefix = "http://localhost:8088";
const testwssPrefix="ws://localhost:8088/wechatapi/";

const prefix = httpsDevPrefix
module.exports = {
  //聊天室url
  wxChatUrl: wssDevPrefix,

  //登录页url
  wxuserUrl: prefix + "/wechatapi/wxuser/list",
  interestAddUrl: prefix + "/wechatapi/interest/add",
  userAddUrl: prefix + "/wechatapi/wxuser/add",
  userEditUrl: prefix + "/wechatapi/wxuser/edit",

  //上线下线
  userOnlineUrl: prefix + "/wechatapi/wxuser/online",

  //上传图片
  uploadUrl: prefix + "/common/upload",//上次云服务器，已经取消使用
  //发现
  contentAddUrl: prefix + "/wechatapi/content/add",//新增动态
  contentUrl: [
    prefix + "/wechatapi/content/list",
    prefix + "/wechatapi/content/careList",
    prefix + "/wechatapi/content/list",
  ],//动态列表
  contentDeleteUrl: prefix + "/wechatapi/content/delete",//删除动态
  statisticsAddLookUrl: prefix + "/wechatapi/statistics/addLook",//增加浏览量
  commentUrl: prefix + "/wechatapi/comment/list",//评论列表
  commentAddUrl: prefix + "/wechatapi/comment/add",//新增评论
  commentDeleteUrl: prefix + "/wechatapi/comment/delete",//删除评论
  replyAddUrl: prefix + "/wechatapi/reply/add",//新增回复
  replyDeleteUrl: prefix + "/wechatapi/reply/delete",//删除回复
  careAddUrl: prefix + "/wechatapi/care/add",//新增关注
  careDeleteUrl: prefix + "/wechatapi/care/delete",//取消关注

  //签到
  signAddUrl: prefix + "/wechatapi/sign/add",//新增签到
  signUrl: prefix + "/wechatapi/sign/list",//查看签到
  
  sysChatUrl:prefix+"/wechatapi/sys/list",//系统活动
  chatRoomUrl: prefix + "/wechatapi/chatRoom/list", // 队伍列表
  chatRoomUrlCreator: prefix + "/wechatapi/chatRoom/listByCreator", // 创建的队伍列表
  chatRoomJoinedUrl: prefix + "/wechatapi/chatRoom/listByPeople", // 加入的队伍列表
  chatRoomCreateUrl: prefix + "/wechatapi/chatRoom/add", // 创建队伍
  chatRoomNewsUrl:prefix+"/wechatapi/chatRoom/chatRoomList",//消息列表
  chatRoomSearchUrl: prefix + "/wechatapi/chatRoom/listBySearch", // 搜索队伍
  chatRoomJoinUrl: prefix + "/wechatapi/people/add", // 加入队伍
  chatRoomPeopleUrl:prefix+"/wechatapi/people/list",//队伍成员
  PeopleQuitUrl:prefix+"/wechatapi/people/delete",//成员退出
  chatRoomRemoveUrl:prefix+"/wechatapi/chatRoom/remove",//删除聊天室
  chatUnreadUrl: prefix + "/wechatapi/unread/sum",//消息总条数
  //身份认证api
  idcardAddUrl: prefix + "/wechatapi/authentication/add",
  idcardUrl: prefix + "/wechatapi/authentication/list",
  //bug反馈
  feedbackAddUrl: prefix + "/wechatapi/feedback/add",
}