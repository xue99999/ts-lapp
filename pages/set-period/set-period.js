const app = getApp()
const { userInfoQueryMensAndOvulation, userInfoUpdateMensAndOvulation} = require('../../service/user.js')
const { auth } = require('../../utils/auth.js');
var Http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '此应用程序根据经期和月经天数设置来做出预测。然而。如果您定期将您的月经记录在此应用程序中，预测将以所记录的数据为准。',
    text1: '如果您关闭这个参数，仅有排卵天会显示。',
    text2: '黄体期是您排卵后到月经开始前的时期。 如果您知道您黄体期的天数，请记录下来以获得更准确的排卵预测。',
    text3: '启动此选项可针对月经周期预测考虑已记录的症状。强烈推荐给经期不规律的女性。'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const parmas = {
        tag: 'switch'
      }
      auth(parmas)
    
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
    userInfoQueryMensAndOvulation().then(res => {
      console.log('查询设置经期与排卵', res);
      // this.setData({
      //   list: res.list
      // })
    })



      var data = {
          mayConception: '01' , 
          // lutealPhase:'' ,  //黄体期
          improve: '02' ,
          menstrualCycle: 28,
          menstrualTimes: 5 
    }
      userInfoUpdateMensAndOvulation(data).then(res => {
      console.log('设置经期与排卵', res);
      // this.setData({
      //   list: res.list
      // })
    })
  }
})