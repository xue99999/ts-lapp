// pages/baby/baby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [[50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],['.0cm', '.1cm','.2cm','.3cm']],
    multiIndex: [3, 2],
    multiArray1:[[1,2,3,4,5,6,7,8,9],['.0kg','.1kg','.2kg','.3kg']],
    multiIndex1: [7, 1]

  },
  changeMultiPicker(e) {
    this.setData({ multiIndex: e.detail.value })

  },
  changeMultiPicker1(e) {
    this.setData({ multiIndex1: e.detail.value })
  },
  navto:function(e){
    wx.switchTab({
      url:'../taber/taber'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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