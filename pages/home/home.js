// pages/home/home.js
var app = getApp();
const { auth}=require('../../utils/auth.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shaonv:null
  },
  // 少女入口
  clickGirl(e){

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

})