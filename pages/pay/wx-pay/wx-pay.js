// pages/pay/wxPay/wxpay.js
const {
  payUnifiedorder
} = require('../../../service/user.js');
var input = '';
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    total: "",
    courseName: "",
    price: 0,
    theTotalPrice: 0,
    focus: true,
    timeStamp: "",
    nonceStr: "",
    package: "",
    paySign: "",
    orderNo1: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('微信支付>>>>', options.courseId);

    id = options.courseId;

    this.setData({

      total: options.total,
      courseName: options.courseName,
      price: options.price,
    })
  },
  onClickPay() {
    console.log('微信支付');
    console.log(input);
    console.log('id>>>>>', id);

    var data = {

      // courseId: "a3999360b36a4cfe835e78c9189ccde0",
      courseId: id,
      ticketCode: input
    };

    payUnifiedorder(data).then(result => {
      console.log('微信统一下单', result);
      //企业兑换码code=503的时候不进行支付并且return 
      if (result.code === 503) {
        wx.showToast({
          title: '企业兑换码错误',
          icon: 'none',
          duration: 2000
        })
        return;
      };
      //当前课程已经购买
      if (result.code === 999) {
        wx.showToast({
          title: '当前课程您已购买',
          icon: 'none',
          duration: 2000
        })
        return;
      };
      if (result.code === 200) {
        if (result.returnCode === 201) {
          wx.redirectTo({
            //等刘小东改完在修改注释
             url: '/pages/pay/wx-status/wx-status?orderNo=' + result.data.orderNo + '&id=' + id
           
          })
          return;
        }
        const wechat = result.data.wechat;
        wx.requestPayment({
          ...wechat,
          //接口调用成功的回调函数
          'success': function(res) {
            console.log('成功', res);
            wx.redirectTo({
              url: '/pages/pay/wx-status/wx-status?orderNo=' + result.data.orderNo + '&id=' + id
            })
          },
          //接口调用失败的回调函数
          'fail': function(res) {
            console.log('失败', res);
            wx.showToast({
              title: '您取消了支付',
              icon: 'none',
              duration: 2000
            })
          },

        })
      }
    })
  },
  bindObtain: function(e) {
    input = e.detail.value;
    console.log(input);
  }
})