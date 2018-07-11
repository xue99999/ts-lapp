//index.js
//获取应用实例
const app = getApp()
const {
  authUserInfo,
  authWechatLogin
} = require('../../service/user.js')
var Http = require('../../utils/http.js');

var data, LoginData, iv, encryptedData;
var userInfo="";
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function() {

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
                LoginData = {
                  code: res.code,
                }
                //登录微信授权
                authWechatLogin(LoginData).then(result => {
                  console.log('微信授权成功,进入首页幷传入参数code', result);
                  if (result.code === 200) {
                    if (result.userFlag==='02'){
                

                      wx.redirectTo({
                        url: '../home/home?userFlag=' + res.userFlag,
                      })

                      // wx.switchTab({
                      //   url: '../taber/taber',
                      // })
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


  },
  bindGetUserInfo: function() {
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log('点击授权给后台传入对应的信息', res);
              userInfo = res.userInfo;
              iv = res.iv;
              encryptedData = res.encryptedData;
              // //微信code
              wx.login({
                success(res) {
                  console.log('微信code', res.code)
                  //参数 第一次授权的时候         
                  data = {
                    code: res.code,
                    userInfo: userInfo,
                    iv: iv,
                    encryptedData: encryptedData
                  }

                  //微信登录
                  authUserInfo(data).then(res => {
                    console.log('微信登录', res);
                    if (res.code === 200) {
                      console.log('将要保存token', res.token);
                      wx.setStorage({
                        key: "token",
                        data: res.token,
                      })
                      console.log('保存token成功,进入首页', res.token);

                      wx.redirectTo({
                        url: '../home/home?userFlag=' + res.userFlag,
                      })
                    }
                  })
                }
              })
            }
          })

        }
      }
    })
  }






})