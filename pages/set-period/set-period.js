const app = getApp()
const { userInfoQueryMensAndOvulation, userInfoUpdateMensAndOvulation} = require('../../service/user.js')
const { auth } = require('../../utils/auth.js');
var Http = require('../../utils/http.js');
var menstrualCycle;
var menstrualTimes;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
    multiIndex: 18,
    multiArray1: [2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15],
    multiIndex1: 3,
    title:'经期与排卵',
    text: '此应用程序根据经期和月经天数设置来做出预测。然而。如果您定期将您的月经记录在此应用程序中，预测将以所记录的数据为准。',
    text1: '如果您关闭这个参数，仅有排卵天会显示。',
    text2: '黄体期是您排卵后到月经开始前的时期。 如果您知道您黄体期的天数，请记录下来以获得更准确的排卵预测。',
    text3: '启动此选项可针对月经周期预测考虑已记录的症状。强烈推荐给经期不规律的女性。'

  },
  //经期天数
  changejingqi(e) {
    const val = e.detail.value;
    this.setData({
      multiIndex: e.detail.value,
      menstrualCycle: this.data.multiArray[this.data.multiIndex]
    })
   
    console.log(this.data.multiArray[this.data.multiIndex])
    menstrualCycle = this.data.multiArray[this.data.multiIndex];

    var data = {
      mayConception: '01',
      // lutealPhase:'' ,  //黄体期
      improve: '02',
      menstrualCycle: menstrualCycle,   //周期
      menstrualTimes: null   //月经
    }
    userInfoUpdateMensAndOvulation(data).then(res => {
      console.log('设置经期与排卵', res);
    })
  },






  // 月经天数
  changeyuejing(e) {
    const val = e.detail.value;
    this.setData({
      multiIndex1: e.detail.value,
      menstrualTimes: this.data.multiArray1[this.data.multiIndex1]
    })

    console.log(this.data.multiArray1[this.data.multiIndex1])
    menstrualTimes = this.data.multiArray1[this.data.multiIndex1];
    var data = {
      mayConception: '01',
      // lutealPhase:'' ,  //黄体期
      improve: '02',
      menstrualCycle:null,
      menstrualTimes: menstrualTimes
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
    const { multiArray, multiArray1}=this.data;
    userInfoQueryMensAndOvulation().then(res => {

      const { menstrualCycle, menstrualTimes}=res;
      for (let i = 0; i < multiArray.length;i++){
       const idx= multiArray[i];
       if (idx === menstrualCycle){
         this.setData({
           multiIndex:i
         })
         break;
       }
      }

      for (let i = 0; i < multiArray1.length; i++) {
        const idx = multiArray1[i];
        if (idx === menstrualTimes) {
          this.setData({
            multiIndex1: i
          })
          break;
        }
      }
    })
    userInfoQueryMensAndOvulation().then(res => {
      console.log('查询经期与排卵', res);
    })

  }
})