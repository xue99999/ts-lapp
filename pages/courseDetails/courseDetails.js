// pages/courseDetails/courseDetails.js

const { apiCourseId, apiSection } = require('../../service/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    total:"",
    isSubscibe:'',
    price: 0,
    courseData:{},
    sectionList:[],
    url:'写的电视添加路径',
    
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    apiCourseId().then(result=>{
      console.log('课程详情',result);
      this.setData({
        isSubscibe: result.data.isSubscibe,
        price: result.data.price,
        courseData: result.data,
      })
    });
    apiSection().then(result=>{
      console.log('课程列表', result);
      this.setData({

        total: result.total,
        sectionList: result.list,
      })
    });
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    console.log(cur);
    if (this.data.currentTaB == cur) {
      console.log(cur);
       return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  onClickAllPlay(){
    console.log("全部播放");
  },
  onClickShare(){
    console.log("分享");
  } ,
  onClickSubscriber() {
    console.log("订阅");
  } 
})