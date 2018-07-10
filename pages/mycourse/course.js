// pages/mycourse/course.js
const { apiCourseCollectList } = require('../../service/user.js')
var time = require('../../utils/time.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  //  list:[],
   url:'/pages/courseDetails/courseDetails',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      var data={
        courseType:"01",
        page:"1",
        rows:"20",
      }
      apiCourseCollectList(data).then(result=>{
      console.log('我的课程',result);
      this.setData({
        list:result.list,
      
      })
  
    })
  }

  
})