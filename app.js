//app.js
App({
  onLaunch: function () {
  
  },
  globalData: {
    userInfo: null,
    obj:{
      shaonv: null,
      menstrualStartTime: null,
      menstrualTimes:null,
      menstrualCycle:null,
      birthday:null,
      babySex:null,
      babyBirthday:null,
      //区分用户是否走完了引导页
      goTo:null
    },
  },
  //当页面没有数据的时候调用次方法
  getShouHint(){
    wx.showToast({
      title: '服务器走散了',
      icon: 'loading',
      duration: 2500
    })
  }

})