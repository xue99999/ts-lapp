var app = getApp();
const {
  ownerQuery,
  userInfoQueryBodyStatus
} = require('../../service/user.js');
var time = require('../../utils/time.js');
const {
  auth
} = require('../../utils/auth.js');
const moment = require('../../utils/moment.js');
var shaonv;
Page({
  /**
   * 
   * 页面的初始数据
   */
  data: {
    nickName: "",
    //  phone: "",
    avatarUrl: "",
    integral:0,
    routers: [{
        name: '切换模式',
        url: '../home/home?iscondition=true',
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
        name: '联系客服',
        url: '',
        icon: '../img/feedback@3x.png',
        code: '10'
      },
      {
        name: '全部课程',
        url: '../label-course/label-course',
        icon: '../img/course@3x.png',
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
    this.getDataDay();

    this.initUser()
  },

  /**
   * 绑定手机号
   */
  onClickPhone() {
    console.log('这里是绑定手机号')
  },
  initUser: function() {
    const that = this;
    ownerQuery().then(result => {

      wx.getUserInfo({
        success: function(res) {
          const {
            nickName,
            avatarUrl,
            
          } = res.userInfo;
          that.setData({
            nickName: nickName,
            avatarUrl: avatarUrl,
          
          })
        }
      })
      console.log(result);
      that.setData({
        integral: result.integral
      })
    })
  },
  //在show函数里面做数据切换
  onShow:function(){
    this.getDataDay();
    this.initUser();
  },
  getDataDay() {
    const day = moment().format('YYYY-MM-DD');
    var data = {
      startDay: day,
      endDay: day
    }
    userInfoQueryBodyStatus(data).then(result => {
      if (result.code === 200) {
          if (result.userModel){

            if (result.userModel==='01'){
              shaonv= '记经期'
              }else{
              shaonv = '辣妈'
              }
            this.setData({
              shaonv: shaonv
            })
          }else{
            this.setData({
            shaonv: '记经期',
            })
          }
         
      }
    })
  }
})