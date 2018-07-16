// pages/period/period-two/period-two.js
const app = getApp()
const { auth } = require('../../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
      '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
    ],
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',

    index: 0,
    scrollTop: 1130,
    scrollShow: true,
    menstrualCycle: null,  //持续多久
  },
  onLoad: function () {
    const parmas = {
      tag: 'switch'
    }
    auth(parmas)
  },
  chooseImg: function (e) {
     this.setData({
      show: !this.data.show
    })
    if (this.data.show) {

      app.globalData.obj.menstrualCycle = 28   //默认28
      this.setData({
        scrollShow: false
      })

    }
    else {
      this.setData({
        scrollShow: true
      })
      app.globalData.obj.menstrualCycle = this.data.menstrualCycle  //自己设置
      console.log(app.globalData.obj.menstrualCycle)
    }
  },
  bindPickerChange: function (e) {
    const val = e.detail.value;
    const menstrualCycle = this.data.array[val[0]]  
    console.log(menstrualCycle)
    app.globalData.obj.menstrualCycle = menstrualCycle

  },
  navto: function () {
    wx.navigateTo({
      url: '../period-four/period-four',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})