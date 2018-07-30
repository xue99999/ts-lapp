// pages/taber/taber.js
const app = getApp()
const moment = require('../../utils/moment.js');
const {
  currentWeek
} = require('../../utils/time.js');
const {
  userInfoQueryBodyStatus
} = require('../../service/user.js')
const resources = require('../../utils/resources.js');
const {
  auth
} = require('../../utils/auth.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    days: [],
    userModel: '',
    list: [],
    today: moment().format('YYYY-MM-DD'),
    currentDay: {},
    formatDay: null,
    bobyImg: resources.records['baby'],
    // 圆圈显示数据
    showObj: {
      // 模式辣妈
      "02": {
        babyText: '宝宝信息显示'
      },
      // 模式少女
      "01": {

      }
    }
  },
  naState: function () {
    const day = this.data.formatDay;
    wx.navigateTo({
      url: `/pages/state/state?day=${day}`
    })

  },
  clickArr: function (e) {
    console.log(e.currentTarget.dataset.index)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    const day = moment().format("YYYY-MM-D");
    const today = moment().format('D');
    this.setData({
      today,
      days: currentWeek(),
      formatDay: day
    })

    this.query(day, day, day);
  },
  onShow: function () {
    const day = moment().format("YYYY-MM-D");
    const today = moment().format('D');
    this.setData({
      today,
      days: currentWeek(),
      formatDay: day
    })

    this.query(day, day, day);
  },
  /**
   * startDay 开始时间
   * endDay
   * currentDay 当前天数据
   */
  query: function (startDay, endDay, currentDay) {

    var query = {
      startDay,
      endDay
    }

    userInfoQueryBodyStatus(query).then(res => {
      console.log('---返回数据', currentDay);

      const {
        list,
        userModel,
        babyMonth
      } = res;
      app.globalData.bodyStatus = list;

      for (let i = 0; i < list.length; i++) {
        const dy = list[i];
        const {
          day,
          isPredict,
          physiologicalCycle,
          predictDay = 0
        } = dy;
        if (day === currentDay) {
          this.getRecordsImg(dy)
          let showObj = {}
          // 处理当前需要显示的数据
          if (userModel === '02') {
            showObj['02'] = {
              babyText: `${babyMonth}`,
              physiologicalCycle: physiologicalCycle,
              //下半部显示信息
              lastText: this.installText(dy),
            }
            console.log(res)
          }

          if (userModel === '01') {
            showObj['01'] = {
              //当前周期信息 预计:月经期第六天
              top: `${physiologicalCycle !== '01' && physiologicalCycle !== '05' && isPredict === '0' ? '预测:' : ''}${this.getphysiologicalCycleText(physiologicalCycle)}`,
              middle: predictDay > 0 ? `离月经还有${predictDay}天` : `月经第${predictDay}天`,
              shouyun: this.getShouyunText(physiologicalCycle)
            }
          }
          this.setData({ currentDay: dy, showObj, userModel })
        }
      }
    })
  },
  // 拼接数据显示
  installText(dy) {
    //如果是预测，则显示预测第x天
    const {
      isPredict,
      physiologicalCycle,
      predictDay = 0
    } = dy;
    const pcText = this.getphysiologicalCycleText(physiologicalCycle);
    if (isPredict === '0') {
      return `预测:${pcText}第${predictDay}天`
    }
    if (isPredict === '1') {
      return `${pcText}第${predictDay}天`
    }
    return '';
    //如果是实际产生的,则显示第X天
  },
  // 根据生理周期状态返回显示内容
  getphysiologicalCycleText: function (status) {
    let result = {
      "01": "安全期",
      "02": "月经期",
      "03": "易孕期",
      "04": "排卵日",
      "05": "安全期"
    };
    return result[status];
  },

  // 根据生理周期状态返回受孕几率
  getShouyunText: function (status) {
    let text;
    switch (status) {
      case "01":
        text = "受孕几率低";
        break;
      case "02":
        text = "受孕几率低";
        break;
      case "03":
        text = "受孕几率高"
        break;
      case "04":
        text = "受孕几率高"
        break;
    }

    return text;
  },
  // 获取所有几率的标签
  getRecordsImg: function (dy) {

    const list = [];
    const {
      records
    } = resources;
    const {
      chiropractic = '02',
      frictionalAbdomen = '02',
      menstrualStatus,
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
      list.push(records['chiropractic'])
    }
    if (menstrualStatus) {
      list.push(records['menstrualStatus'])
    }
    if (leucorrhea) {
      list.push(records['leucorrhea'])
    }
    if (breastTenderness) {
      list.push(records['breastTenderness'])
    }
    if (abdominalPain) {
      list.push(records['abdominalPain'])
    }
    if (mood) {
      list.push(records['mood'])
    }
    if (menstrualHeadache) {
      list.push(records['menstrualHeadache'])
    }
    if (fearCold) {
      list.push(records['fearCold'])
    }
    if (menstrualVolume) {
      list.push(records['menstrualVolume'])
    }
    if (weak) {
      list.push(records['weak'])
    }


    //设置变量
    this.setData({
      recordsImg: list
    })
  },


  clickjinri: function () {
    wx.navigateTo({
      url: '../today-recommend/today-recommend?day=' + this.data.formatDay
    })
  },

  onShareAppMessage: function (options) {
    　　var that = this;
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
      　　　　title: "她师",        // 默认是小程序的名称(可以写slogan等)
      　　　　path: '/pages/today/today',        // 默认是当前页面，必须是以‘/’开头的完整路径
      　　　　imgUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      　　　　success: function (res) {
        　　　　　　// 转发成功之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
        　　　　　　}
      　　　　},
      　　　　fail: function () {
        　　　　　　// 转发失败之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
          　　　　　　　　// 用户取消转发
        　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
          　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
        　　　　　　}
      　　　　}
    　　}
  }


})