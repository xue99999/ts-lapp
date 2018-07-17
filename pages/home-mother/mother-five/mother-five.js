const { auth } = require('../../../utils/auth.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['小公主', '小王子'],
  },
  onLoad: function () {
    const parmas = {
      tag: 'switch'
    }
    auth(parmas)
  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-six/mother-six'
    })
  },
  bindChange:function(e){
    if (e.detail.value==0){
      app.globalData.obj.babySex = '01'
    }
    else if (e.detail.value == 1){
      app.globalData.obj.babySex = '02'      
    }
  },
})