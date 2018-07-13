//index.js
//获取应用实例
const app = getApp()
const moment = require('../../utils/moment.js');
const { userInfoQueryBodyStatus } = require('../../service/user.js')
 var Http = require('../../utils/http.js');
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    currentDay:{}, //当前选中数据
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',
    curIdx: null,
    physiologicalCycle:null,
    // 按摩
    anmo: [{
      name: '捏脊',
      code: 'frictionalAbdomen',
      select: false,
      imgUrl: '../img/belly@3x.png',
      curUrl: '../img/矢量智能对象@3x.png',
    },
    {
      code: 'chiropractic',
      name: '摩腹',
      select: false,
      imgUrl: '../img/belly@3x.png',
      curUrl: '../img/矢量智能对象拷贝2@3x.png',
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
  chooseImg: function (e) {
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
          wx.showToast({
            title: list1[i].name,
            icon: 'none',
            duration: 500
          })
        }
      }
    }
    let updateData = {};
    if (index === 0) {
      updateData = {
        frictionalAbdomen: selectTag ? "01" : "02"
      }
    } else {
      updateData = {
        chiropractic: selectTag ? "01" : "02"
      }
    }

    this.updateStatus(updateData)

    this.setData({
      anmo: list1
    })

  },
  // 来了
  switchChange: function (e) {
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
  chooseImg1: function (e) {
    const index = e.currentTarget.dataset.index;

    const list1 = this.data.menstrualVolume;

    for (let i = 0; i < list1.length; i++) {
      if (i == index) {
        list1[i].select = true;
      } else {
        list1[i].select = false;
      }
    }
    console.log(list1);

    this.setData({
      menstrualVolume: list1
    })
    let updateData = {}
    if (index == 0) {
      wx.showToast({
        title: '月经量偏少',
        icon: 'none',
        duration: 500
      })
      updateData = {
        menstrualVolume: "01"
      }
    } else if (index == 1) {
      wx.showToast({
        title: '月经量正常',
        icon: 'none',
        duration: 500
      })
      updateData = {
        menstrualVolume: "02"
      }
    } else if (index == 2) {
      wx.showToast({
        title: '月经量很多',
        icon: 'none',
        duration: 500
      })

      updateData = {
        menstrualVolume: "03"
      }
    } else {
      updateData = {
        menstrualVolume: "04"
      }
    }

    this.updateStatus(updateData)

  },
  // 点击白带
  chooseImg2: function (e) {
    const index = e.currentTarget.dataset.index;

    const list = this.data.leucorrheas;

    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }
    this.setData({
      leucorrheas: list
    })

    let updateData = {}
    if (index == 0) {
      wx.showToast({
        title: '多',
        icon: 'none',
        duration: 500
      })
      updateData = {
        leucorrhea: "01"
      }
    } else if (index == 1) {
      wx.showToast({
        title: '中',
        icon: 'none',
        duration: 500
      })
      updateData = {
        leucorrhea: "02"
      }
    } else if (index == 2) {
      wx.showToast({
        title: '少',
        icon: 'none',
        duration: 500
      })

      updateData = {
        leucorrhea: "03"
      }
    }
    this.updateStatus(updateData)



  },
  // 点击乳房胀痛
  chooseImg3: function (e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.breastTenderness;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }

    let updateData = null;
    if (index == 0) {
      wx.showToast({
        title: '基本不痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        breastTenderness: "01"
      }
    } else if (index == 1) {
      wx.showToast({
        title: '轻微痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        breastTenderness: "02"
      }
    } else if (index == 2) {
      wx.showToast({
        title: '非常痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        breastTenderness: "03"
      }
    } else {
      wx.showToast({
        title: '无',
        icon: 'none',
        duration: 500
      })
      updateData = {
        breastTenderness: "04"
      }
    }
    this.setData({
      breastTenderness: list
    })

    this.updateStatus(updateData)
  },
  // 点击小腹痛
  chooseImg4: function (e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.abdominalPain;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }
    let updateData = {}
    if (index == 0) {
      wx.showToast({
        title: '基本不痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        abdominalPain: '01'
      }
    } else if (index == 1) {
      wx.showToast({
        title: '轻微痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        abdominalPain: '02'
      }
    } else if (index == 2) {
      wx.showToast({
        title: '非常痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        abdominalPain: '03'
      }
    } else {
      wx.showToast({
        title: '无疼痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        abdominalPain: '04'
      }
    }
    this.setData({
      abdominalPain: list
    })
    this.updateStatus(updateData)
  },
  // 心情
  chooseImg5: function (e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.mood;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }
    let updateData = {}
    if (index == 0) {
      wx.showToast({
        title: '情绪平稳',
        icon: 'none',
        duration: 500
      })
      updateData = {
        mood: '02'
      }
    } else if (index == 1) {
      wx.showToast({
        title: '烦躁易怒',
        icon: 'none',
        duration: 500
      })
      updateData = {
        mood: '01'
      }
    }
    this.setData({
      mood: list
    })

    this.updateStatus(updateData)
  },
  // 经期头痛
  chooseImg6: function (e) {
    const index = e.currentTarget.dataset.index;

    const list = this.data.menstrualHeadache;

    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }
    this.setData({
      menstrualHeadache: list
    })
    let updateData = {}
    if (index == 0) {
      wx.showToast({
        title: '痛',
        icon: 'none',
        duration: 500
      })
      updateData = {
        menstrualHeadache: '01'
      }
    } else if (index == 1) {
      wx.showToast({
        title: '一般',
        icon: 'none',
        duration: 500
      })
      updateData = {
        menstrualHeadache: '02'
      }
    } else if (index == 2) {
      wx.showToast({
        title: '不痛 ',
        icon: 'none',
        duration: 500
      })
      updateData = {
        menstrualHeadache: '03'
      }
    }

    this.updateStatus(updateData)
  },
  // 怕冷
  chooseImg7: function (e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.fearCold;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }

    let updateData = null;
    if (index == 0) {
      wx.showToast({
        title: '明显',
        icon: 'none',
        duration: 500
      })
      updateData = {
        fearCold: '01'
      }
    } else if (index == 1) {
      wx.showToast({
        title: '一般',
        icon: 'none',
        duration: 500
      })
      updateData = {
        fearCold: '02'
      }
    } else if (index == 2) {
      wx.showToast({
        title: '微微',
        icon: 'none',
        duration: 500
      })
      updateData = {
        fearCold: '03'
      }
    } else if (index === 3) {
      wx.showToast({
        title: '不怕冷',
        icon: 'none',
        duration: 500
      })
      updateData = {
        fearCold: '04'
      }
    }
    this.setData({
      fearCold: list
    })

    this.updateStatus(updateData)
  },
  // 乏力
  chooseImg8: function (e) {
    const index = e.currentTarget.dataset.index;

    const list8 = this.data.weak;
    for (let i = 0; i < list8.length; i++) {
      if (i == index) {
        list8[i].select = true;
      } else {
        list8[i].select = false;
      }
    }
    let updateData = null;
    if (index == 0) {
      wx.showToast({
        title: '明显',
        icon: 'none',
        duration: 500
      })
      updateData = {
        weak: '01'
      }
    } else if (index == 1) {
      wx.showToast({
        title: '一般',
        icon: 'none',
        duration: 500
      })
      updateData = {
        weak: '02'
      }
    } else if (index == 2) {
      wx.showToast({
        title: '微微',
        icon: 'none',
        duration: 500
      })
      updateData = {
        weak: '03'
      }
    } else if (index === 3) {
      wx.showToast({
        title: '不乏力',
        icon: 'none',
        duration: 500
      })
      updateData = {
        weak: '04'
      }
    }
    this.setData({
      weak: list8
    })
      this.updateStatus(updateData)
  },


  rili: function (e) {
    // console.log(e.currentTarget.dataset.day)
    // console.log(this.data.month)
    // console.log(this.data.year)
    let cmonth;
    const { year, month, list } = this.data;
    if (month < 10) {
      cmonth = '0' + month
    }
    var day;
   
    day = e.currentTarget.dataset.day
   
    var dates = year + "-" + cmonth + "-" + day;
    console.log('日期', dates);


    for (let i = 0; i < list.length;i++){
      const dd=list[i]
      if(dd.day===dates){
        this.setData({
          currentDay:dd
        })
        break;
      }
    }

  },
  onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
    console.log(this.data.isToday)
    
  

  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

      var data = {
        startDay:'2018-07-01',
        endDay:'2018-07-31'

      }
    //   userInfoQueryBodyStatus(data).then(res => {
    //   console.log('查询身体状态接口', res);
    //  const {list}= res;
    //  const rlist=[];
    //  let currentDay={}
    //   for (let i = 0; i < list.length;i++){
    //      const data=list[i]
    //       if (i.physiologicalCycle == '01'){
    //         console.log(physiologicalCycle)
    //       }

    //       if(data.day===moment().format('YYYY-MM-D')){
    //         console.log(data.day)
    //         currentDay = data;
    //       }
    //       rlist.push(data);
    //   }

    //   this.setData({
    //     currentDay,
    //     list: rlist
    //   })
    //   console.log(rlist)
    // })




  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
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
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  }
})
