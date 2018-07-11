// pages/pay/wxStatus/wxstatus.js
const { 
  orderQuery
 } = require('../../../service/user.js');

 var id= "";
 var orderNo="";
Page({

  /**
   * 页面的初始数据 
   *    // types: "success",
    // pays: "支付成功",
    // paysorderNo: "订单支付成功,视频马上开启",
    // payfailed: "如有问题,请联系客服",
   */
  data: {

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
      id= options.id,
      orderNo=options.orderNo
    if (options.orderNo.length>0){
    // var data={
    //   orderNo: options.orderNo
    // }
    orderQuery().then(result=>{
        console.log(result);
        if (result.status==='01'){
              this.setData({
                types: "success",
                pays: "支付成功",
                paysorderNo: "订单支付成功,视频马上开启",
              })
        } else if (result.status === '02'){
          this.setData({
            types: 'waiting',
            pays: "等待处理",
            paysorderNo: "已提交申请,等待银行处理",
            paywaiting:"您的账户支付失败,请联系客服"
          })
        }else{
          this.setData({
            types: 'warn',
            pays: "支付失败",
            paysorderNo: "您的账户支付失败,请联系客服",
          })
        }
      })
    }
  },
  //去往课程详情
  onCourseDetails() {
    console.log('课程详情');

    wx.redirectTo({
      url: '/pages/courseDetails/courseDetails?id=' + id
    })

  },
  //去往课程列表
  onCourseList() {
    console.log('课程列表');
    wx.redirectTo({
      url: '/pages/myCourse/course' 
    })
  }
})