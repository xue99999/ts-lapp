// pages/mycourse/course.js
const {
  apiCourseCollectList
} = require('../../service/user.js')
var time = require('../../utils/time.js');
var page = '1';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  list:[],
    url: '/pages/course-details/course-details',

  },
  //到顶部
  upper: function(e) {

    this.getapiCourseCollectList(page)
  },
  //到底部
  lower: function(e) {
    console.log(e)
    page += 1;

    this.getapiCourseCollectList(page)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  getapiCourseCollectList(page) {
    var data = {
      courseType: "01",
      page: page,
      rows: "20",
    }
    apiCourseCollectList(data).then(result => {
      var list = this.data.list;
      console.log('我的课程', result);
      if (result.code === 200) {
        for (var i = 0; i < result.data.list.length; i++) {
          list.push(result.data.list[i]);
        }
        this.setData({
          list: list,
        })
      }


    })
  }

})