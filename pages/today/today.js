  // pages/taber/taber.js
const app = getApp()
const moment = require('../../utils/moment.js');
const { currentWeek} =require('../../utils/time.js');
const { userInfoQueryBodyStatus} = require('../../service/user.js')
const { auth } = require('../../utils/auth.js');
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
    // 圆圈显示数据
    showObj:{
      // 模式辣妈
        "02":{
          babyText:'宝宝信息显示'
        },
        // 模式少女
        "01":{

        }
    }
  },
  clickArr:function(e){
    console.log(e.currentTarget.dataset.index)
  },
  navState:function(){
    const day=this.data.formatDay;
    app.globalData.obj.day = day
    wx.navigateTo({
      url: `/pages/state/state?day=${day}`,
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
    const day = moment().format("YYYY-MM-DD");
    const today=moment().format('D');
    this.setData({
      today,
      days: currentWeek(),
      formatDay: day
    })

    this.query(day, day, today);
  },
 /**
  * startDay 开始时间
  * endDay
  * currentDay 当前天数据
  */
  query:function (startDay,endDay,currentDay){
   
    var query = {
      startDay,
      endDay
    }

    userInfoQueryBodyStatus(query).then(res => {
      const { list, userModel } = res;
      app.globalData.bodyStatus = list;

      for (let i = 0; i < list.length; i++) {
        const dy = list[i];
        if (dy.day === currentDay) {
          let showObj={}
          // 处理当前需要显示的数据
          if (userModel==='01'){
            showObj['01']={
              babyText: `宝宝${dy.babyMonth}月`
            }
          }else{

          }
          this.setData({
            userModel,
            currentDay: dy
          })
          
        }
      }
     
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