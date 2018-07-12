  // pages/taber/taber.js
const app = getApp()
// const { userInfoQueryBodyStatus} = require('../../service/user.js')
// var Http = require('../../utils/http.js');
var physiologicalCycle;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    arr:[4,5,6,7,8,9,10],
    physiologicalCycle:'',
    userModel:'',
    list:[],
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
         startDay:'2018-06-11',
         endDay:'2018-07-11'
    }
      // userInfoQueryBodyStatus(data).then(res => {
      // console.log('查询身体状态', res);
 
      // const userModel=res.userModel;
      // physiologicalCycle = res.list.physiologicalCycle;
      // userModel = res.list.userModel
      // list = res.list
      // if (physiologicalCycle === '01'){
      //   this.setData({
      //     physiologicalCycle:'安全期'
      //   })
      // }
      // else if (physiologicalCycle === '02') {
      //   this.setData({
      //     physiologicalCycle: '月经期'
      //   })
      // }
      // else if (physiologicalCycle === '03') {
      //   this.setData({
      //     physiologicalCycle: '易孕期'
      //   })
      // }
      // else if(physiologicalCycle === '04') {
      //   this.setData({
      //     physiologicalCycle: '排卵期'
      //   })
      // }
      // if (userModel === '01'){
      //   this.setData({
      //     userModel: '少女'
      //   })        
      // }
      // else if (userModel === '02') {
      //   this.setData({
      //     userModel: '辣妈'
      //   })
      // }
      // app.globalData.obj2 = res.list
    // })
    console.log(app.globalData.obj.birthday)
    console.log(app.globalData.obj)
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

})