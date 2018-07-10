// pages/period/period-two/period-two.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991',
      '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003'],
    index: 0,
    obj:{},
    birthday:null
  },
  bindPickerChange: function (e) {
    // console.log(e.currentTarget.dataset.nian+'年出生。')
    var birthday = e.currentTarget.dataset.nian

    app.globalData.obj.birthday = this.data.birthday
    console.log(app.globalData.obj.birthday)
    this.setData({
      birthday: birthday
    })


  },
  navto: function () {
    wx.switchTab({
      url: '../../taber/taber',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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