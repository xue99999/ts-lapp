// pages/taber/taber.js
const app = getApp()
const moment = require('../../utils/moment.js');
const {
  currentWeek
} = require('../../utils/time.js');
const {
  userInfoQueryBodyStatus,
  userInfoUpdateBodyStatus
} = require('../../service/user.js')
const resources = require('../../utils/resources.js');
const {
  auth
} = require('../../utils/auth.js');
const {
  $Toast
} = require('../../component/base/index.js');
const {
  records
} = resources;


Page({

  /**
   * 页面的初始数据
   */
  ready: function() {
    console.log('ready', this.data.currentDay, this.data.onChange)

    const {
      chiropractic,
      frictionalAbdomen
    } = this.data.currentDay;
    const {
      anmo
    } = this.data;
    if (chiropractic === '01') {
      anmo[0].select = true;
    }
    if (frictionalAbdomen === '01') {
      anmo[1].select = true;
    }
    this.setData({
      anmo
    })
  },
  data: {
    show: false,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    days: [],
    userModel: '',
    isLaw: '',
    list: [],
    today: moment().format('YYYY-MM-DD'),
    currentDay: {},
    formatDay: null,
    bobyImg: resources.records['baby'],
    month: moment().format('M'),
    day: moment().format('D'),
    week: moment().format('d'),
    // 圆圈显示数据
    showObj: {
      // 模式辣妈
      "02": {
        babyText: '宝宝信息显示'
      },
      // 模式少女
      "01": {

      }
    },
    anmo: [{

        code: 'chiropractic',
        name: '捏脊',
        select: false,
        imgUrl: '../img/nieji-@3x.png',
        curUrl: '../img/nieji@3x.png',
      },
      {
        code: 'frictionalAbdomen',
        name: '摩腹',
        select: false,
        imgUrl: '../img/mofu@3x.png',
        curUrl: '../img/mofu-@3x.png',
      }
    ],
  },
  // 更新身体信息
  updateStatus(data) {
    const {
      day
    } = this.data.currentDay;

    userInfoUpdateBodyStatus({
      day,
      ...data
    }).then(res => {

      const {
        code,
        integral
      } = res;
      if (code === 200) {
        if (integral && integral > 0) {
          $Toast({
            content: `积分+${integral}`,
            mask: false,
            duration: 1
          });

        }
      }



      this.triggerEvent('myevent', {
        ...res
      }, {
        bubbles: false,
        composed: true
      })

    })
  },
  chooseImg: function(e) {
    const index = e.currentTarget.dataset.index;
    const list1 = this.data.anmo;
    let selectTag = false;
    for (let i = 0; i < list1.length; i++) {
      if (i == index) {
        const {
          select,
          code
        } = list1[i];
        list1[i].select = !select;
        const updateData = {};
        if (list1[i].select) {
          selectTag = true;

          $Toast({
            content: list1[i].name,
            mask: false,
            duration: 0.5
          });
        }
      }
    }
    let updateData = {};
    if (index === 0) {
      updateData = {
        chiropractic: selectTag ? "01" : "02"
      }
    } else {
      updateData = {
        frictionalAbdomen: selectTag ? "01" : "02"
      }
    }

    this.updateStatus(updateData)

    this.setData({
      anmo: list1
    })

  },
  naState: function() {
    const day = this.data.formatDay;
    wx.navigateTo({
      url: `/pages/state/state?day=${day}`
    })

  },
  clickArr: function(e) {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const day = moment().format("YYYY-MM-D");
    const today = moment().format('DD');
    let todays;
    this.setData({
      today,
      days: currentWeek(),
      formatDay: day
    })

    this.query(day, day, day);
  },
  onShow: function() {
    if (!this.data.show) {
      return;
    }

    const day = moment().format("YYYY-MM-D");
    const today = moment().format('DD');

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
  query: function(startDay, endDay, cday) {
    const currentDay = moment(currentDay).format('YYYY-MM-D');
    var query = {
      startDay,
      endDay
    }

    userInfoQueryBodyStatus(query).then(res => {
      console.log(res)

      const {
        list = [],
          userModel,
          isLaw,
      } = res;
      app.globalData.bodyStatus = list;
      for (let i = 0; i < list.length; i++) {
        const dy = list[i];
        const {
          day,
          menstrualStartTime,
          isPredict,
          physiologicalCycle,
          predictDay = 0
        } = dy;
        if (day === currentDay) {
          this.getRecordsImg(dy)
          let showObj = {}
          // 处理当前需要显示的数据
          if (isLaw === '01') {
            showObj = {
              shouyun: this.getShouyunText(physiologicalCycle),
              predictDay: predictDay ? (predictDay > 0 ? `距离经期还有${predictDay}天` : `${-predictDay}`) : '',
              //下半部显示信息
              // lastText: this.installText(dy),
              top: `${physiologicalCycle === '02' && isPredict === '0' ? '预测 : ' : ''}${this.getphysiologicalCycleText(physiologicalCycle)}`,
            }

          }

          if (isLaw === '02') {
            showObj = {
              predictDay: `${-predictDay}`,
              //下半部显示信息
              menstrualStartTime: menstrualStartTime,
              tops: `${physiologicalCycle === '02'}` ? `${this.getphysiologicalCycleText(physiologicalCycle)}` : ''
            }

          }
          this.setData({
            show: true,
            currentDay: dy,
            showObj,
            userModel,
            isLaw,
          })
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
      predictDay
    } = dy;
    if (!predictDay) {
      return ''
    }
    const pcText = this.getphysiologicalCycleText(physiologicalCycle);
    if (isPredict === '0') {
      return `${pcText}第${predictDay}天`
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
      "04": "排卵日",
      "05": "安全期"
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
      case "05":
        text = "受孕几率低";
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
    // if (chiropractic === '01' || frictionalAbdomen === '01') {
    //   list.push(records['chiropractic'])
    // }
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

  onShareAppMessage: function(options) {　　
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容
    　　
    var shareObj = {　　　　
      title: "她师", // 默认是小程序的名称(可以写slogan等)
      　　　　path: '/pages/today/today', // 默认是当前页面，必须是以‘/’开头的完整路径
      　　　　imgUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      　　　　success: function(res) {　　　　　　 // 转发成功之后的回调
        　　　　　　
        if (res.errMsg == 'shareAppMessage:ok') {　　　　　　}　　　　
      },
      　　　　fail: function() {　　　　　　 // 转发失败之后的回调
        　　　　　　
        if (res.errMsg == 'shareAppMessage:fail cancel') {　　　　　　　　 // 用户取消转发
          　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {　　　　　　　　 // 转发失败，其中 detail message 为详细失败信息
          　　　　　　}　　　　
      }　　
    }
  }


})