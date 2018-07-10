// pages/todayRecommend/todayRecommend.js
const { apiCourseRecommendList } = require('../../service/user.js')
var page=1;
var rows=20;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[],
  url: '../courseDetails/courseDetails',

  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {

    page =1;
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