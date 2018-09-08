// pages/ labelCourse / labelCourse.js
const {
  apiCourseSeriesList,

} = require('../../service/user.js');
const {
  auth
} = require('../../utils/auth.js')
var page = 1,
  rows = 20,
  label;
var CourseList = [];
let hasMore = true
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
    auth();
    label = options.label || "";
    if (label !== "") {
      wx.setNavigationBarTitle({
        title: "精选课程" //页面标题为路由参数
      })
    }

    this.getApiCourseSeriesList(1, label)


  },
  // onMyEvent: function (e) {
  //   console.log(e.detail)
  //   const idx = e.detail
  //   const { list } = this.data
  //   list[idx].isCollect == 0 ? 1 : 0
  //   this.setData({ list })
  // },

  getApiCourseSeriesList(page, label) {
    console.log('label', label);
    var data = {
      page: page,
      rows: rows,
      label: label
    }
    apiCourseSeriesList(data).then(result => {
      var that = this;
      console.log('全部课程', result);
      var list = that.data.list;
      if (result.code === 200) {
        if (page > 1) {
          list.concat(result.list)
          if (result.list.length < rows) {
            hasMore = false
          }
        } else {
          list = result.list;
        }
        that.setData({
          list
        })

      }

    })


  },
  onShow:function(){
    console.log('触发onshow方法')
    this.getApiCourseSeriesList(page,label)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getApiCourseSeriesList(1, label);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!hasMore) {
      return
    }

    const {
      list
    } = this.data
    page += 1;

    this.getApiCourseSeriesList(page, label)
  }

})