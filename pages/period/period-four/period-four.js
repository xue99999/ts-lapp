// pages/period/period-two/period-two.js
const app = getApp()
const { userInfoAdd} = require('../../../service/user.js')
var Http = require('../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1971', '1972', '1973','1974', '1975', '1976', '1977', '1979','1979','1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991',
      '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003'],
    index: 0,
    birthday:'1990'
  },
  bindPickerChange: function (e) {
    const { array}=this.data;
    const index = e.detail.value;
  
    const brday=array[index[0]];
    this.setData({
      birthday: brday
    })
    app.globalData.obj.birthday = brday
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

    //当用户点击下一步的时候保存定位属性
    app.globalData.goTo = "ok";

    userInfoAdd(data).then(res => {
      console.log('登录经期信息', res);
      // this.setData({
      //   list: res.list
      // })
  
      wx.switchTab({
        url: '../../today/today',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })
    
    
  },

  
})