const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
      '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
    ],
    objectArray: [
      {
        id: 0,
        name: '1'
      },
      {
        id: 1,
        name: '2'
      },
      {
        id: 2,
        name: '3'
      },
      {
        id: 3,
        name: '4'
      }
    ],
    show: false,
    imgUrl: '../../img/choose1@3x.png',
    curUrl: '../../img/choose@3x.png',

    index: 0,
    scrollTop: 1130,
    scrollShow: true,
    menstrualCycle:null
  },
  chooseImg: function (e) {
    this.setData({
      show: !this.data.show
    })
    if (this.data.show) {

      app.globalData.obj.menstrualCycle = 28   //默认28
      this.setData({
        scrollShow: false
      })
      console.log(app.globalData.obj.menstrualCycle)
    }
    else {
      this.setData({
        scrollShow: true
      })
      app.globalData.obj.menstrualCycle = this.data.menstrualCycle  //自己设置
      console.log(app.globalData.obj.menstrualCycle)
    }

  },
  bindPickerChange: function (e) {
    var menstrualCycle = e.target.dataset.index += 1
    // console.log('月经有多长' + menstrualCycle + '天')
    app.globalData.obj.menstrualCycle = menstrualCycle
    this.setData({
      menstrualCycle:menstrualCycle
    })

    console.log(app.globalData.obj.menstrualCycle)
  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-four/mother-four',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})