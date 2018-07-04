// pages/courseDetails/courseDetails.js

const { apiCourseId, apiSection } = require('../../service/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseData:{},
    sectionList:[],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    apiCourseId().then(result=>{
      console.log('课程详情',result);
      this.setData({
        courseData: result.data,
      })
    });
    apiSection().then(result=>{
      console.log('课程列表', result);
      this.setData({
        sectionList: result.list,
      })
    });
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