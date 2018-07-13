// pages/period/period-two/period-two.js
const app = getApp()
const { auth } = require('../../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
    index: 0,
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',
    menstrualTimes:null,
    scrollShow: true,
  },
  bindPickerChange: function (e) {
    // console.log(e.target.dataset.index)
    var menstrualTimes = e.target.dataset.index+=1
    console.log('月经持续多久' + menstrualTimes+'天')
    this.setData({
      menstrualTimes: menstrualTimes
    })
    app.globalData.obj.menstrualTimes = menstrualTimes
 
  },
  navto: function () {
    wx.navigateTo({
      url: '../period-three/period-three?menstrualTimes=' + this.data.menstrualTimes,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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

    console.log(app.globalData.obj.menstrualTimes)
  }
})