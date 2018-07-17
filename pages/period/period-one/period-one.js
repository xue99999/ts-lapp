//index.js
//获取应用实例
const app = getApp()
const moment=require('../../../utils/moment.js');
const { auth } = require('../../../utils/auth.js');
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',
    day: ''

  },
  chooseImg: function(e) {

    this.setData({
      show: !this.data.show
    })


  },
  navto: function() {
    if (!this.data.day) {
      wx.showToast({
        title: "设置您的上次月经时间",
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../period-two/period-two?menstrualStartTime=' +         app.globalData.menstrualStartTime,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })


  },

  dianji: function(e) {
    var month;
    if (this.data.month < 10) {
      month = '0' + this.data.month
    }
    var day;
    if (e.currentTarget.dataset.day < 10) {
      day = '0' + e.currentTarget.dataset.day
    } else {
      day = e.currentTarget.dataset.day
    }

    var dates = this.data.year + "-" + month + "-" + day;
    if(moment(dates).isAfter(moment())){
      wx.showToast({
        title: "是您的上次月经时间",
        icon: 'none'
      })
      return;
    }

    app.globalData.obj.menstrualStartTime = dates;
    this.setData({
      day: e.currentTarget.dataset.day
    })
  },
  onLoad: function() {
      const parmas = {
        tag: 'switch'
      }
      auth(parmas)
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
  },
  dateInit: function(setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  //手指刚放到屏幕触发
  touchS: function (e) {
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  touchE: function (e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      if (disX > 50) {
        this.nextMonth()
      } else if (disX < -50) {
        this.lastMonth()
       
      }
    }
  }
})