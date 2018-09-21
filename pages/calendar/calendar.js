//index.js

const app = getApp()
const moment = require('../../utils/moment.js');
const {
  userInfoQueryBodyStatus,
  userInfoUpdateBodyStatus
} = require('../../service/user.js')
const resources = require('../../utils/resources.js');
const {
  $Toast
} = require('../base/index');
const {
  auth
} = require('../../utils/auth.js');
const {
  records
} = resources;
var hw;
Page({
  data: {
    isShow: false,
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isTodayWeek: false,
    todayIndex: 0,
    currentDay: null, //当前选中数据
    show: false,
    curIdx: null,
    physiologicalCycle: null,
    tian: null,
    selectDay: moment().format("YYYY-MM-DD"),
    weight: '../img/xing@3x.png',
    bossShow: true,
    tipsShow: false,
    today: moment().format('YYYYMD'),
    //缓存月份数据
    cacheMonths: [],
  },

  defaultDay: function(e) {

    const {
      year,
      month,
      list,
      dateArr,
    } = this.data;
    //  大于9 月份加 0
    const cmonth = month > 9 ? month : '0' + month

    let day;
    day = e.currentTarget.dataset.day

    if (day < 10) {
      day = '0' + day
    }
    let dates = year + "-" + cmonth + "-" + day;

    for (let i = 0; i < dateArr.length; i++) {
      const obj = dateArr[i];

      if (day == obj.dateNum) {
        obj.isSelect = true;
      } else {
        obj.isSelect = false;
      }
    }

    const today = moment();
    const sday = moment(dates);
    const yue = moment().format('MM');

    if (!sday.isAfter(today)) {
      this.data.bossShow = true;
      this.data.tipsShow = false;
    } else {
      this.data.bossShow = false;
      this.data.tipsShow = true;
    }
    this.setData({
      currentDay: null,
      selectDay: sday.format('YYYY-MM-DD'),
      dateArr: dateArr,
      bossShow: this.data.bossShow,
      tipsShow: this.data.tipsShow,
    })

    this.initRecord(dates);
  },

// 页面初次渲染
  onLoad: function() {
    const parmas = {
      tag: 'switch'
    }
    auth(parmas);
    hw = moment().format("MM");


    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    const {
      list
    } = this.data;
    let cmonth;
    if (month < 10) {
      cmonth = '0' + month
    }
    // 当月第一天
    let tian1;
    tian1 = '01';

    let startDay = year + '-' + cmonth + '-' + tian1

    // 当月最后一天
    let tian;
    tian = this.data.tian;
    let endDay = year + '-' + cmonth + '-' + tian


    this.setData({
      year: year,
      month: month,
      isToday: moment().format("YYYYMD"),
      tian1: tian1,
      startDay: startDay,
      endDay: endDay
    })
    // 缓存数据
    const day = moment().format("YYYY-MM-DD");
    this.query(startDay, endDay, day);

    this.cacheDatas(moment().format("YYYY-MM"))
  },
  query: function(startDay, endDay, cday) {

    var query = {
      startDay,
      endDay
    }
    userInfoQueryBodyStatus(query).then(res => {
      const {
        list = [],
          userModel,
          code,
          isLaw
      } = res;

      if (code === 500) {
        wx.switchTab({
          url: '/pages/home/home',
        })
        return;
      }
      app.globalData.bodyStatus = list;
      app.globalData.obj.isLaw = isLaw;
      const {
        lyear,
        lmonth
      } = this.data;
      this.setData({
        isShow: true,
        bodyStatus: list,
        isLaw: isLaw
      })
      // 同步2018年月
      this.dateInit(lyear, lmonth);

      this.initRecord(cday);
    })
  },
  initRecord(day) {
    if (!day) {
      return;
    }
    let isdy = false;
    const list = this.data.bodyStatus;

    //this.setData({ currentDay:null})
    for (let i = 0; i < list.length; i++) {
      const dy = list[i];
      if (dy.day === day) {
        isdy = true;
        const {
          physiologicalCycle,
          weak,
          fearCold,
          menstrualHeadache,
          mood,
          abdominalPain,
          breastTenderness,
          leucorrhea,
          menstrualVolume,
          chiropractic = "02",
          frictionalAbdomen = "02"
        } = dy;


        const {
          dateArr
        } = this.data;
        //初始化选中
        const cday = moment(day).format('D');
        // const cdays = moment(day).subtract('months').format('YYYYMD')
        // console.log('dddddddddddddddddddd',cdays)
        for (let i = 0; i < dateArr.length; i++) {
          const obj = dateArr[i];
          // console.log('xxxxxxxxx', obj)
          if (cday == obj.dateNum) {
            obj.isSelect = true;
          } else {
            obj.isSelect = false;
          }
        }
        this.setData({
          dateArr,
          currentDay: dy
        })
      }

    }
    // 如果没有数据
    if (!isdy) {
      this.setData({
        currentDay: {
          menstrualStatus: '02',
          day: day
        }
      })
    }
  },

  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


    if (!this.data.isShow) {
      return;
    }
    var data = {
      startDay: this.data.startDay,
      endDay: this.data.endDay
    }
    this.query(this.data.startDay, this.data.endDay, this.data.selectDay);

  },
  dateInit: function(setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 12 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;
    var tian = dayNums;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }


    const sdate = `${year}-${nextMonth > 10 || nextMonth == 10 ? nextMonth : '0' + nextMonth}-01`;
    const edate = `${year}-${nextMonth > 10 || nextMonth == 10 ? nextMonth : '0' + nextMonth}-${dayNums}`;



    arrLen = startWeek + dayNums;

    const fmdate = moment(`${this.data.year}-${this.data.month}`).format('YYYY-MM');

    const list = this.data.cacheMonths[fmdate] || this.data.bodyStatus || [];
    for (let i = 0; i < arrLen; i++) {

      if (i >= startWeek) {
        num = i - startWeek + 1;
        let css
        let tag
        let status
        for (let i = 0; i < list.length; i++) {
          const dy = list[i];
          const {
            day,
            isPredict,
            physiologicalCycle,
            predictStatus
          } = dy;
          if (day) {
            const remoteDay = moment(day).format("D");
            if (num == remoteDay) {
              // 判断是否有记录
              const isRecord = this.isRecord(dy);
              if (isRecord) {
                tag = records['record'];
              }
              if (isPredict === '0' && physiologicalCycle === '02') {
                css = 'yuejing-yuji'
              }
              if (isPredict === '1' && physiologicalCycle === '02') {
                css = 'yuejingclass'
              }

              if (physiologicalCycle === '03' || physiologicalCycle === '04') {
                css = 'pailuanclass'
              }

              if (physiologicalCycle === '04') {
                tag = records['pailuanri']
              }
              if (predictStatus === '0') {
                status = records['start']
              }
              if (predictStatus === '1') {
                status = records['end']
              }
            }
          }

        }
        obj = {
          today: '' + year + (month + 1) + num,
          dateNum: num,
          // 选中状态 false 未选中 true 选中
          isSelect: false,
          // 是否有记录
          record: false,
          // 姨妈状态 1预测大姨妈 css1 2 预测排卵期 css2 3实际大姨妈 css3  
          css,
          // :'icon-record' 记录 icon-pailuan
          tag,
          // 经期开始 结束标识
          status,
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }


    this.setData({
      tian,
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

    return {
      sdate,
      edate
    };
  },
  //当月之后的数据
  lastMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    const res = this.dateInit(year, month);
    this.setData({
      bossShow: false,
      startDay: res.sdate,
      endDay: res.edate,
      lyear: year,
      lmonth: month,
      year: year,
      month: (month + 1)
    })

    this.query(res.sdate, res.edate, null)
    // const currentMonthString = `${this.data.year}-${this.data.month}`;
    // this.cacheDatas(currentMonthString);

  },
//当月之前的数据
  nextMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    //超过2月不请求

    // const maxMonth = moment().add(1, 'months');

    const currentMonthString = `${this.data.year}-${this.data.month}`;
    // const currentMonth = moment(currentMonthString)
    // if (!currentMonth.isBefore(maxMonth)) {
    // return;
    // }

    const res = this.dateInit(year, month);
    this.setData({
      bossShow: false,
      startDay: res.sdate,
      endDay: res.edate,
      lyear: year,
      lmonth: month,
      year: year,
      month: (month + 1)
    })

    this.query(res.sdate, res.edate, null)

    this.cacheDatas(currentMonthString);


  }, // 更新身体回调
  updateStatusChange(data) {

    console.log("... change", data)
    const day = this.data.selectDay;
    const cday = moment(day).format('YYYY-MM-D')

    //更新成功
    this.query(this.data.startDay, this.data.endDay, day);
    const currentMonthString = `${this.data.year}-${this.data.month}`;
    this.cacheDatas(currentMonthString);
  },
  //手指刚放到屏幕触发
  touchS: function(e) {
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },

  touchE: function(e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;

      // console.log(disX);
      if (disX > 90) {
        const {
          year,
          month
        } = this.data;
        const maxMonth = moment().add(1, 'months');
        console.log('00000----', maxMonth.format('YYYY-MM'))
        const currentMonth = moment(`${year}-${month}`)
        // if (currentMonth.isBefore(maxMonth)) {
        that.nextMonth()
        // }

      } else if (disX < -90) {
        that.lastMonth()
      }
    }
  },
  // 是否有记录
  isRecord: function(dy) {
    const {
      chiropractic = '02',
        frictionalAbdomen = '02',
        menstrualVolume,
        leucorrhea,
        breastTenderness,
        abdominalPain,
        mood,
        menstrualHeadache,
        fearCold,
        weak
    } = dy;

    if (chiropractic === '01' || frictionalAbdomen === '01') {
      return true;
    }

    if (leucorrhea) {
      return true;
    }
    if (breastTenderness) {
      return true;
    }
    if (abdominalPain) {
      return true;
    }
    if (mood) {
      return true;
    }
    if (menstrualHeadache) {
      return true;
    }
    if (fearCold) {
      return true;
    }
    if (menstrualVolume) {
      return true;
    }
    if (weak) {
      return true;
    }

    return false;
  },
  onShareAppMessage: function(options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "她师", // 默认是小程序的名称(可以写slogan等)
      path: '/pages/today/today', // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function(res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {}
      },
      fail: function() {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    }
  },
  //防止偶尔卡死
  swiperchange: function(event) {
    if (event.detail.source == "touch") {
      //防止swiper控件卡死
      if (this.data.current == 0 && this.data.preIndex > 1) { //卡死时，重置current为正确索引
        this.setData({
          current: this.data.preIndex
        });
      } else { //正常轮转时，记录正确页码索引
        this.setData({
          preIndex: this.data.current
        });
      }
    }
  },


  //统一缓存方法
  cacheDatas: function(currentMonth) {
    //获取前后两个月 
    const mms = this.totalPreMonthAndNextMonth(currentMonth)

    // 缓存前后两个月数据
    this.preloadingData(mms)
  },
  //预加载月份数据[2018-]
  preloadingData: function(months) {
    const cacheMonths = {};
    for (let i = 0; i < months.length; i++) {
      const m = months[i];
      const days = moment(m).daysInMonth();
      const firstDay = '01';

      const startDay = moment(`${m}-01`).format('YYYY-MM-DD');
      const endDay = moment(`${m}-${days}`).format('YYYY-MM-DD');

      var query = {
        startDay,
        endDay
      }
      userInfoQueryBodyStatus(query).then(res => {
        const {
          list = [],
            userModel
        } = res;

        const obj = {};
        //obj[m] = list;
        cacheMonths[m] = list;
      })

    }

    this.setData({
      cacheMonths
    })
  },
  //根据当前月计算上个月和下个月
  totalPreMonthAndNextMonth: function(currentMonth) {
    const next = moment(currentMonth).add(1, 'M').format('YYYY-MM');
    const pre = moment(currentMonth).subtract(1, 'M').format('YYYY-MM');
    return [next, pre]
  }
})