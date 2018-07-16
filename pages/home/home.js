// pages/home/home.js
var app = getApp();
const {
  auth

} = require('../../utils/auth.js');
const {
  loginWithCode,
  userInfoQueryBodyStatus
} = require('../../service/user.js');
const moment = require('../../utils/moment.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shaonv: null
  },
  onLoad: function(option) {
      auth();
      this.getDataDay()
 
  },
  // 少女入口
  clickGirl(e) {

    this.setData({
      shaonv: this.data.shaonv
    })
    app.globalData.obj.shaonv = '01'
    wx.navigateTo({
      url: '../period/period-one/period-one',
    })
    console.log(app.globalData.obj.shaonv)
  },
  // 辣妈入口
  clickMother(e) {
    app.globalData.obj.shaonv = '02'
    wx.navigateTo({
      url: '../home-mother/mother-five/mother-five',
    })
  },
  getDataDay() {
    const day= moment().format('YYYY-MM-DD');
    var data = {
      startDay: day,
      endDay: day
    }
    userInfoQueryBodyStatus(data).then(result => {
      console.log('查询身体状态接口', result);
      if (result.code === 200) {

      if (result.userModel) {
        wx.switchTab({
          url: '../today/today',
        })
      } else {
        wx.redirectTo({
          url: '../home/home?characteristic=1',
        })
      }
    }
  })
  }

})