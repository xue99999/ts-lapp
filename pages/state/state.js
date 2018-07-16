const app = getApp()
const {
  userInfoUpdateBodyStatus
} = require('../../service/user.js')
var Http = require('../../utils/http.js');
const { auth } = require('../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDay: {},
    // 按摩
    anmo: [{
        name: '捏脊',
        code: 'frictionalAbdomen',
        select: false,
        imgUrl: '../img/nieji-@3x.png',
        curUrl: '../img/nieji@3x.png',
      },
      {
        code: 'chiropractic',
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
          wx.showToast({
            title: list1[i].name,
            icon: 'none',
            duration: 500
          })
        }
      }
    }
    let updateData = {};
    console.log(selectTag);
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
  chooseImg2: function(e) {
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
  chooseImg3: function(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.breastTenderness;
    for (let i = 0; i < list.length; i++) {
      if (i == index) {
        list[i].select = true;
      } else {
        list[i].select = false;
      }
    }

    let updateData=null;
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
  chooseImg4: function(e) {
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
  chooseImg5: function(e) {
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
        mood: '01'
      }
    } else if (index == 1) {
      wx.showToast({
        title: '烦躁易怒',
        icon: 'none',
        duration: 500
      })
      updateData = {
        mood: '02'
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
  chooseImg7: function(e) {
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
  chooseImg8: function(e) {
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

    this.updateStatus(updateData)
    this.setData({
      weak: list8
    })


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
      console.log('更新身体状态接口', res);
      const { code, integral}=res;
      if (code===200){
        if (integral && integral>0){
          wx.showToast({
            title: `积分+${integral}`,
            icon: 'none',
            duration: 1000,
          })
        }
      }
      // this.setData({
      //   list: res.list
      // })
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const parmas = {
      tag: 'switch'
    }
    auth(parmas)
    console.log(options)
    const {
      day
    } = options;
    const list = app.globalData.bodyStatus;
    for (let i = 0; i < list.length; i++) {
      const dy = list[i];
      if (dy.day === day) {
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
          chiropractic,
          frictionalAbdomen
        } = dy;
        const {
          anmo
        } = this.data;
        if (chiropractic === '01') {
          anmo[0].select = true;
        }
        if (frictionalAbdomen === '01') {
          anmo[1].select = true;
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

          menstrualVolumes[index].select = true;
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

          leucorrheas[index].select = true;
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

          breastTendernesss[index].select = true;
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

          abdominalPains[index].select = true;
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

          moods[index].select = true;
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

          menstrualHeadaches[index].select = true;
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

          fearColds[index].select = true;
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

          weaks[index].select = true;
        }


        this.setData({
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

})