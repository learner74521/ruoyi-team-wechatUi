//获得接口地址
const imagePrefix = "https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgImageUrl-2020";
const gifPrefix = "https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgGifUrl-2020";
const musicPrefix = "https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgMusicUrl-2020";
const videoPrefix = "https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/bgVideoUrl-2020";
const IconPrefix = "https://7778-wx-teamyml-2020-1301686336.tcb.qcloud.la/iconImageUrl-2020"
module.exports = {
  //图片地址
  indexMap: imagePrefix + "/index-map.png", //首页地图背景
  teamIconDefault: IconPrefix + "/team-icon-travel-default.jpg", // 组队默认图片
  topImageUrl: imagePrefix + "/top1.jpg",
  findImageUrl: imagePrefix + "/bgFind.jpg",
  home1ImageUrl: imagePrefix + "/home1.jpg",
  selectIconUrl_1: imagePrefix + "/select-1.png",
  selectIconUrl_2: imagePrefix + "/select-2.png",//蓝色
  //动态图地址
  loadingGifUrl: gifPrefix + "/loading-white.gif",
  wareGifUrl: gifPrefix + "/wave.gif",
  //音效地址
  footMusicUrl: musicPrefix + "/foot.mp3",
  //视频地址
  teamVideoUrl: videoPrefix + "/teamVideo.mp4",
  indexCircle: imagePrefix + "/index-circle-bg.png", // 首页雷达效果图

  aboutus: imagePrefix + "/about/about.png", //关于我们
  joinus: imagePrefix + "/about/joinus.png" // 加入我们
}