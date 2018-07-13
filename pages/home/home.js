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
var day;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shaonv: null
  },
  onLoad: function(option) {
    day = moment().format("YYYY-MM-DD");
    auth();
    if (!option.characteristic){

  
    var than = this;
    // 查看是否授权
  wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('已授权', res);
          // //微信code
          wx.login({
            success(res) {
              console.log('微信code', res.code)
              if (res != '') {
                var LoginData = {
                  code: res.code,
                }
                //登录微信授权
                loginWithCode(LoginData).then(result => {
                  console.log('微信授权成功,进入首页幷传入参数code', result);
                  if (result.code === 200) {
                    console.log('将要保存token', result.token);
                    wx.setStorage({
                      key: "token",
                      data: result.token,
                    })
                    console.log('保存token成功,进入首页', result.token);
                    if (result.userFlag === '02') {
                      console.log('day>>>', day);
                      than.getDataDay(day);
                    }
                  }
                })
              }
            }
          })

        } else {
          console.log('尚未授权', res);
        }
      }
    })
    }
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
  getDataDay(day) {

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
        }else{
          wx.redirectTo({
            url: '../home/home?characteristic=1',
          })
        }
       
         
     
      }
    })


  }

})