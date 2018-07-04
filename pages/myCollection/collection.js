// pages/collection/collection.js
const { apiCourseCollectList } = require('../../service/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    url:'../courseDetails/courseDetails',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = {
      courseType: "02",
      page: "1",
      rows: "20",
    }
    apiCourseCollectList(data).then(result => {
      console.log('我的收藏', result);
      this.setData({
        list: result.list,

      })

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
  
  },
  get: function(mPx){
    console.log(mPx / 1.65);
    return mPx/1.65;
  }
})