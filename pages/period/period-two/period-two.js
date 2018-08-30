// pages/period/period-two/period-two.js
const app = getApp()
const { auth } = require('../../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    index: 0,
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',
    menstrualTimes: null,
    scrollShow: true,
  },
  bindChange: function (e) {

    const val = e.detail.value;
    const menstrualTimes = this.data.array[val[0]]
    console.log(menstrualTimes)
    this.setData({
      menstrualTimes: menstrualTimes
    })
    app.globalData.obj.menstrualTimes = menstrualTimes
  },
  navto: function () {
    wx.navigateTo({
      url: '../period-three/period-three?menstrualTimes=' + this.data.menstrualTimes,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const parmas = {
      tag: 'switch'
    }
    auth(parmas)
  },
  chooseImg: function (e) {
    this.setData({
      show: !this.data.show
    })
    console.log(e)
    if (this.data.show) {
      app.globalData.obj.menstrualTimes = 5
      console.log(app.globalData.obj.menstrualTimes)
      this.setData({
        scrollShow: false
      })
    }
    else {
      this.setData({
        scrollShow: true
      })
      app.globalData.obj.menstrualTimes = this.data.menstrualTimes
    }
  }
})