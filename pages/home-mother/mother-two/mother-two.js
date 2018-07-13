const { auth } = require('../../../utils/auth.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
    objectArray: [
      {
        id: 0,
        name: '1'
      },
      {
        id: 1,
        name: '2'
      },
      {
        id: 2,
        name: '3'
      },
      {
        id: 3,
        name: '4'
      }
    ],
    index: 0,
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',
    scrollShow: true,
  },
  onLoad:function(){
    const parmas = {
      tag: 'switch'
    }
    auth(parmas)
  },
  // 日期选择
  bindChange: function (e) {
    const index = (e.detail.value * 1) + 1;
    console.log(index)
    this.setData({
      menstrualTimes: index
    })
    app.globalData.obj.menstrualTimes = index

  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-three/mother-three'
    })
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

    console.log('默认时间----'+app.globalData.obj.menstrualTimes)
  }
})