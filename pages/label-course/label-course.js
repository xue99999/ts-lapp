// pages/ labelCourse / labelCourse.js
const {
  apiCourseSeriesList
} = require('../../service/user.js');
var page=1, rows = 20,
  label;
var CourseList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    label = "哈哈,狠狠";
    if (label !== "") {
      wx.setNavigationBarTitle({
        title: "精简课程" //页面标题为路由参数
      })
    }
 
    this.getApiCourseSeriesList(page, label)
    

  },
  //到顶部
  upper: function(e) {
    label = "";
    console.log(e)
    this.getApiCourseSeriesList(page, label)
  },
  //到底部
  lower: function(e) {
    console.log(e)
    page+=1;
    label="";
    this.getApiCourseSeriesList(page, label)


  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getApiCourseSeriesList(page, label){
    var data = {
      page: page,
      rows: rows,
      label: label
    }
    apiCourseSeriesList(data).then(result => {
      console.log('全部课程', result);
      CourseList.push(result.list);
      console.log('全部课程>>>>', CourseList);
      this.setData({
        list: result.list
      })
    })
  }
})