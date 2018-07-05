//index.js
//获取应用实例
const app = getApp()
const { authUserInfo, authWechatLogin } = require('../../service/user.js')
var Http = require('../../utils/http.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [],
    user: {},
    code: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function () {

    var user = wx.getStorageSync('userInfo')
    var code = wx.getStorageSync('code')
    console.log(user)
    var data = {
      code: code,
      userInfo: user.userInfo,
      iv: user.iv,
      encryptedData: user.encryptedData
    }
    authUserInfo(data).then(res => {
      console.log(res);

    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },
  getUserInfo: function (e) {
    console.log(e)


    // 将用户信息存到本地
    wx.setStorageSync('userInfo', e.detail)

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.navigateTo({
      url: '../home/home',
    })
    this.login();




  },
  login() {

    wx.login({
      success(res) {
        console.log(res.code)
        wx.setStorageSync('code', res.code)
        if (res.code) {
          // 登录微信授权接口
          var data = {
            code: res.code
          }
          authUserInfo(data).then(res => {
            console.log(res);

          })
        }
      }
    })
  }
})
