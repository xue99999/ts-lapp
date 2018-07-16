// pages/pay/wxStatus/wxstatus.js
const {
  orderQuery
} = require('../../../service/user.js');
const { auth } = require('../../../utils/auth.js');
var id = "";
var orderNo = "";
Page({

  /**
   * 页面的初始数据 
   *    // types: "success",
    // pays: "支付成功",
    // paysorderNo: "订单支付成功,视频马上开启",
    // payfailed: "如有问题,请联系客服",
   */
  data: {
    status:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    auth();
    id = options.id,
    this.setData({
      types: "success",
      pays: "支付成功",
      paysorderNo: "订单支付成功,视频马上开启",
    })

  },
  //去往课程详情
  onCourseDetails() {

    wx.navigateBack({
      delta: 1
    })

  },
  //去往课程列表
  onCourseList() {
    wx.redirectTo({
      url: '/pages/my-course/course'
    })
  }
})