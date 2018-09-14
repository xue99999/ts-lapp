// pages/taber/taber.js
const app = getApp()
const moment = require('../../utils/moment.js');
const {
  currentWeek
} = require('../../utils/time.js');

const {
  userInfoQueryBodyStatus,
  userInfoUpdateBodyStatus,
  userInfoQueryBabyRecord,
  userInfoUpdateBabyRecord,
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
    } = this.data.anmo;
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
    amtoast: false,
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
        name: '捏脊,好棒哦!',
        select: false,
        isShow: false,
        curUrl: '../img/nieji-@3x.png',
        imgUrl: '../img/nieji@3x.png',
      },
      {
        code: 'frictionalAbdomen',
        name: '摩腹,好棒哦!',
        select: false,
        isShow: false,
        curUrl: '../img/mofu@3x.png',
        imgUrl: '../img/mofu-@3x.png',
      }
    ],
  },
  // 更新身体信息
  updateStatus(data) {
    console.log(data)
    const {
      day
    } = this.data.currentDay;
    console.log(day)
    userInfoUpdateBabyRecord({
      day,
      ...data
    }).then(res => {
      console.log(res)
      const {
        code,
        integral
      } = res;
      if (code === 200) {
        if (integral && integral > 0) {
          $Toast({
            content: `好棒哦!+${integral}积分`,
            mask: false,
            duration: 3,
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
    console.log(list1)
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
          list1[i].isShow = true;
          selectTag = true;


          setTimeout(_ => {
            list1[i].isShow = false;
            this.setData({
              anmo: list1
            })
          }, 3000)
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
    console.log('onLoad')
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

    // if (!this.data.show) {
    //   return;
    // }

    const day = moment().format("YYYY-MM-D");
    const today = moment().format('DD');

    this.setData({
      today,
      days: currentWeek(),
      formatDay: day

    })


    this.query(day, day, day);
    console.log('onshow')
  },
  recordPeriod: function() {
    if (!app.globalData.obj.menstrualStartTime) {
      wx.navigateTo({
        url: '../home/home',
      })
    } else {
      wx.switchTab({
        url: '../calendar/calendar',
      })
    }

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
          birthday
      } = res;
      app.globalData.bodyStatus = list;
      if (list.length === 1) {
        if (!list[0]['day']) {
          this.setData({
            currentDay: null,
          })
          return;
        }
      }
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
              predictDay: predictDay ? (predictDay > 0 ? `距离经期还有 ${predictDay} 天` : (isPredict === '0' ? `推迟 ${-predictDay} 天` : `${-predictDay}`)) : '',
              predictDays: `${predictDay}` == '0' ? `第 1 天` : `${predictDay}` < 0 ? `推迟 ${-predictDay} 天` : '',
              //下半部显示信息
              // lastText: this.installText(dy),
              top: `${physiologicalCycle === '02' && isPredict === '0' ? '预测 : ' : ''}${this.getphysiologicalCycleText(physiologicalCycle)}`,
              startDay: `预测开始 ${day}`
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
            birthday
          })
        }
      }

    })

    var nasa = {
      day: this.data.formatDay
    }
    userInfoQueryBabyRecord(nasa).then(res => {
      console.log(res)
      if (res.data) {
        const {
          anmo
        } = this.data
        anmo[0]['select'] = res.data.chiropractic == '01' ? true : false
        anmo[1]['select'] = res.data.frictionalAbdomen == '01' ? true : false
        this.setData({
          anmo
        })
      } else {
        this.setData({
          amtoast: true
        })
        setTimeout(_ => {
          this.setData({
            amtoast: false
          })
        }, 5000)

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
        text = "怀孕几率低";
        break;
      case "02":
        text = "怀孕几率低";
        break;
      case "03":
        text = "怀孕几率高"
        break;
      case "04":
        text = "怀孕几率高"
        break;
      case "05":
        text = "怀孕几率低";
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


  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '她师',
      path: '/pages/home/home', //这里填写首页的地址,一般为/pages/xxxx/xxx
      // imageUrl:'../img/placeholder.jpg',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }

})