// pages/taber/taber.js
const app = getApp()
const moment = require('../../utils/moment.js');
const { userInfoQueryBodyStatus} = require('../../service/user.js')
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
    today:null
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
    const day=moment().format("YYYY-MM-DD");
     //const endDay = moment().add(5,'days').format("YYYY-MM-DD");
    //console.log(day,endDay)
    //console.log(moment().weekday(0))
       var data = {
         startDay: day,
         endDay: day
    }

       userInfoQueryBodyStatus(data).then(res => {
         const {list} = res

         for (let i = 0; i < list.length;i++){
           const dy=list[i];
           if(dy.day===day){
                this.setData({
                  today:dy.day
                })
           }
         }

       })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

})