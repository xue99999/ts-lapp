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
        show:false,
        imgUrl: '../img/choose1@3x.png',
        curUrl: '../img/choose@3x.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navto: function () {
      wx.navigateTo({
        url: '../period-three/period-three'
      })
    },
    chooseImg: function (e) {

      this.setData({
        show:!this.data.show
      })
      console.log(e)

    }
  }
})
