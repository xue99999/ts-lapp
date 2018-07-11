// pages/taber/taber.js
const app = getApp()
const { userInfoAdd, userInfoQueryMenByDay} = require('../../service/user.js')
var Http = require('../../utils/http.js');
var physiologicalCycle;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    arr:[4,5,6,7,8,9,10],
    physiologicalCycle:''
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
       var data = {
      day:'2018-07-11'
    }
      userInfoQueryMenByDay(data).then(res => {
      console.log('查询一天的经期信息', res);
      physiologicalCycle = res.physiologicalCycle;
    })
    console.log(app.globalData.obj.birthday)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  

  },
  clickjinri:function(){
      wx.navigateTo({
        url: '../today-recommend/today-recommend?physiologicalCycle=' + physiologicalCycle
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var shaonvid = app.globalData.obj.shaonv
      console.log(shaonvid)
    if (shaonvid=='01'){
    // var data = {
    //   day:'2018-07-07'
    // }
    // userInfoQueryMenByDay(data).then(res => {
    //   console.log('查询一天的经期信息', res);
    //   // this.setData({
    //   //   list: res.list
    //   // })
    // })
    // console.log(app.globalData.obj.birthday)

    }
    else if (shaonvid == '02'){
      
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

})