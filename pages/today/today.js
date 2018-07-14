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
  clickArr: function(e) {
    console.log(e.currentTarget.dataset.index)
  },
  navState: function() {
    const day = this.data.formatDay;
    wx.navigateTo({
      url: `/pages/state/state?day=${day}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const day = moment().format("YYYY-MM-D");
    const today = moment().format('D');
    this.setData({
      today,
      days: currentWeek(),
      formatDay: day
    })

    this.query(day, day, day);
  },
  onShow:function(){
    console.log('show');
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
  query: function(startDay, endDay, currentDay) {

    var query = {
      startDay,
      endDay
    }

    userInfoQueryBodyStatus(query).then(res => {
      console.log('---返回数据', currentDay);

      const {
        list,
        userModel
      } = res;
      app.globalData.bodyStatus = list;

      for (let i = 0; i < list.length; i++) {
        const dy = list[i];
        const {
          day,
          isPredict,
          babyMonth,
          physiologicalCycle,
          predictDay
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
          } 
          
          if(userModel === '01') {
            showObj['01'] = {
              //当前周期信息 预计:月经期第六天
              top: `${isPredict === '0' ? '预测' : ''}${this.getphysiologicalCycleText(physiologicalCycle)}`,
              middle: `第${predictDay}天`,
              shouyun: this.getShouyunText(physiologicalCycle)
              // 
            }
          }
          this.setData({ showObj, userModel})
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
  getphysiologicalCycleText: function(status) {
    let result = {
      "01": "安全期",
      "02": "月经期",
      "03": "易孕期",
      "04": "安全排卵日期",
    };
    return result[status];
  },

  // 根据生理周期状态返回受孕几率
  getShouyunText: function(status) {
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
  getRecordsImg: function(dy) {

    const list = [];
    const {
      records
    } = resources;
    const {
      chiropractic,
      frictionalAbdomen,
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

    if (chiropractic) {
      list.push(records['chiropractic'])
    }
    if (frictionalAbdomen) {
      list.push(records['frictionalAbdomen'])
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


  clickjinri: function() {
    wx.navigateTo({
      url: '../today-recommend/today-recommend?day=' + this.data.formatDay
    })
  },

})