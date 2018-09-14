const { auth } = require('../../../utils/auth.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '10', '11', '12', '13', '14', '15', '16',
      '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46',
      '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
      '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76',
      '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
      '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'
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
    const index = (e.detail.value * 1) + 10;
    // console.log('月经有多长' + menstrualCycle + '天')
    this.setData({
      menstrualCycle: index
    })
    console.log(index)
    app.globalData.obj.menstrualCycle = index

  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-four/mother-four'
    })
  }
})