// pages/todayRecommend/todayRecommend.js
const { apiCourseRecommendList } = require('../../service/user.js')
var page=1;
var rows=20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    url: '../courseDetails/courseDetails',
    physiologicalCycle: '03',
    content01: "“宜补不宜泄”，补气养血的最佳时期，想要补养的美女抓住这个好时机，事半功倍哦。足三里、血海，按揉+艾灸，益气养血，不要太美哦。护肤达人们，这个时期最适合补水保湿，面膜贴起来吧。",
    content02: "“宜泄不宜藏”，冷饮快走开，不如来杯生姜红糖水，让经血来得更顺畅一些吧。痛经的MM，三阴交穴是标配，按揉+艾灸，通经止痛。酒精棉球塞耳朵，痛经小妙招。",
    content03: "经前症状让人烦，不妨试试小妙方。乳房胀痛揉太冲，配合少泽掐按更有效。偏头痛用梳子刮率谷穴，合谷按揉更轻松。经前祛斑效果好，美白祛斑面膜用起来。",
    content04: "受孕最佳期，心情愉快最重要，身心合一，收获好“孕”。甜蜜时刻，别忘记避孕哦 你本来就很美，气血旺盛，皮肤最佳期。",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log('状态信息', options.physiologicalCycle);
    this.setData({
      //   physiologicalCycle: options.physiologicalCycle,
    })
    page = 1;
    rows = 20;
    this.getData(page, rows);
  },
  //滚动到顶部/左边，会触发 scrolltoupper 事件
  upper: function (e) {
    console.log('顶部',e)
    page = 1;
    rows = 20;
    this.getData(page, rows);
  },
  //滚动到底部/右边，会触发 scrolltolower 事件
  lower: function (e) {
    console.log('底部',e)
     page+=1;
    rows=20;
    this.getData(page, rows);
  },

  getData:function(page, rows){
    var data = {
      page: page,
      rows: rows
    }
    apiCourseRecommendList(data).then(result => {
      console.log('今日推荐', result);
      this.setData({
        list: result.list,
      })
    })
  }
})