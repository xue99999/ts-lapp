// pages/period/period-two/period-two.js
const app = getApp()
const { userInfoAdd} = require('../../../service/user.js')
var Http = require('../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991',
      '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003'],
    index: 0,
  },
  bindPickerChange: function (e) {
    // console.log(e.currentTarget.dataset.nian+'年出生。')
    var birthday = e.currentTarget.dataset.nian
    app.globalData.obj.birthday = birthday
  },
  navto: function () {

    var data = {
      'userModel': app.globalData.obj.shaonv,
      'menstrualStartTime': app.globalData.obj.menstrualStartTime,
      'menstrualTimes': app.globalData.obj.menstrualTimes,
      'menstrualCycle': app.globalData.obj.menstrualCycle,
      'birthday': app.globalData.obj.birthday,
      'babySex':'01',
      'babyBirthday':'2017'
    }
    console.log(data.userModel)

    //当用户点击下一步的时候保存定位属性
    app.globalData.goTo = "ok";

    userInfoAdd(data).then(res => {
      console.log('登录经期信息', res);
      wx.switchTab({
        url: '../../today/today',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })
    
    
  }

})