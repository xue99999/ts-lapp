// pages/period/period-two/period-two.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['小公主', '小王子'],
  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-six/mother-six',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindChange:function(e){
  console.log(e.target.dataset.index[0])
  // var nv = e.target.dataset.index[0]
  // var nan = e.target.dataset.index[1]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.obj.shaonv)
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