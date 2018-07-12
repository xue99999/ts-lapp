const app = getApp()
const { userInfoUpdateBodyStatus } = require('../../service/user.js')
var Http = require('../../utils/http.js');


var weak;
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    leucorrheas: [
      {
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
    breastTenderness: [
      {
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
    abdominalPain: [
      {
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
    mood: [
      {
        name: '超开心',
        imgUrl: '../img/mood/1mood@3x.png',
        curUrl: '../img/mood/1mood-1@3x.png',
        select: false,
      },
      {
        name: '一般',
        imgUrl: '../img/mood/2mood@3x.png',
        curUrl: '../img/mood/2mood-2@3x.png',
        select: false,
      },
      {
        name: '好伤心',
        imgUrl: '../img/mood/3mood@3x.png',
        curUrl: '../img/mood/3mood-3@3x.png',
        select: false,
      }
    ],
    // 经常头痛
    menstrualHeadache: [
      {
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
    fearCold: [
      {
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
    weak: [
      {
        select: false,
        name: '不乏力',
        imgUrl: '../img/weak/1weak@3x.png',
        curUrl: '../img/weak/1weak-1@3x.png',
        id:'01'
      },
      {
        select: false,
        name: '轻微',
        imgUrl: '../img/weak/2weak@3x.png',
        curUrl: '../img/weak/2weak-2@3x.png',
        id:"02"
      },
      {
        select: false,
        name: '非常乏力',
        imgUrl: '../img/weak/3weak@3x.png',
        curUrl: '../img/weak/3weak-3@3x.png',
        id:"03"
      }
    ],
  },

  chooseImg: function (e) {
    const index = e.currentTarget.dataset.index;

    const list1 = this.data.anmo;

    for (let i = 0; i < list1.length; i++) {
      if (i == index) {
        list1[i].select = true;
      } else {
        list1[i].select = false;
      }
    }
    console.log(list1);

    this.setData({
      anmo: list1
    })

    if (index == 0) {
      wx.showToast({
        title: '按摩',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 1) {
      wx.showToast({
        title: '正常',
        icon: 'none',
        duration: 1000
      })
    }

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

    if (index == 0) {
      wx.showToast({
        title: '月经量偏少',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 1) {
      wx.showToast({
        title: '月经量正常',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 2) {
      wx.showToast({
        title: '月经量很多',
        icon: 'none',
        duration: 1000
      })
    }

  },
  // 点击白带
  chooseImg2: function (e) {
    console.log(e)
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
    if (index == 0) {
      wx.showToast({
        title: '基本不痛',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 1) {
      wx.showToast({
        title: '轻微痛',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 2) {
      wx.showToast({
        title: '非常痛',
        icon: 'none',
        duration: 1000
      })
    }
    this.setData({
      breastTenderness: list
    })
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
    if (index == 0) {
      wx.showToast({
        title: '基本不痛',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 1) {
      wx.showToast({
        title: '轻微痛',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 2) {
      wx.showToast({
        title: '非常痛',
        icon: 'none',
        duration: 1000
      })
    }
    this.setData({
      abdominalPain: list
    })
    console.log()
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
    if (index == 0) {
      wx.showToast({
        title: '超开心',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 1) {
      wx.showToast({
        title: '一般',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 2) {
      wx.showToast({
        title: '好伤心',
        icon: 'none',
        duration: 1000
      })
    }
    this.setData({
      mood: list
    })
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
    if (index == 0) {
      wx.showToast({
        title: '不怕冷',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 1) {
      wx.showToast({
        title: '微微冷',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 2) {
      wx.showToast({
        title: '很冷',
        icon: 'none',
        duration: 1000
      })
    }
    this.setData({
      fearCold: list
    })
  },
  // 乏力
  chooseImg8: function (e) {
    const index = e.currentTarget.dataset.index;
    const zhi = e.currentTarget.dataset.zhi;
    const list8 = this.data.weak;
    for (let i = 0; i < list8.length; i++) {
      if (i == index) {
        list8[i].select = true;
        weak = zhi;
      //   app.globalData.weak=zhi;
      //   console.log(app.globalData.weak)
      // console.log(e)
      } else {
        list8[i].select = false;
      }
    }
    if (index == 0) {
      wx.showToast({
        title: '不乏力',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 1) {
      wx.showToast({
        title: '轻微',
        icon: 'none',
        duration: 1000
      })
    }
    else if (index == 2) {
      wx.showToast({
        title: '非常乏力',
        icon: 'none',
        duration: 1000
      })
    }
    this.setData({
      weak: list8
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var data = {
      day: null,
      // chiropractic: chiropractic,
      // frictionalAbdomen: frictionalAbdomen,
      // menstrualStatus: menstrualStatus,
      // menstrualVolume: menstrualVolume,
      // leucorrhea: leucorrhea,
      // breastTenderness: breastTenderness,
      // abdominalPain: abdominalPain,
      // mood: mood,
      // menstrualHeadache: menstrualHeadache,
      // fearCold: fearCold,
      weak: weak
    }
    userInfoUpdateBodyStatus(data).then(res => {
      console.log('更新身体状态接口', res);
      // this.setData({
      //   list: res.list
      // })
    })
  },
//页面消失的时候请求数据
  onUnload:function(){

  }
 

})