const moment =require('./moment.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
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

/**
 * 获取当前周
 * 格式 :7 1 2 3 4 5 6 
 */
function currentWeek(){
  //console.log(moment('2018-7-31').endOf('week').format('D'))
  // console.log(moment('2018-7-31').startOf('week').format('D'))
  var returnArr = [];
  var weekOfday = moment().format('E');
  for (let i = weekOfday; i>=1 ; i--) {
    const day = moment().subtract(i, 'days').format('DD');
    returnArr.push(day);
  }

  var today = moment().format('DD');
  returnArr.push(today);

  for (let i = 1; i <(7 - weekOfday);i++){
    const day = moment().add(i, 'days').format('DD');
    returnArr.push(day);
  }

  return returnArr;
 
}

module.exports = {
  currentWeek,
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo
}