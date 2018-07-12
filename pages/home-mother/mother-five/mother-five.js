// pages/period/period-two/period-two.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['小公主', '小王子'],
  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-six/mother-six',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindChange:function(e){
    if (e.detail.value==0){
      app.globalData.obj.babySex = '01'
    }
    else if (e.detail.value == 1){
      app.globalData.obj.babySex = '02'      
    }
    console.log('宝宝信息-----'+app.globalData.obj.babySex)
  },
})