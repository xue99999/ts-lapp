// pages/period/period-two/period-two.js
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
    menstrualCycle: null,  //持续多久
    menstrualTimes: null    //经期有多长
  },
  chooseImg: function (e) {

    this.setData({
      show: !this.data.show
    })
    if (this.data.show) {
      this.setData({
        scrollShow: false
      })
    }
    else {
      this.setData({
        scrollShow: true
      })
    }
  },
  bindPickerChange: function (e) {
    var menstrualCycle = e.target.dataset.index += 1
    console.log('月经有多长' + menstrualCycle + '天')
    this.setData({
      menstrualCycle: menstrualCycle
    })

  },
  navto: function () {
    wx.navigateTo({
      url: '../period-four/period-four',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(this.data.menstrualTimes)
    console.log(this.data.menstrualCycle)
    var obj = {

      'menstrualTimes': this.data.menstrualTimes,
      'menstrualCycle': this.data.menstrualCycle
    }
    wx.setStorageSync('xinxi', obj)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var menstrualTimes = options.menstrualTimes
    this.setData({
      menstrualTimes: menstrualTimes
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})