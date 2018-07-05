var app=getApp();
const { ownerQuery}= require('../../service/user.js')
var time = require('../../utils/time.js');
Page({

  /**
   * 
   * 页面的初始数据
   */
  data: {

    nickName: "",
    phone: "",
    avatarUrl: "",
    integral:"",
    routers: [{
        name: '辣妈经期',
        url: '',
        icon: '../img/mom1@3x.png',
        code: '10'
      },
      {
        name: '经期与排卵',
        url: '',
        icon: '../img/collection@3x.png',
        code: '11'
      },
      {
        name: '我的课程',
        url: '../myCourse/course',
        icon: '../img/course@3x.png',
        code: '10'
      },
      {
        name: '我的收藏',
        url:'../myCollection/collection',
        icon: '../img/collection@3x.png',
        code: '11'
      },
      {
        name: '建议反馈',
        url: '/pages/Course/course',
        icon: '../img/feedback@3x.png',
        code: '10'
      }

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    ownerQuery().then(res=>{
      console.log('个人信息查询',res);
        this.setData({
          nickName: res.nickName,
          phone: res.phone,
          avatarUrl: res.avatarUrl,
          integral: res.integral,
        })

    })
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

  },
  /**
   * 绑定手机号
   */
  onClickPhone() {
    console.log('这里是绑定手机号')
  },

    getTime(timeDate){
      console.log(timeDate);
      time.formatTime(timeDate, 'h:m')
    }

})