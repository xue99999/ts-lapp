// pages/collection/collection.js
const { apiCourseCollectList } = require('../../service/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    url:'../course-details/course-details',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = {
      courseType: "02",
      page: "1",
      rows: "20",
    }
    apiCourseCollectList(data).then(result => {
      console.log('我的收藏', result);
      this.setData({
        list: result.list,

      })

    })
  }
})