// pages/components/foot-components.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    listInfo: [
      // {
      //   imgUrl: '../../img/choose1@3x.png',
      //   curUrl: '../../img/choose@3x.png',
      // },
      {
        imgUrl: '../img/choose1@3x.png',
        curUrl: '../img/choose@3x.png',
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navto: function () {
      wx.navigateTo({
        url: '../period-three/period-three',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    chooseImg: function (e) {

      this.setData({
        curIdx: e.currentTarget.dataset.current
      })
      console.log(e)
      console.log(this.data.curIdx)

    }
  }
})
