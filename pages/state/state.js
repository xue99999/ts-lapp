const app = getApp()
const { userInfoUpdateBodyStatus } = require('../../service/user.js')
var Http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        "chiropractic": "01",
        "frictionalAbdomen": "01",
        "menstrualStatus": "01",
        "menstrualVolume": "0101010101010101010101",
        "leucorrhea": "01",
        "breastTenderness": "01",
        "abdominalPain": "01",
        "mood": "01",
        "menstrualHeadache": "01",
        "fearCold": "01",
        "weak": "01",
        "physiologicalCycle": "01",
        "day": "2018-06-07",
        "isPredict": "1",
        "userModel": "",
        "babyMonth": ""
      }
    ],
    se:{
      a:'../img/Knead back@3x.png',
      b:'../img/belly@3x.png'
    }
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
      var data = {
        openId:null,
        day:null,
        chiropractic: '01',
        frictionalAbdomen: '02',
        menstrualStatus: '01' , 
        menstrualVolume:'02',
        leucorrhea:'01',
        breastTenderness:'01',
        abdominalPain:'02',
        mood:'01',
        menstrualHeadache:'01',
        fearCold:'01',
        weak:'01',
        abdominalPain:'01'

    }
    //   userInfoUpdateBodyStatus(data).then(res => {
    //   console.log('更新身体状态接口', res);
    //   // this.setData({
    //   //   list: res.list
    //   // })
    // })
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