// pages/pay/wx-coupon/wx-coupon.js   优惠券
const { couponValidate } = require('../../../service/user.js')
var val = '';
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showcoupon: false,


  },
  // input  value值发生变化
  changeCoupon: function(e) {
    val = e.detail.value
    console.log(val)
    if (val == '') {
      console.log('sssss')
      this.setData({
        showcoupon: false,
      })
    }
  },
  // 点击使用优惠券
  clickUse() {
    var zheng = /(?!^[a-zA-Z]+$)[0-9a-zA-Z]{10,11}/;
    if (!zheng.test(val)) {
      this.setData({
        showcoupon: true,
      })
    }
    else{
      this.setData({
        showcoupon: false,
      })
    }

    var data = {};
    data = {
      courseId: id,
      couponCode: val
    };
    console.log(data)
    couponValidate(data).then(result => {
      // 优惠券码code=405的时候不进行支付并且return 
      if (result.code === 405) {
        wx.showToast({
          title: result.msg,
          icon: 'none',
          duration: 2000
        })
        console.log('优惠券码', result.msg)
        return;
      };
      if (result.code === 200) {
        console.log(result)
        wx.showToast({
          title: result.msg,
          icon: 'none',
          duration: 2000
        })
        wx.navigateTo({
          url: '../wx-pay/wx-pay?payMoney=' + result.payMoney + '&deductMoney=' + result.deductMoney,
        })
      };
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    id = options.id;
    console.log(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})