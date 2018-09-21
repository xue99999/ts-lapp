//index.js
//获取应用实例
const app = getApp()
const {
  login,
  loginWithCode,
  userInfoQueryBodyStatus
} = require('../../service/user.js')
const moment = require('../../utils/moment.js');
var data, LoginData, iv, encryptedData;
var userInfo = "";

// 路由信息
var routeQuery=null;
Page({
  data: {
    route:{},
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称

    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function (option) {

    // const updateManager = wx.getUpdateManager()

    // updateManager.onCheckForUpdate(function (res) {
    //   // 请求完新版本信息的回调
    //   console.log(res.hasUpdate)
    // })

    // updateManager.onUpdateReady(function () {
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '新版本已经准备好，是否重启应用？',
    //     success: function (res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })
    // })

    // updateManager.onUpdateFailed(function () {
    //   // 新版本下载失败
    // })


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
    


  },
  bindError(){
    console.log('当使用开放能力时，发生错误的回调')
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
    console.log('点击开始授权')
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
                      wx.setStorageSync('token', res.token)

                      if(routeQuery){
                        // tag:navigate redirect switch reLaunch
                        const { callback ='/pages/home/home',tag='1'}=routeQuery;

                        if('/pages/home/home'===callback){
                          const day = moment().format("YYYY-MM-DD");
                            that.getDataDay(day)
                        }
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
                          wx.switchTab({
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
        } else {
          wx.switchTab({
            url: '../home/home',
          })
        }
      }
    })
  }

})