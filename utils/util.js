const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 秒转分秒
 * @param value
 * @returns {string}
 */
function formatSeconds(value) {
  let theTime = parseInt(value);// 秒
  let theTime1 = 0;// 分
  let theTime2 = 0;// 小时
  // alert(theTime);
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  let result = `${parseInt(theTime)}秒`;
  if (theTime1 > 0) {
    result = `${parseInt(theTime1)}分${result}`;
  }
  if (theTime2 > 0) {
    result = `${parseInt(theTime2)}时${result}`;
  }
  return result;
}

module.exports = {
  formatSeconds:formatSeconds,
  formatTime: formatTime
}
