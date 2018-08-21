const app = getApp()
const {
  userInfoUpdateBodyStatus
} = require('../../service/user.js')
var Http = require('../../utils/http.js');
const {
  auth
} = require('../../utils/auth.js');
const {
  $Toast
} = require('../base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDay: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const parmas = {
      tag: 'switch'
    }

    auth(parmas)
    console.log(options)
    const {
      day
    } = options;

    const list = app.globalData.bodyStatus;
    for (let i = 0; i < list.length; i++) {
      const dy = list[i];
      if (dy.day === day) {
        this.setData({
          currentDay: dy
        })
        break;
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

})