// component/record/index.js
const {
  $Toast
} = require('../base/index');

const {
  userInfoUpdateBodyStatus
} = require('../../service/user.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentDay: {
      type: Object,
      value: false
    },
    //是否显示日历,默认不显示
    show: {
      type: Boolean,
      value: false,
    },
  },
  //组件移除时
  detached:function(){
      console.log('remove')
  },
  ready: function() {
    console.log('ready', this.data.currentDay, this.data.onChange)

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
        console.log('=====', o, index)
        if (o == index) {
          menstrualVolumes[o].select = true;
        } else {
          menstrualVolumes[o].select = false;
        }

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

      for (let o = 0; o < leucorrheas.length; o++) {
        if (o == index) {
          leucorrheas[o].select = true;
        } else {
          leucorrheas[o].select = false;
        }
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
      anmo
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 按摩
    anmo: [{
        name: '捏脊',
        code: 'frictionalAbdomen',
        select: false,
        imgUrl: '/pages/img/nieji-@3x.png',
        curUrl: '/pages/img/nieji@3x.png',
      },
      {
        code: 'chiropractic',
        name: '摩腹',
        select: false,
        imgUrl: '/pages/img/mofu@3x.png',
        curUrl: '/pages/img/mofu-@3x.png',
      }
    ],
    // 月经量
    menstrualVolume: [{
        name: '月经量偏少',
        imgUrl: '/pages/img/menstruation/1menstruation@3x.png',
        curUrl: '/pages/img/menstruation/1menstruation-1@3x.png',
        select: false
      },
      {
        name: '月经量正常',
        imgUrl: '/pages/img/menstruation/2menstruation@3x.png',
        curUrl: '/pages/img/menstruation/2menstruation-2@3x.png',
        select: false,
      },
      {
        name: '月经量很多',
        imgUrl: '/pages/img/menstruation/3menstruation@3x.png',
        curUrl: '/pages/img/menstruation/3menstruation-3@3x.png',
        select: false,
      }
    ],
    // 白带
    leucorrheas: [{
        imgUrl: '/pages/img/leucorrhea/1leucorrhea@3x.png',
        curUrl: '/pages/img/leucorrhea/1leucorrhea-1@3x.png',
      },
      {
        imgUrl: '/pages/img/leucorrhea/2leucorrhea@3x.png',
        curUrl: '/pages/img/leucorrhea/2leucorrhea-2@3x.png',
      },
      {
        imgUrl: '/pages/img/leucorrhea/3leucorrhea@3x.png',
        curUrl: '/pages/img/leucorrhea/3leucorrhea-3@3x.png',
      }
    ],
    // 乳房胀痛
    breastTenderness: [{
        select: false,
        name: '基本不痛',
        imgUrl: '/pages/img/pain/1pain@3x.png',
        curUrl: '/pages/img/pain/1pain-1@3x.png',

      },
      {
        select: false,
        name: '轻微痛',
        imgUrl: '/pages/img/pain/2pain@3x.png',
        curUrl: '/pages/img/pain/2pain-1@3x.png',
      },
      {
        select: false,
        name: '非常痛',
        imgUrl: '/pages/img/pain/3pain@3x.png',
        curUrl: '/pages/img/pain/3pain-@3x.png',
      }
    ],
    // 小腹痛
    abdominalPain: [{
        select: false,
        name: '基本不痛',
        imgUrl: '/pages/img/pain/1pain@3x.png',
        curUrl: '/pages/img/pain/1pain-1@3x.png',

      },
      {
        select: false,
        name: '轻微痛',
        imgUrl: '/pages/img/pain/2pain@3x.png',
        curUrl: '/pages/img/pain/2pain-1@3x.png',
      },
      {
        select: false,
        name: '非常痛',
        imgUrl: '/pages/img/pain/3pain@3x.png',
        curUrl: '/pages/img/pain/3pain-@3x.png',
      }
    ],
    // 心情
    mood: [{
        name: '情绪稳定',
        imgUrl: '/pages/img/mood/2mood@3x.png',
        curUrl: '/pages/img/mood/2mood-2@3x.png',
        select: false,
      },
      {
        name: '烦躁易怒',
        imgUrl: '/pages/img/mood/anger@3x.png',
        curUrl: '/pages/img/mood/anger-1@3x.png',

        select: false,
      },
      {
        name: '情绪低落',
        imgUrl: '/pages/img/mood/3mood@3x.png',
        curUrl: '/pages/img/mood/3mood-3@3x.png',
        select: false,
      }
    ],
    // 经常头痛
    menstrualHeadache: [{
        select: false,
        name: '基本不痛',
        imgUrl: '/pages/img/pain/1pain@3x.png',
        curUrl: '/pages/img/pain/1pain-1@3x.png',

      },
      {
        select: false,
        name: '轻微痛',
        imgUrl: '/pages/img/pain/2pain@3x.png',
        curUrl: '/pages/img/pain/2pain-1@3x.png',
      },
      {
        select: false,
        name: '非常痛',
        imgUrl: '/pages/img/pain/3pain@3x.png',
        curUrl: '/pages/img/pain/3pain-@3x.png',
      }
    ],
    //怕冷
    fearCold: [{
        select: false,
        name: '不怕',
        imgUrl: '/pages/img/cold/1cold@3x.png',
        curUrl: '/pages/img/cold/1cold-1@3x.png',

      },
      {
        select: false,
        name: '微微',
        imgUrl: '/pages/img/cold/2cold@3x.png',
        curUrl: '/pages/img/cold/2cold-2@3x.png',
      },
      {
        select: false,
        name: '好冷',
        imgUrl: '/pages/img/cold/3cold@3x.png',
        curUrl: '/pages/img/cold/3cold-3@3x.png',
      }
    ],
    //乏力
    weak: [{
        select: false,
        name: '不乏力',
        imgUrl: '/pages/img/weak/1weak@3x.png',
        curUrl: '/pages/img/weak/1weak-1@3x.png',
        id: '01'
      },
      {
        select: false,
        name: '轻微',
        imgUrl: '/pages/img/weak/2weak@3x.png',
        curUrl: '/pages/img/weak/2weak-2@3x.png',
        id: "02"
      },
      {
        select: false,
        name: '非常乏力',
        imgUrl: '/pages/img/weak/3weak@3x.png',
        curUrl: '/pages/img/weak/3weak-3@3x.png',
        id: "03"
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //按摩
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
      } else {
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


        
        this.triggerEvent('myevent', { ...res
        }, {
          bubbles: false,
          composed: true
        })

      })
    },
    tchange: function() {
      console.log('r tchange')
    }
  }
})