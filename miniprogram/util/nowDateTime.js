// 个位数字变成十位数字，规范格式
function withData(param) {
  return param < 10 ? '0' + param : '' + param;
}
// 获取当前时间 yyyy-mm-dd hh:mm:ss
function getNewDateTime() {
  var date = new Date(),
    year = date.getFullYear(),
    month = withData(date.getMonth() + 1),
    day = withData(date.getDate()),
    hours = withData(date.getHours()),
    minutes = withData(date.getMinutes()),
    seconds = withData(date.getSeconds()),
    nowDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return nowDateTime;
}
module.exports = {
  getNewDateTime: getNewDateTime
}
