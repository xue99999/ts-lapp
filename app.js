//app.js

App({
  onLaunch: function() {},
  globalData: {
    userInfo: null,
    obj: {
      isLaw: null,
      shaonv: null,
      menstrualStartTime: null,
      menstrualTimes: 5,
      menstrualCycle: 28,
      birthday: 1990,
      // babySex: "01",
      // babyBirthday: "2018-06-15",
      //区分用户是否走完了引导页
      goTo: null,

      chiropractic: null,
      frictionalAbdomen: null,
      menstrualStatus: null,
      menstrualVolume: null,
      leucorrhea: null,
      breastTenderness: null,
      abdominalPain: null,
      mood: null,
      menstrualHeadache: null,
      fearCold: null,
      weak: null,
      abdominalPain: null,
      bodyStatus: [],
      dates: null,
      day: null,
      
    },
  
  },
  setStorageSync: function(key, value) {
    try {
      console.log('同步缓存数据', value);
      wx.setStorageSync(key, value)
    } catch (e) {}
  },
  getStorageSync: function(key) {
    var value;
    try {
      value = wx.getStorageSync(key);

    } catch (e) {
      // Do something when catch error
    }
    console.log('同步取出数据', value);
    return value;
  }

})