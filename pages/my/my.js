var app = getApp();
const {
  ownerQuery
} = require('../../service/user.js')
var time = require('../../utils/time.js');
const {
  auth
} = require('../../utils/auth.js')
Page({
  /**
   * 
   * 页面的初始数据
   */
  data: {
    nickName: "",
    //  phone: "",
    avatarUrl: "",
    integral: "",
    routers: [{
        name: '辣妈模式',
        url: '../home-mother/mother-five/mother-five',
        icon: '../img/mom1@3x.png',
        code: '10'
      },
      {
        name: '经期与排卵',
        url: '../set-period/set-period',
        icon: '../img/collection@3x.png',
        code: '11'
      },
      {
        name: '我的课程',
        url: '../my-course/course',
        icon: '../img/course@3x.png',
        code: '10'
      },
      {
        name: '我的收藏',
        url: '../my-collection/collection',
        icon: '../img/collection@3x.png',
        code: '11'
      },
      {
        name: '建议反馈',
        url: '',
        icon: '../img/feedback@3x.png',
        code: '10'
      },
      {
        name: '标签模式',
        url: '../label-course/label-course',
        icon: '../img/feedback@3x.png',
        code: '10'

      }

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var parmas = {
      tag: "switch"
    }
    auth(parmas);
    this.initUser()
  },

  /**
   * 绑定手机号
   */
  onClickPhone() {
    console.log('这里是绑定手机号')
  },
  onShow: function() {
    this.initUser()
  },
  initUser:function(){
    const that=this;
    ownerQuery().then(result => {
      wx.getUserInfo({
        success: function (res) {
          const { nickName,avatarUrl}=res.userInfo;
          that.setData({
            nickName: nickName,
            avatarUrl: avatarUrl,
            integral: result.integral,
          })
        }
      })
     

    })
  }
})