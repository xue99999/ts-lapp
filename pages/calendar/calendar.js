//index.js
//获取应用实例
const app = getApp()
const { userInfoUpdateBodyStatus } = require('../../service/user.js')
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
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',
    curIdx: null,
    
    anmo: [
      {
        imgUrl: '../img/belly@3x.png',
        curUrl: '../img/Knead back@3x.png',
      },
      {
        imgUrl: '../img/belly@3x.png',
        curUrl: '../img/Knead back@3x.png',
      }
    ],
    // 月经量
    menstrualVolume: [
      {
        name: '月经量偏少',
        imgUrl: '../img/menstruation2-weak@3x.png',
        curUrl: '../img/menstruation2-more@3x.png',
        select: false
      },
      {
        name: '月经量正常',
        imgUrl: '../img/menstruation2-centre@3x.png',
        curUrl: '../img/menstruation2-more@3x.png',
        select: false,
      },
      {
        name: '月经量很多',
        imgUrl: '../img/menstruation2-centre@3x.png',
        curUrl: '../img/menstruation2-more@3x.png',
        select: false,
      }
    ],
    // 白带
    leucorrheas: [ 
      {


        imgUrl: '../img/leucorrhea-centre.png',
        curUrl: '../img/leucorrhea-weak.png',

      },
      {

        imgUrl: '../img/leucorrhea-centre.png',
        curUrl: '../img/leucorrhea-weak.png',
      },
      {

        imgUrl: '../img/leucorrhea-more@3x.png',
        curUrl: '../img/leucorrhea-weak.png',

      }
    ],
    // 乳房胀痛
    breastTenderness: [
      {
        imgUrl: '../img/centre@3x.png',
        curUrl: '../img/weak.png',

      },
      {
        imgUrl: '../img/centre@3x.png',
        curUrl: '../img/weak.png',
      },
      {
        imgUrl: '../img/more@3x.png',
        curUrl: '../img/weak.png',
      }
    ],
    // 小腹痛
    abdominalPains: [
      {
        imgUrl: '../img/centre@3x.png',
        curUrl: '../img/weak.png',

      },
      {
        imgUrl: '../img/centre@3x.png',
        curUrl: '../img/weak.png',
      },
      {
        imgUrl: '../img/more@3x.png',
        curUrl: '../img/weak.png',
      }
    ],
    // 心情
    moods: [
      {
        imgUrl: '../img/general@3x.png',
        curUrl: '../img/happy@3x.png',

      },
      {
        imgUrl: '../img/general@3x.png',
        curUrl: '../img/happy@3x.png',
      },
      {
        imgUrl: '../img/unhappy@3x.png',
        curUrl: '../img/happy@3x.png',
      }
    ],
    // 经常头痛
    menstrualHeadaches: [
      {
        imgUrl: '../img/centre@3x.png',
        curUrl: '../img/weak.png',

      },
      {
        imgUrl: '../img/centre@3x.png',
        curUrl: '../img/weak.png',
      },
      {
        imgUrl: '../img/more@3x.png',
        curUrl: '../img/weak.png',
      }
    ],
    //怕冷
    fearColds: [  
      {
        imgUrl: '../img/cold-centres@3x.png',
        curUrl: '../img/cold-weak@3x.png',

      },
      {
        imgUrl: '../img/cold-centres@3x.png',
        curUrl: '../img/cold-weak@3x.png',
      },
      {
        imgUrl: '../img/cold-more@3x.png',
        curUrl: '../img/cold-weak@3x.png',
      }
    ],
    //乏力
    weaks: [  
      {
        imgUrl: '../img/tired-weak@3x.png',
        curUrl: '../img/tired-more@3x.png',

      },
      {
        imgUrl: '../img/tired-centre@3x.png',
        curUrl: '../img/tired-more@3x.png',
      },
      {
        imgUrl: '../img/tired-centre@3x.png',
        curUrl: '../img/tired-more@3x.png',
      }
    ],
  },
  chooseImg1: function (e) {
    const index=e.currentTarget.dataset.index;

    const list = this.data.leucorrheas;

    for(let i=0;i<list.length;i++){
      if (i == index){
        list[i].select=true;
      }else{
        list[i].select=false;
      }
    }

    console.log(list);

    this.setData({
      leucorrheas: list
    })

     if (this.data.curIdx==0){
       wx.showToast({
         title: '月经量偏少',
         icon: 'none',
         duration: 1000
       }) 
     }
     else if (this.data.curIdx ==1){
       wx.showToast({
         title: '月经量正常',
         icon: 'none',
         duration: 1000
       }) 
     }
     else if (this.data.curIdx == 2){
       wx.showToast({
         title: '月经量很多',
         icon: 'none',
         duration: 1000
       })       
     }

  },
  chooseImg2: function (e) {
    console.log(e)
    const index = e.currentTarget.dataset.index;

    const list = this.data.breastTenderness;

    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }
    this.setData({
      breastTenderness: list
    })


  },
  chooseImg3: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
    console.log(this.data.curIdx)
    if (this.data.curIdx == 0) {
      wx.showToast({
        title: '基本不痛',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 1) {
      wx.showToast({
        title: '轻微痛',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 2) {
      wx.showToast({
        title: '非常痛',
        icon: 'none',
        duration: 1000
      })
    }

  },
  chooseImg4: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
    console.log(this.data.curIdx)
    if (this.data.curIdx == 0) {
      wx.showToast({
        title: '月经量偏少',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 1) {
      wx.showToast({
        title: '月经量正常',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 2) {
      wx.showToast({
        title: '月经量很多',
        duration: 1000
      })
    }

  },
  chooseImg5: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
    console.log(this.data.curIdx)
    if (this.data.curIdx == 0) {
      wx.showToast({
        title: '超开心的',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 1) {
      wx.showToast({
        title: '心情一般',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 2) {
      wx.showToast({
        title: '好伤心',
        icon: 'none',
        duration: 1000
      })
    }

  },
  chooseImg6: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
    console.log(this.data.curIdx)
    if (this.data.curIdx == 0) {
      wx.showToast({
        title: '月经量偏少',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 1) {
      wx.showToast({
        title: '月经量正常',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 2) {
      wx.showToast({
        title: '月经量很多',
        icon: 'none',
        duration: 1000
      })
    }

  },
  chooseImg7: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
    console.log(this.data.curIdx)
    if (this.data.curIdx == 0) {
      wx.showToast({
        title: '不怕冷',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 1) {
      wx.showToast({
        title: '微微冷',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 2) {
      wx.showToast({
        title: '很冷',
        icon: 'none',
        duration: 1000
      })
    }

  },
  chooseImg8: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
    console.log(this.data.curIdx)
    if (this.data.curIdx == 0) {
      wx.showToast({
        title: '不乏力',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 1) {
      wx.showToast({
        title: '轻微乏力',
        icon: 'none',
        duration: 1000
      })
    }
    else if (this.data.curIdx == 2) {
      wx.showToast({
        title: '非常乏力',
        icon: 'none',
        duration: 1000
      })
    }

  },


  dianji: function (e) {
    // console.log(this.data.dateArr)
    console.log(e.currentTarget.dataset)
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
    
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //   var data = {
    //  startDay： '2018-06-01'，
        // endDay: '2018-07-02

    // }
    //   userInfoQueryBodyStatus(data).then(res => {
    //   console.log('查询身体状态接口', res);
    //   // this.setData({
    //   //   list: res.list
    //   // })
    // })


    //   var data = {
    //  queryMonth: -1

    // }
    //   userInfoQueryCalendar(data).then(res => {
    //   console.log('日历查询', res);
    //   // this.setData({
    //   //   list: res.list
    //   // })
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
