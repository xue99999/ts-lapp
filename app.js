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
  }
})