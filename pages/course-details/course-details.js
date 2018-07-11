// pages/courseDetails/courseDetails.js

const { apiCourseId, apiSection } = require('../../service/user.js');
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    total:"",
    isSubscibe:'',
    id:"",
    price: 0,
    courseName:"",
    teacherName:"",
    courseData:{},
    remark:"",
    sectionList:[
    ],

    
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
  //  id = options.id;
    id = "b05bb1a5ae2742c7a799cf620911edf4";
    options.id = "b05bb1a5ae2742c7a799cf620911edf4";
    apiCourseId(options.id).then(result=>{
      console.log('课程详情',result);
      this.setData({
        id: result.data.id,
        courseName: result.data.courseName,
        isSubscibe: result.data.isSubscibe,
        price: result.data.price,
        teacherName: result.data.teacherName,
        courseData: result.data,
      })
    });
  
    apiSection(options.id).then(result=>{
      console.log('课程列表', result);
      this.setData({

        total: result.total,
        sectionList: result.list,
        remark: result.list[0].remark,
        url: '../course-video/course-video?courseId=' + options.id,
      })
    });
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    console.log(cur);
    if (this.data.currentTaB == cur) {
      console.log(cur);
       return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  onClickAllPlay(){
    console.log("全部播放");
  },
  onClickSubscriber() {
    console.log("订阅");
    wx.navigateTo({
      url: '../pay/wx-pay/wx-pay?courseId=' + id+'&total='+this.data.total+'&courseName='+this.data.courseName+'&price='+this.data.price
    })
  } ,
  onShareAppMessage: function (ops) {

    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    
    }
    return {
      title: '她师小程序',
      path: '/pages/courseDetails/courseDetails',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})