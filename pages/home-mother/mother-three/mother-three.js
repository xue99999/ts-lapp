const { auth } = require('../../../utils/auth.js');
const app = getApp()
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
    menstrualCycle:null
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
      console.log(app.globalData.obj.menstrualCycle)
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
    const index = (e.detail.value * 1) + 1;
    // console.log('月经有多长' + menstrualCycle + '天')
    this.setData({
      menstrualCycle: index
    })
    console.log(index)
    app.globalData.obj.menstrualCycle = index

  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-four/mother-four',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})