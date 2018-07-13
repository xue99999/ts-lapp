// pages/courseDetails/courseDetails.js

const {
  apiCourseId,
  apiSection,
  apiCourseCollectCourse
} = require('../../service/user.js');
const {
  auth
} = require('../../utils/auth.js');
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
    auth();
    console.log();
    if (options.id) {
      id = options.id;
      app.setStorageSync('courseId', id);
    } else {
      var courseId = app.getStorageSync('courseId');
      id = options.id;
    }



    apiCourseId(options.id).then(result => {
      console.log('课程详情', result);
      WxParse.wxParse('remark', 'html', result.data.remark, this, 0);
      this.setData({
        id: result.data.id,
        courseName: result.data.courseName,
        isSubscibe: result.data.isSubscibe,
        price: result.data.price,
        teacherName: result.data.teacherName,
        //   remark: result.data,
        courseData: result.data,
        pictureUrl: result.data.pictureUrl,
        isCollect: result.data.isCollect,
      })
    });

    apiSection(options.id).then(result => {
      console.log('课程列表', result);
      this.setData({

        total: result.total,
        sectionList: result.list,
        //   remark: result.list[0].remark,
        url: '../course-video/course-video?courseId=' + options.id,
      })
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
    console.log(cur);
    if (this.data.currentTaB == cur) {
      console.log(cur);
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  onClickAllPlay() {
    console.log("全部播放");
    wx.navigateTo({
      url: '../course-video/course-video?courseId=' + id,
    })
  },
  onClickSubscriber() {
    console.log("订阅");
    if (isSubscibe > 0) {
      wx.showToast({
        title: "当前课程已订阅,无需重复订阅",
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.navigateTo({
      url: '../pay/wx-pay/wx-pay?courseId=' + id + '&total=' + this.data.total + '&courseName=' + this.data.courseName + '&price=' + this.data.price
    })
  },
  onShareAppMessage: function(ops) {

    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)

    }
    return {
      title: '她师小程序',
      path: '/pages/courseDetails/courseDetails',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  isCollect() {
    console.log('收藏');
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
    console.log('收藏>>>>', this.data.isCollect);

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

    apiCourseCollectCourse(data).then(result => {
      console.log('课程收藏操作', result);

    })
  }

})