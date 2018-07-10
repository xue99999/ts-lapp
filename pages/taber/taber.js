// pages/taber/taber.js
const app = getApp()
const { userInfoAdd, userInfoQueryMenByDay} = require('../../service/user.js')
var Http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    arr:[4,5,6,7,8,9,10],
    // list:[]
  },
  clickArr:function(e){
    console.log(e.currentTarget.dataset.index)
  },
  navState:function(){
    wx.navigateTo({
      url: '../state/state',
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
  
    var data = {
      userModel: "01",
      menstrualStartTime: "2017-06-07",
      menstrualTimes: "5",
      menstrualCycle:'28',
      birthday:'2000',
      babySex:'01',
      babyBirthday:'2017'
    }
    userInfoAdd(data).then(res => {
      console.log('登录经期信息', res);
      // this.setData({
      //   list: res.list
      // })

    })

  },
  clickjinri:function(){
      wx.navigateTo({
        url: '../todayRecommend/todayRecommend'
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var data = {
      day:'2018-07-07'
    }
    userInfoQueryMenByDay(data).then(res => {
      console.log('查询一天的经期信息', res);
      // this.setData({
      //   list: res.list
      // })

    })
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