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
    currentDay: {}, //当前选中数据
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',
    curIdx: null,
    physiologicalCycle: null,
    tian: null,
    selectDay: moment().format("YYYY-MM-DD"),
    weight: '../img/xing@3x.png',
    bossShow: true,
    today: moment().format('YYYYMD'),

    //缓存月份数据
    cacheMonths: [],
    // 按摩
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
    // 月经量
    menstrualVolume: [{
        name: '月经量偏少',
        imgUrl: '../img/menstruation/1menstruation@3x.png',
        curUrl: '../img/menstruation/1menstruation-1@3x.png',
        select: false
      },
      {
        name: '月经量正常',
        imgUrl: '../img/menstruation/2menstruation@3x.png',
        curUrl: '../img/menstruation/2menstruation-2@3x.png',
        select: false,
      },
      {
        name: '月经量很多',
        imgUrl: '../img/menstruation/3menstruation@3x.png',
        curUrl: '../img/menstruation/3menstruation-3@3x.png',
        select: false,
      }
    ],
    // 白带
    leucorrheas: [{
        imgUrl: '../img/leucorrhea/1leucorrhea@3x.png',
        curUrl: '../img/leucorrhea/1leucorrhea-1@3x.png',
      },
      {
        imgUrl: '../img/leucorrhea/2leucorrhea@3x.png',
        curUrl: '../img/leucorrhea/2leucorrhea-2@3x.png',
      },
      {
        imgUrl: '../img/leucorrhea/3leucorrhea@3x.png',
        curUrl: '../img/leucorrhea/3leucorrhea-3@3x.png',
      }
    ],
    // 乳房胀痛
    breastTenderness: [{
        select: false,
        name: '基本不痛',
        imgUrl: '../img/pain/1pain@3x.png',
        curUrl: '../img/pain/1pain-1@3x.png',

      },
      {
        select: false,
        name: '轻微痛',
        imgUrl: '../img/pain/2pain@3x.png',
        curUrl: '../img/pain/2pain-1@3x.png',
      },
      {
        select: false,
        name: '非常痛',
        imgUrl: '../img/pain/3pain@3x.png',
        curUrl: '../img/pain/3pain-@3x.png',
      }
    ],
    // 小腹痛
    abdominalPain: [{
        select: false,
        name: '基本不痛',
        imgUrl: '../img/pain/1pain@3x.png',
        curUrl: '../img/pain/1pain-1@3x.png',

      },
      {
        select: false,
        name: '轻微痛',
        imgUrl: '../img/pain/2pain@3x.png',
        curUrl: '../img/pain/2pain-1@3x.png',
      },
      {
        select: false,
        name: '非常痛',
        imgUrl: '../img/pain/3pain@3x.png',
        curUrl: '../img/pain/3pain-@3x.png',
      }
    ],
    // 心情
    mood: [{
        name: '情绪稳定',
        imgUrl: '../img/mood/2mood@3x.png',
        curUrl: '../img/mood/2mood-2@3x.png',
        select: false,
      },
      {
        name: '烦躁易怒',
        imgUrl: '../img/mood/anger@3x.png',
        curUrl: '../img/mood/anger-1@3x.png',
        select: false,
      },
      {
        name: '情绪低落',
        imgUrl: '../img/mood/3mood@3x.png',
        curUrl: '../img/mood/3mood-3@3x.png',
        select: false,
      }
    ],
    // 经常头痛
    menstrualHeadache: [{
        select: false,
        name: '基本不痛',
        imgUrl: '../img/pain/1pain@3x.png',
        curUrl: '../img/pain/1pain-1@3x.png',

      },
      {
        select: false,
        name: '轻微痛',
        imgUrl: '../img/pain/2pain@3x.png',
        curUrl: '../img/pain/2pain-1@3x.png',
      },
      {
        select: false,
        name: '非常痛',
        imgUrl: '../img/pain/3pain@3x.png',
        curUrl: '../img/pain/3pain-@3x.png',
      }
    ],
    //怕冷
    fearCold: [{
        select: false,
        name: '不怕',
        imgUrl: '../img/cold/1cold@3x.png',
        curUrl: '../img/cold/1cold-1@3x.png',

      },
      {
        select: false,
        name: '微微',
        imgUrl: '../img/cold/2cold@3x.png',
        curUrl: '../img/cold/2cold-2@3x.png',
      },
      {
        select: false,
        name: '好冷',
        imgUrl: '../img/cold/3cold@3x.png',
        curUrl: '../img/cold/3cold-3@3x.png',
      }
    ],
    //乏力
    weak: [{
        select: false,
        name: '不乏力',
        imgUrl: '../img/weak/1weak@3x.png',
        curUrl: '../img/weak/1weak-1@3x.png',
        id: '01'
      },
      {
        select: false,
        name: '轻微',
        imgUrl: '../img/weak/2weak@3x.png',
        curUrl: '../img/weak/2weak-2@3x.png',
        id: "02"
      },
      {
        select: false,
        name: '非常乏力',
        imgUrl: '../img/weak/3weak@3x.png',
        curUrl: '../img/weak/3weak-3@3x.png',
        id: "03"
      }
    ],
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
  // 来了
  switchChange: function(e) {
    const tag = e.detail.value;

    if (tag) {
      const {
        currentDay
      } = this.data;
      currentDay['menstrualStatus'] = '01';

      this.setData({
        currentDay
      })
    } else {
      const {
        currentDay
      } = this.data;
      currentDay['menstrualStatus'] = '02';
      this.setData({
        currentDay
      })
    }

    this.updateStatus({
      menstrualStatus: tag ? '01' : '02'
    })
  },
  // 点击月经量
  chooseImg1: function(e) {
    const index = e.currentTarget.dataset.index;

    const list1 = this.data.menstrualVolume;

    //是否是取消
    let cannel = false;
    for (let i = 0; i < list1.length; i++) {
      if (i == index) {
        if (list1[i].select) {
          cannel = true;
          list1[i].select = false;
        } else {
          list1[i].select = true;
        }

      } else {
        list1[i].select = false;
      }
    }

    this.setData({
      menstrualVolume: list1
    })
    let updateData = {}

    if (cannel) {
      updateData = {
        menstrualVolume: ""
      }
    } else {
      if (index == 0) {

        $Toast({
          content: '月经量偏少',
          mask: false,
          duration: 0.5
        });

        updateData = {
          menstrualVolume: "01"
        }
      } else if (index == 1) {

        $Toast({
          content: '月经量正常',
          mask: false,
          duration: 0.5
        });

        updateData = {
          menstrualVolume: "02"
        }
      } else if (index == 2) {

        $Toast({
          content: '月经量很多',
          mask: false,
          duration: 0.5
        });


        updateData = {
          menstrualVolume: "03"
        }
      }

    }


    this.updateStatus(updateData)

  },
  // 点击白带
  chooseImg2: function(e) {
    const index = e.currentTarget.dataset.index;

    const list = this.data.leucorrheas;
    let cannel = false;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        if (list[i].select) {
          cannel = true;
          list[i].select = false;
        } else {
          list[i].select = true;
        }

      } else {
        list[i].select = false;
      }
    }
    this.setData({
      leucorrheas: list
    })

    let updateData = {}

    if (cannel) {
      updateData = {
        leucorrhea: ""
      }
    } else {
      if (index == 0) {

        $Toast({
          content: '少',
          mask: false,
          duration: 0.5
        });

        updateData = {
          leucorrhea: "01"
        }
      } else if (index == 1) {

        $Toast({
          content: '中',
          mask: false,
          duration: 0.5
        });

        updateData = {
          leucorrhea: "02"
        }
      } else if (index == 2) {

        $Toast({
          content: '多',
          mask: false,
          duration: 0.5
        });


        updateData = {
          leucorrhea: "03"
        }
      }
    }
    this.updateStatus(updateData)
  },
  // 点击乳房胀痛
  chooseImg3: function(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.breastTenderness;

    let cannel = false;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {

        if (!list[i].select) {
          list[i].select = true;
        } else {
          cannel = true;
          list[i].select = false;
        }

      } else {
        list[i].select = false;
      }
    }

    let updateData = null;

    if (cannel) {
      updateData = {
        breastTenderness: ""
      }
    } else {
      if (index == 0) {

        $Toast({
          content: '基本不痛',
          mask: false,
          duration: 0.5
        });

        updateData = {
          breastTenderness: "01"
        }
      } else if (index == 1) {

        $Toast({
          content: '轻微痛',
          mask: false,
          duration: 0.5
        });

        updateData = {
          breastTenderness: "02"
        }
      } else if (index == 2) {

        $Toast({
          content: '非常痛',
          mask: false,
          duration: 0.5
        });

        updateData = {
          breastTenderness: "03"
        }
      }
    }
    this.setData({
      breastTenderness: list
    })

    this.updateStatus(updateData)
  },
  // 点击小腹痛
  chooseImg4: function(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.abdominalPain;

    let cannel = false;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        if (!list[i].select) {
          list[i].select = true;
        } else {
          cannel = true;
          list[i].select = false;
        }

      } else {
        list[i].select = false;
      }
    }
    let updateData = {}

    if (cannel) {
      updateData = {
        abdominalPain: ''
      }
    } else {
      if (index == 0) {
        $Toast({
          content: '基本不痛',
          mask: false,
          duration: 0.5
        });

        updateData = {
          abdominalPain: '01'
        }
      } else if (index == 1) {

        $Toast({
          content: '轻微痛',
          mask: false,
          duration: 0.5
        });

        updateData = {
          abdominalPain: '02'
        }
      } else if (index == 2) {

        $Toast({
          content: '非常痛',
          mask: false,
          duration: 0.5
        });

        updateData = {
          abdominalPain: '03'
        }
      }

    }
    this.setData({
      abdominalPain: list
    })
    this.updateStatus(updateData)
  },
  // 心情
  chooseImg5: function(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.mood;
    let cannel = false;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        if (!list[i].select) {
          list[i].select = true;
        } else {
          cannel = true;
          list[i].select = false;
        }

      } else {
        list[i].select = false;
      }
    }
    let updateData = {}

    if (cannel) {
      updateData = {
        mood: ''
      }
    } else {
      if (index == 0) {

        $Toast({
          content: '情绪平稳',
          mask: false,
          duration: 0.5
        });

        updateData = {
          mood: '01'
        }
      } else if (index == 1) {

        $Toast({
          content: '烦躁易怒',
          mask: false,
          duration: 0.5
        });

        updateData = {
          mood: '02'
        }
      } else if (index == 2) {

        $Toast({
          content: '情绪低落',
          mask: false,
          duration: 0.5
        });

        updateData = {
          mood: '03'
        }

      }
    }
    this.setData({
      mood: list
    })

    this.updateStatus(updateData)
  },
  // 经期头痛
  chooseImg6: function(e) {
    const index = e.currentTarget.dataset.index;

    const list = this.data.menstrualHeadache;
    let cannel = false;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        if (list[i].select) {
          cannel = true;
          list[i].select = false;
        } else {
          list[i].select = true;
        }

      } else {
        list[i].select = false;
      }
    }
    this.setData({
      menstrualHeadache: list
    })
    let updateData = {}

    if (cannel) {
      updateData = {
        menstrualHeadache: ''
      }
    }else{
    if (index == 0) {


      $Toast({
        content: '基本不痛',
        mask: false,
        duration: 0.5
      });
      updateData = {
        menstrualHeadache: '01'
      }
    } else if (index == 1) {

      $Toast({
        content: '轻微痛',
        mask: false,
        duration: 0.5
      });
      updateData = {
        menstrualHeadache: '02'
      }
    } else if (index == 2) {

      $Toast({
        content: '非常痛',
        mask: false,
        duration: 0.5
      });

      updateData = {
        menstrualHeadache: '03'
      }
    }
    }

    this.updateStatus(updateData)
  },
  // 怕冷
  chooseImg7: function(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.fearCold;
    let cannel = false;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        if (list[i].select) {
          cannel = true;
          list[i].select = false;
        } else {
          list[i].select = true;
        }
      } else {
        list[i].select = false;
      }
    }

    let updateData = null;

    if (cannel) {
      updateData = {
        fearCold: ''
      }
    } else {
      if (index == 0) {
        $Toast({
          content: '不怕冷',
          mask: false,
          duration: 0.5
        });

        updateData = {
          fearCold: '01'
        }
      } else if (index == 1) {

        $Toast({
          content: '微微冷',
          mask: false,
          duration: 0.5
        });

        updateData = {
          fearCold: '02'
        }
      } else if (index == 2) {
        $Toast({
          content: '很冷',
          mask: false,
          duration: 0.5
        });
        updateData = {
          fearCold: '03'
        }
      }
    }
    this.setData({
      fearCold: list
    })

    this.updateStatus(updateData)
  },
  // 乏力
  chooseImg8: function(e) {
    const index = e.currentTarget.dataset.index;

    const list8 = this.data.weak;
    let cannel = false;
    for (let i = 0; i < list8.length; i++) {
      if (i == index) {
        if (!list8[i].select) {
          list8[i].select = true;
        } else {
          list8[i].select = false;
          cannel = true;
        }

      } else {
        list8[i].select = false;
      }
    }
    let updateData = null;

    if (cannel) {
      updateData = {
        weak: ''
      }
    } else {
      if (index == 0) {

        $Toast({
          content: '不乏力',
          mask: false,
          duration: 0.5
        });

        updateData = {
          weak: '01'
        }
      } else if (index == 1) {
        $Toast({
          content: '轻微乏力',
          mask: false,
          duration: 0.5
        });
        updateData = {
          weak: '02'
        }
      } else if (index == 2) {
        $Toast({
          content: '非常乏力',
          mask: false,
          duration: 0.5
        });
        updateData = {
          weak: '03'
        }
      }
    }
    this.setData({
      weak: list8
    })
    this.updateStatus(updateData)
  },


  rili: function(e) {
    let cmonth;
    const {
      year,
      month,
      list,
      dateArr
    } = this.data;
    if (month < 10) {
      cmonth = '0' + month
    }
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
    } else {
      this.data.bossShow = false;
    }
    this.setData({
      selectDay: sday.format('YYYY-MM-DD'),
      dateArr: dateArr,
      bossShow: this.data.bossShow
    })

    this.initRecord(dates);

  },
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
      } = res;

      if (code === 500) {
        wx.switchTab({
          url: '/pages/home/home',
        })
        return;
      }
      app.globalData.bodyStatus = list;
      const {
        lyear,
        lmonth
      } = this.data;
      this.setData({
        isShow: true,
        bodyStatus: list
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
          anmo
        } = this.data;
        if (chiropractic === '01') {
          anmo[0].select = true;
        } else {
          anmo[0].select = false;
        }
        if (frictionalAbdomen === '01') {
          anmo[1].select = true;
        } else {
          anmo[1].select = false;
        }

        //初始化月经量
        const menstrualVolumes = this.data.menstrualVolume;
        if (menstrualVolume) {
          let index = 0;
          if (menstrualVolume === '01') {
            index = 0
          } else if (menstrualVolume === '02') {
            index = 1
          } else {
            index = 2
          }

          for (let o = 0; o < menstrualVolumes.length; o++) {
            if (o == index) {
              menstrualVolumes[o].select = true;
            } else {
              menstrualVolumes[o].select = false;
            }

          }
          //menstrualVolumes[index].select = true;
        } else {
          for (let o = 0; o < menstrualVolumes.length; o++) {
            menstrualVolumes[o].select = false;
          }
        }


        //初始化白带
        const leucorrheas = this.data.leucorrheas;
        if (leucorrhea) {
          let index = 0;
          if (leucorrhea === '01') {
            index = 0
          } else if (leucorrhea === '02') {
            index = 1
          } else {
            index = 2
          }

          for (let o = 0; o < leucorrheas.length; o++) {
            if (o == index) {
              leucorrheas[o].select = true;
            } else {
              leucorrheas[o].select = false;
            }
          }

        } else {
          for (let o = 0; o < leucorrheas.length; o++) {

            leucorrheas[o].select = false;

          }
        }

        //初始化乳房胀痛
        const breastTendernesss = this.data.breastTenderness;
        if (breastTenderness) {
          let index = 0;
          if (breastTenderness === '01') {
            index = 0
          } else if (breastTenderness === '02') {
            index = 1
          } else if (breastTenderness === '03') {
            index = 2
          } else if (breastTenderness === '04') {
            index = 3
          }
          for (let o = 0; o < breastTendernesss.length; o++) {
            if (o == index) {
              breastTendernesss[o].select = true;
            } else {
              breastTendernesss[o].select = false;
            }
          }
        } else {
          for (let o = 0; o < breastTendernesss.length; o++) {

            breastTendernesss[o].select = false;

          }
        }


        //初始化小腹痛
        const abdominalPains = this.data.abdominalPain;
        if (abdominalPain) {
          let index = 0;
          if (abdominalPain === '01') {
            index = 0
          } else if (abdominalPain === '02') {
            index = 1
          } else if (abdominalPain === '03') {
            index = 2
          } else if (abdominalPain === '04') {
            index = 3
          }
          for (let o = 0; o < abdominalPains.length; o++) {
            if (o == index) {
              abdominalPains[o].select = true;
            } else {
              abdominalPains[o].select = false;
            }
          }
        } else {
          for (let o = 0; o < abdominalPains.length; o++) {
            abdominalPains[o].select = false;
          }
        }

        //初始化心情
        const moods = this.data.mood;
        if (mood) {
          let index = 0;
          if (mood === '01') {
            index = 0
          } else if (mood === '02') {
            index = 1
          } else if (mood === '03') {
            index = 2
          } else if (mood === '04') {
            index = 3
          }
          for (let o = 0; o < moods.length; o++) {
            if (o == index) {
              moods[o].select = true;
            } else {
              moods[o].select = false;
            }
          }
        } else {
          for (let o = 0; o < moods.length; o++) {
            moods[o].select = false;

          }
        }

        //初始化经期疼痛
        const menstrualHeadaches = this.data.menstrualHeadache;
        if (menstrualHeadache) {
          let index = 0;
          if (menstrualHeadache === '01') {
            index = 0
          } else if (menstrualHeadache === '02') {
            index = 1
          } else if (menstrualHeadache === '03') {
            index = 2
          } else if (menstrualHeadache === '04') {
            index = 3
          }
          for (let o = 0; o < menstrualHeadaches.length; o++) {
            if (o == index) {
              menstrualHeadaches[o].select = true;
            } else {
              menstrualHeadaches[o].select = false;
            }
          }
        } else {
          for (let o = 0; o < menstrualHeadaches.length; o++) {
            menstrualHeadaches[o].select = false;
          }
        }

        //初始化怕冷
        const fearColds = this.data.fearCold;
        if (fearCold) {
          let index = 0;
          if (fearCold === '01') {
            index = 0
          } else if (fearCold === '02') {
            index = 1
          } else if (fearCold === '03') {
            index = 2
          } else if (fearCold === '04') {
            index = 3
          }
          for (let o = 0; o < fearColds.length; o++) {
            if (o == index) {
              fearColds[o].select = true;
            } else {
              fearColds[o].select = false;
            }
          }
        } else {
          for (let o = 0; o < fearColds.length; o++) {

            fearColds[o].select = false;

          }
        }

        //初始化乏力
        const weaks = this.data.weak;
        if (weak) {
          let index = 0;
          if (weak === '01') {
            index = 0
          } else if (weak === '02') {
            index = 1
          } else if (weak === '03') {
            index = 2
          } else if (weak === '04') {
            index = 3
          }
          for (let o = 0; o < weaks.length; o++) {
            if (o == index) {
              weaks[o].select = true;
            } else {
              weaks[o].select = false;
            }
          }
        } else {
          for (let o = 0; o < weaks.length; o++) {

            weaks[o].select = false;

          }
        }
        const {
          dateArr
        } = this.data;
        //初始化选中
        const cday = moment(day).format('YYYYMD');
        for (let i = 0; i < dateArr.length; i++) {
          const obj = dateArr[i];

          if (cday == obj.today) {
            obj.isSelect = true;
          } else {
            obj.isSelect = false;
          }
        }
        this.setData({
          dateArr,
          weak: weaks,
          fearCold: fearColds,
          mood: moods,
          menstrualHeadache: menstrualHeadaches,
          abdominalPain: abdominalPains,
          breastTenderness: breastTendernesss,
          leucorrheas,
          menstrualVolume: menstrualVolumes,
          anmo,
          currentDay: dy
        })
      }
    }
    // 如果没有数据
    if (!isdy) {
      this.setData({
        currentDay: {
          menstrualStatus: '02'
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
    console.log('-----init----', fmdate, this.data.year, this.data.month)

    const list = this.data.cacheMonths[fmdate] || this.data.bodyStatus || [];
    for (let i = 0; i < arrLen; i++) {

      if (i >= startWeek) {
        num = i - startWeek + 1;
        let css
        let tag = records['kongbai']
        for (let i = 0; i < list.length; i++) {
          const dy = list[i];
          const {
            day,
            isPredict,
            physiologicalCycle
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
    const currentMonthString = `${this.data.year}-${this.data.month}`;
    this.cacheDatas(currentMonthString);
  },

  nextMonth: function() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    //超过2月不请求

    const maxMonth = moment().add(1, 'months');

    const currentMonthString = `${this.data.year}-${this.data.month}`;
    const currentMonth = moment(currentMonthString)
    if (!currentMonth.isBefore(maxMonth)) {
      return;
    }

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

  }, // 更新身体信息
  updateStatus(data) {
    const day = this.data.selectDay;
    const cday = moment(day).format('YYYY-MM-D')
    userInfoUpdateBodyStatus({
      day,
      ...data
    }).then(res => {
      //更新成功
      this.query(this.data.startDay, this.data.endDay, day);
    })
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

      console.log(disX);
      if (disX > 90) {
        const {
          year,
          month
        } = this.data;
        const maxMonth = moment().add(1, 'months');
        console.log('00000----', maxMonth.format('YYYY-MM'))
        const currentMonth = moment(`${year}-${month}`)
        if (currentMonth.isBefore(maxMonth)) {
          that.nextMonth()
        }

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

    console.log(next, pre)
    return [next, pre]
  }
})