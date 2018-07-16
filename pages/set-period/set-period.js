const app = getApp()
const { userInfoQueryMensAndOvulation, userInfoUpdateMensAndOvulation} = require('../../service/user.js')
const { auth } = require('../../utils/auth.js');
var Http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30],
    multiIndex: 0,
    multiArray1: [1, 2, 3, 4, 5, 6, 7],
    multiIndex1: 6,
    title:'经期与排卵',
    text: '此应用程序根据经期和月经天数设置来做出预测。然而。如果您定期将您的月经记录在此应用程序中，预测将以所记录的数据为准。',
    text1: '如果您关闭这个参数，仅有排卵天会显示。',
    text2: '黄体期是您排卵后到月经开始前的时期。 如果您知道您黄体期的天数，请记录下来以获得更准确的排卵预测。',
    text3: '启动此选项可针对月经周期预测考虑已记录的症状。强烈推荐给经期不规律的女性。'

  },
  //经期天数
  changejingqi(e) {
    const val = e.detail.value;
    const menstrualCycle = this.data.multiArray[val[0]]
    console.log(menstrualCycle)
    this.setData({ multiIndex: menstrualCycle})
    var data = {
      mayConception: '01',
      // lutealPhase:'' ,  //黄体期
      improve: '02',
      menstrualCycle: this.data.multiIndex,   //周期
      menstrualTimes: null   //月经
    }
    userInfoUpdateMensAndOvulation(data).then(res => {
      console.log('设置经期与排卵', res);
    })
  },
  // 月经天数
  changeyuejing(e) {
    const val = e.detail.value;
    const menstrualTimes = this.data.multiArray1[val[0]]
    this.setData({ multiIndex: menstrualTimes })
    console.log(menstrualCycle)
    var data = {
      mayConception: '01',
      // lutealPhase:'' ,  //黄体期
      improve: '02',
      menstrualCycle:null,
      menstrualTimes: this.data.multiIndex1
    }
    userInfoUpdateMensAndOvulation(data).then(res => {
      console.log('设置经期与排卵', res);
    })
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
    wx.setNavigationBarTitle({
      title: '经期与排卵'
    })
    userInfoQueryMensAndOvulation().then(res => {
      console.log('查询经期与排卵', res);
    })
  }
})