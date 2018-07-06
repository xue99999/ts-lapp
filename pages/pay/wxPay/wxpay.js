// pages/pay/wxPay/wxpay.js
const { icketQuery, payUnifiedorder } = require('../../../service/user.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    total: "",
    courseName: "",
    price: 0,
    theTotalPrice: 0,
    focus: true,
    timeStamp:"",
    nonceStr:"",
    package:"",
    paySign:"",
    orderNo1:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('微信支付>>>>',options);
    this.setData({
      id: options.id,
      total: options.total,
      courseName: options.courseName,
      price: options.price,
    })
  },

 
  onClickPay () {
    console.log('微信支付');
  var data={
    coursesId: this.data.id,
    ticketCode: this.data.theTotalPrice
  }
 
  payUnifiedorder(data).then(result=>{
    console.log('微信统一下单', result);

      this.setData({
        timeStamp: result.data.wechat.timeStamp,
        nonceStr:  result.data.wechat.nonceStr,
        package:  result.data.wechat.package,
        paySign:  result.data.wechat.paySign,
     
      })

    
      const that = this;
      wx.requestPayment({
        'timeStamp': this.data.timeStamp,
        'nonceStr': this.data.nonceStr,
        'package': this.data.package,
        'signType': 'MD5',
        'paySign': this.data.paySign,
        //接口调用成功的回调函数
        'success': function (res) {
          console.log('成功', res);
       
        },
        //接口调用失败的回调函数
        'fail': function (res) {
          console.log('失败', res);

        },
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        'complete': function (res) {
          console.log('成功失败通用', res);
          if (res.errMsg === 'requestPayment:ok') {
            wx.redirectTo({
              url: '/pages/pay/wxStatus/wxstatus?orderNo=' + result.data.orderNo + '&id=' + that.data.id
            })
          } else {
            wx.redirectTo({
              url: '/pages/pay/wxStatus/wxstatus?orderNo=' + result.data.orderNo + '&id=' + that.data.id
            })
          }
        }
      })

    })


 
 
  },
  bindObtain: function (e){
    var input = e.detail.value;
 
    if (input.length>0){
      var data = {
        coursesId: this.data.id,
        ticketCode: input
      }
      icketQuery(data).then((result => {
        console.log('查旭企业兑换码',result)
        this.setData({
          theTotalPrice: result.theTotalPrice,
        })
        if (result.code === 200) {

        }
      }))
    }
    

  }


})