const app = getApp()
const { userInfoAdd } = require('../../../service/user.js')
var Http = require('../../../utils/http.js');
const { auth } = require('../../../utils/auth.js');
const birthday = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991',
      '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006'],
    birthday: birthday,
  },
  onLoad: function () {
    const parmas = {
      tag: 'switch'
    }
    auth(parmas)
  },
  bindPickerChange: function (e) {
    const val = e.detail.value;
    const birthday = this.data.array[val[0]]
    console.log(birthday)
    app.globalData.obj.birthday = birthday;
  
  },
  navto: function () {

    var data = {
      'userModel': app.globalData.obj.shaonv,
      'menstrualStartTime': app.globalData.obj.menstrualStartTime,
      'menstrualTimes': app.globalData.obj.menstrualTimes,
      'menstrualCycle': app.globalData.obj.menstrualCycle,
      'birthday': app.globalData.obj.birthday
    }
    console.log(data)

    userInfoAdd(data).then(res => {
      console.log('登录经期信息', res);
      wx.switchTab({
        url: '../../today/today',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })

    //当用户点击下一步的时候保存定位属性
    app.globalData.goTo = "ok";

   
  }
})