// pages/period/period-two/period-two.js
const app = getApp()

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
    menstrualTimes: 6,
    scrollShow: true,
    steps: {
       "2": {img:'../../img/buzou2.png'},
       "6": {img: '../../img/buzhou4.png'}
       },
    step: "2",
    imgurl:'',
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
     if(options&&options.step){
       const imgurl = this.data.steps[options.step].img;
        this.setData({
          imgurl,
          step: options.step
        })
     }
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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