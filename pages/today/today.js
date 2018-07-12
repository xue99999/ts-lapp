  // pages/taber/taber.js
const app = getApp()
const moment = require('../../utils/moment.js');
const { currentWeek} =require('../../utils/time.js');
const { userInfoQueryBodyStatus} = require('../../service/user.js')
// var Http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    days:[],
    userModel:'',
    list:[],
    today:moment().format('YYYY-MM-DD'),
    currentDay:{},
    formatDay:null,
  },
  clickArr:function(e){
    console.log(e.currentTarget.dataset.index)
  },
  navState:function(){
    const day=this.data.formatDay;
    wx.navigateTo({
      url: `/pages/state/state?day=${day}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const day=moment().format("YYYY-MM-DD");
     //const endDay = moment().add(5,'days').format("YYYY-MM-DD");
    //console.log(day,endDay)
       this.setData({
         today:moment().format('D'),
         days:currentWeek(),
         formatDay: day
        })

       var query = {
         startDay: day,
         endDay: day
       }

    userInfoQueryBodyStatus(query).then(res => {
      const {list} = res;
      app.globalData.bodyStatus=list;

        for (let i = 0; i < list.length;i++){
           const dy=list[i];
           if(dy.day===day){
                this.setData({
                  currentDay:dy
                })
           }
         }
        console.log(this.data.currentDay)
        var inner = this.data.currentDay
       
       })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  

  },
  clickjinri:function(){
      wx.navigateTo({
        url: '../today-recommend/today-recommend?day=' + this.data.formatDay
      })
  },

})