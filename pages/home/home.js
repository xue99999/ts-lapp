// pages/home/home.js
var app = getApp();
const {
  auth
} = require('../../utils/auth.js');
const {
  userInfoAdd,
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
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
    if (!option.iscondition) {
      this.getDataDay()
      auth();
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

  },
  // 辣妈入口
  clickMother(e) {
    app.globalData.obj.shaonv = '02'
    wx.navigateTo({
      url: '../home-mother/mother-one/mother-one',
    })
  },
  notrecord(){
    var data={}
    userInfoAdd(data).then(res=>{
      console.log(res)
      wx.switchTab({
        url: '../today/today',
      })
    })
  },
  getDataDay() {
    const day = moment().format('YYYY-MM-DD');
    var data = {
      startDay: day,
      endDay: day
    }
    userInfoQueryBodyStatus(data).then(result => {
      if (result.code === 200) {
     
        if (result.birthday) {
          wx.switchTab({
            url: '../today/today',
          })
        } 
        // else {
        //   console.log('没有出生年月');
        //   wx.redirectTo({
        //     url: '../home/home',
        //   })
        // }
      }
    })
  },
  onShareAppMessage: function (options) {
    　　var that = this;
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
      　　　　title: "她师",        // 默认是小程序的名称(可以写slogan等)
      　　　　path: '/pages/today/today',        // 默认是当前页面，必须是以‘/’开头的完整路径
      　　　　imgUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      　　　　success: function (res) {
        　　　　　　// 转发成功之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
        　　　　　　}
      　　　　},
      　　　　fail: function () {
        　　　　　　// 转发失败之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
          　　　　　　　　// 用户取消转发
        　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
          　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
        　　　　　　}
      　　　　}
    　　}
  }

})