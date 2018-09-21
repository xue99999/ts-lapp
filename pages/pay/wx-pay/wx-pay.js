// pages/pay/wxPay/wxpay.js
const {
  payUnifiedorder
} = require('../../../service/user.js');
var input = '';
var id;
var app = getApp();
const {
  auth
} = require('../../../utils/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: "",
    courseName: "",
    price: 0,
    theTotalPrice: 0,
    focus: false,
    discount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    auth();
    console.log(options)
    const { payMoney, deductMoney} =options;

      id = app.getStorageSync('courseId'),
      this.setData({
        total: app.getStorageSync('total'),
        courseName: app.getStorageSync('courseName'),
        price: app.getStorageSync('price'),
        payMoney,
        deductMoney,
      })
  },
onShow(){
  const { discount, deductMoney} = this.data
  if (deductMoney){
    this.setData({
      discount : `${deductMoney}元`
    })

  }
},
  //跳转优惠券
  navto() {
    wx.navigateTo({
      url: '../wx-coupon/wx-coupon?id=' + id,
    })
  },
  //付款
  onClickPay() {
    var datas = {};
    datas = {
      courseId: id,
      ticketCode: input
    };
    console.log(datas)
    payUnifiedorder(datas).then(result => {
      // 企业兑换码code=503的时候不进行支付并且return 
      if (result.code === 666) {
        wx.showToast({
          title: result.msg,
          icon: 'none',
          duration: 2000
        })
        console.log('企业兑换码', result.msg)
        return;
      };
      //当前课程已经购买
      if (result.code === 999) {
        wx.showToast({
          title: result.msg,
          icon: 'none',
          duration: 2000
        })
        console.log('课程已购买')
        return;
      };
      if (result.code === 200) {
        input = '';
        if (result.returnCode === 201) {
          wx.redirectTo({
            url: '/pages/pay/wx-status/wx-status?orderNo=' + result.data.orderNo + '&id=' + id
          })
          console.log('200成功')
          return;
        }
        const wechat = result.data.wechat;
        wx.requestPayment({
          ...wechat,
          //接口调用成功的回调函数
          'success': function(res) {
            wx.redirectTo({
              url: '/pages/pay/wx-status/wx-status?orderNo=' + result.data.orderNo + '&id=' + id
            })
          },
          //接口调用失败的回调函数
          'fail': function(res) {
            wx.showToast({
              title: '您取消了支付',
              icon: 'none',
              duration: 2000
            })
          },

        })
      }

    })
    input = '';


  },
  // input  value值
  bindObtain: function(e) {
    input = e.detail.value;
    console.log('bindObtain', input)
  }
})