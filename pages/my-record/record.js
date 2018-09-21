const {
  userInfoQueryMensesCycleList
} = require('../../service/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    menstrualCycleAvg: '00',
    menstrualTimesAvg: '00',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfoQueryMensesCycleList().then(result => {
      console.log(result)
      const { menstrualCycleAvg, menstrualTimesAvg} = result;
      this.setData({
        list:result.list,
        menstrualCycleAvg,
        menstrualTimesAvg
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

})