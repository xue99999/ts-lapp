// pages/courseDetails/courseDetails.js

const {
  apiCourseId,
  apiSection,
  apiCourseCollectCourse
} = require('../../service/user.js');
const {
  auth
} = require('../../utils/auth.js');
const {
  formatSeconds
} = require('../../utils/util.js');
const WxParse = require('../../wxParse/wxParse.js');
var id, status;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    total: "",
    isSubscibe: -1,
    isCollect: -1,
    id: "",
    price: 0,
    courseName: "",
    teacherName: "",
    courseData: {},
    pictureUrl: "",
    remark: "",
    sectionList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options)
    auth();

    if (options.id) {
      id = options.id;
      app.setStorageSync('courseId', id);
    } else {
      var courseId = app.getStorageSync('courseId');
      id = options.id;
    }

    apiCourseId(id).then(result => {
      if (result.code === 200) {
        WxParse.wxParse('remark', 'html', result.data.remark, this, 0);
        this.setData({
          id: result.data.id,
          courseName: result.data.courseName,
          isSubscibe: result.data.isSubscibe,
          price: result.data.price,
          teacherName: result.data.teacherName,
          courseData: result.data,
          pictureUrl: result.data.pictureUrl,
          isCollect: result.data.isCollect,
        })
      }
    });

    apiSection(id).then(result => {
      if (result.code === 200) {
        this.setData({
          total: result.total,
          sectionList: result.list,
          url: '../course-video/course-video?courseId=' + options.id,
        })
      }
    });
  },

  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  onClickAllPlay() {
    wx.navigateTo({
      url: '../course-video/course-video?courseId=' + id,
    })
  },
  onClickSubscriber() {
    if (this.data.isSubscibe > 0) {
      // wx.navigateTo({
      //   url: '../course-video/course-video?courseId=' + id,
      // })
    } else 
    {
      wx.navigateTo({
        url: '../pay/wx-pay/wx-pay?courseId=' + id + '&total=' + this.data.total + '&courseName=' + this.data.courseName + '&price=' + this.data.price
      })
    }
  },
  onShareAppMessage: function(ops) {

    if (ops.from === 'button') {
      // 来自页面内转发按钮
    }
    const path=`/pages/course-details/course-details?id=${id}`;

    console.log(path)
    return {
      title: '她师小程序',
      path,
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'none'
        })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '取消分享',
          icon:'none'
        })
      }
    }
  },
  isCollect() {
    if (this.data.isCollect === 0) {
      this.setData({
        isCollect: 1

      })
      status = "01";
    } else {
      this.setData({
        isCollect: 0
      })
      status = "02";
    }
    this.getApiCourseCollectCourse(status);
  },
  /**
   * courseId:课程id
   * status:01收藏 02取消收藏
   */
  getApiCourseCollectCourse(status) {
    var data = {
      courseId: id,
      status: status
    }

    apiCourseCollectCourse(data).then(result => {})
  },
  onShow: function() {
    apiCourseId(id).then(result => {
      if (result.code === 200) {
        WxParse.wxParse('remark', 'html', result.data.remark, this, 0);
        this.setData({
          id: result.data.id,
          courseName: result.data.courseName,
          isSubscibe: result.data.isSubscibe,
          price: result.data.price,
          teacherName: result.data.teacherName,
          courseData: result.data,
          pictureUrl: result.data.pictureUrl,
          isCollect: result.data.isCollect,
        })
      }
    });

    apiSection(id).then(result => {
      if (result.code === 200) {

       const  {list}=result;

       for(let i=0;i<list.length;i++){
         if(list[i].duration){
           list[i].duration = formatSeconds(list[i].duration)
         }
        
       }

        this.setData({
          total: result.total,
          sectionList: list,
          url: '../course-video/course-video?courseId=' + id,
        })
      }
    });
  }

})