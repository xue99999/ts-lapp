// pages/mycourse/course.js
const {
  apiCourseCollectList
} = require('../../service/user.js')
var time = require('../../utils/time.js');
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    url: '/pages/course-details/course-details',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getapiCourseCollectList(1)
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
        if (page > 1) {
          for (var i = 0; i < result.list.length; i++) {
            list.push(result.list[i]);
          }
        } else {
          list = [];
          list = result.list
        }
        this.setData({
          list: list,
        })
      }else{

        getApp().getShou();
      }
     

    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getapiCourseCollectList(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page += 1;
    this.getapiCourseCollectList(page)
  },

})