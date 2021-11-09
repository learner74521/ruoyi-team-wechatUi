/**
 * 个位数字变成十位数字，规范格式
 * @param {*} param 日期参数
 */
function withData(param) {
  return param < 10 ? '0' + param : '' + param;
}
/**
 * 获取当前时间
 */
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

function getNewDate() {
  var date = new Date(),
    year = date.getFullYear(),
    month = withData(date.getMonth() + 1),
    day = withData(date.getDate()),
    nowDateTime = year + "-" + month + "-" + day;
  return nowDateTime;
}

module.exports = {
  getNewDateTime,getNewDate
}