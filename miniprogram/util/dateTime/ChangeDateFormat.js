/**
 * 时间戳转化为年 月 日 时 分 秒 
 * @param {*} number number: 传入时间戳 
 * @param {*} format format：返回格式，支持自定义，但参数必须与formateArr里保持一致 例如：y-m-d h:m:s
 */
function ChangeDateFormat(number, format) {
    var formateArr = ['y', 'm', 'd', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number * 1);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
 
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
   
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;

}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

module.exports = {
   ChangeDateFormat,
}
