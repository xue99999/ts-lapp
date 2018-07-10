// pages/pay/wxPay/wxpay.js
const {
  payUnifiedorder
} = require('../../../service/user.js');
var input = '';
var id ;
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
   
    id= options.courseId;
    this.setData({

      total: options.total,
      courseName: options.courseName,
      price: options.price,
    })
  },
  onClickPay() {
    console.log('微信支付');
    console.log(input);
    console.log('id>>>>>',id);
    if (input === '') {
      wx.showToast({
        title: '企业兑换码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    };
    var data = {
      coursesId: id,
      ticketCode: input
    };

    payUnifiedorder(data).then(result => {
      console.log('微信统一下单', result);
      if (result.returnCode === 201) {
        wx.redirectTo({
          url: '/pages/pay/wxStatus/wxstatus?orderNo=' + result.data.orderNo + '&id=' + id
        })
        return;
      }
    
      wx.requestPayment({
        'timeStamp': result.data.wechat.timeStamp,
        'nonceStr': result.data.wechat.nonceStr,
        'package': result.data.wechat.package,
        'signType': 'MD5',
        'paySign': result.data.wechat.paySign,
        //接口调用成功的回调函数
        'success': function(res) {
          console.log('成功', res);
        },
        //接口调用失败的回调函数
        'fail': function(res) {
          console.log('失败', res);
        },
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        'complete': function(res) {
          console.log('成功失败通用', res);
          if (res.errMsg === 'requestPayment:ok') {
            wx.redirectTo({
              url: '/pages/pay/wxStatus/wxstatus?orderNo=' + result.data.orderNo + '&id=' + id
            })
          } else {
            wx.redirectTo({
              url: '/pages/pay/wxStatus/wxstatus?orderNo=' + result.data.orderNo + '&id=' + id
            })
          }
        }
      })

    })
  },
  bindObtain: function(e) {
    input = e.detail.value;
    console.log(input);
  }
})