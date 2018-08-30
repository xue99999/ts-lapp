// pages/todayRecommend/todayRecommend.js
const {
  apiCourseRecommendList
} = require('../../service/user.js');
const moment = require('../../utils/moment.js');
const {
  auth
} = require('../../utils/auth.js');
var page = 1;
var rows = 20;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor: "white",
    indicatorActiveColor:"#FE6F71",
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [],
    url: '../course-details/course-details',
    pos: 0,
    lists: [[
      // 月经前期
      "../img/xuewei/taichong.jpg",
      '../img/xuewei/shaoze.jpg',
      '../img/xuewei/lvgu.jpg',
      '../img/xuewei/hegu.jpg',
    ],
    [
      "../img/xuewei/sanyin.jpg",
    ],
    [ 
      "../img/xuewei/wushu.jpg",
    ],
    // 月经后期
    [
      "../img/xuewei/zusan.jpg",
      '../img/xuewei/xuehai.jpg'
    ]
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    auth();
    const day = moment().format("YYYY-MM-D");
    var list = app.globalData.bodyStatus||[];
    for (let i = 0; i < list.length; i++) {
      const dy = list[i];
      
      if (dy.day === day) {
        console.log(list[i].physiologicalCycle);
        var pos;

        if (list[i].physiologicalCycle === "05") {
          pos = 3;
        }
        if (list[i].physiologicalCycle === "02") {
          pos = 1;
        }
        if (list[i].physiologicalCycle === "03") {
          pos = 2;
        }
        if (list[i].physiologicalCycle === "01") {
          pos = 0;
        }
        if (list[i].physiologicalCycle === "04") {
          pos = 2;
        }
        this.setData({
          pos: pos
        })
      }

    }
    this.getData(page);
  },

  getData: function (page) {
    var data = {
      page: page,
      rows: 20
    }
    apiCourseRecommendList(data).then(result => {
      console.log('今日推荐', result);
      var list = this.data.list;
      if (result.code === 200) {
        if (page > 1) {
          for (var i = 0; i < result.list.length; i++) {
            list.push(result.list[i]);
          }
        } else {
          list = [];
          list = result.list;
        }
        this.setData({
          list: list,
        })
      }
    })

  },
})