//index.js
//获取应用实例
const app = getApp()
const {
  login,
  loginWithCode
} = require('../../service/user.js')

var data, LoginData, iv, encryptedData;
var userInfo = "";

// 路由信息
var routeQuery=null;
Page({
  data: {
    route:{},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function (option) {
    console.log(option)
    if(option){
      routeQuery=option;
    }
    console.log('router', routeQuery)
  
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
                          //当不是新用户的时候
                          //判断是不是走完了引导页
                          //如果走完了就直接去首页 -taber
                      if (app.globalData.goTo === 'ok') {
                        wx.switchTab({
                          url: '../today/today',
                        })
                      } else {
                        //没有走完就重新走
                        wx.redirectTo({
                          url: '../home/home?userFlag=' + res.userFlag,
                        })
                      }
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindGetUserInfo: function() {
    // 查看是否授权
    const that=this;
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
                  login(data).then(res => {
                    console.log('微信登录', res);
                    if (res.code === 200) {
                      console.log('将要保存token', res.token);
                      wx.setStorage({
                        key: "token",
                        data: res.token,
                      })
                      console.log('保存token成功,进入首页', res.token);
                      console.log(routeQuery);

                      if(routeQuery){
                        console.log(routeQuery)
                        // tag:navigate redirect switch reLaunch
                        const {callback,tag='1'}=routeQuery;
                    
                      switch (tag){
                        case "redirect":
                            wx.redirectTo({
                              url: callback
                            })
                         break;
                        case "reLaunch":
                          wx.reLaunch({
                            url: callback
                          })
                          break;
                        case "switch":
                          wx.switchTo({
                            url: callback
                          })
                          break;
                         default:
                          wx.redirectTo({
                            url: callback,
                          })
                          break;
                      }

                      }

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