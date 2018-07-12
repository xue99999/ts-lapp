// pages/period/period-two/period-two.js
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
  bindPickerChange: function (e) {
    // console.log(e.target.dataset.index)
    var menstrualTimes = e.target.dataset.index += 1
    // console.log('月经持续多久' + menstrualTimes + '天')
    this.setData({
      menstrualTimes: menstrualTimes
    })
    app.globalData.obj.menstrualTimes = menstrualTimes
    console.log('月经持续时间----' + menstrualTimes)
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