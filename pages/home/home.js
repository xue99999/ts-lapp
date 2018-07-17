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
    if (!option.iscondition) {
      auth();
    }
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

    //getApp().setStorageSync('shaonv','01');
  },
  // 辣妈入口
  clickMother(e) {
    app.globalData.obj.shaonv = '02'
    wx.navigateTo({
      url: '../home-mother/mother-five/mother-five',
    })
   // getApp().setStorageSync('shaonv', '02');
  },
  getDataDay() {
    const day = moment().format('YYYY-MM-DD');
    var data = {
      startDay: day,
      endDay: day
    }
    userInfoQueryBodyStatus(data).then(result => {
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