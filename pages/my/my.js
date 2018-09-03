var app = getApp();
const {
  userInfoAdd,
  ownerQuery,
  userInfoQueryBodyStatus,
  userInfoQueryMensAndOvulation
} = require('../../service/user.js');
var time = require('../../utils/time.js');
const {
  auth
} = require('../../utils/auth.js');
const moment = require('../../utils/moment.js');
let shaonv;
Page({
  /**
   * 
   * 页面的初始数据
   */
  data: {
    tsVersion: 'V1.1.0',
    nickName: "",
    avatarUrl: "",
    integral: 0,
    routers: [
      // {
      //   name: '切换模式',
      //   url: '../home/home?iscondition=true',
      //   icon: '../img/mom1@3x.png',
      //   code: '10'
      // },
      {
        name: '全部课程',
        url: '../label-course/label-course',
        icon: '../img/addimg/allcourse@3x.png',
        code: '10'
      },
      {
        name: '我的课程',
        url: '../my-course/course',
        icon: '../img/addimg/course@3x.png',
        code: '10'
      },
      {
        name: '我的收藏',
        url: '../my-collection/collection',
        icon: '../img/addimg/collection@3x.png',
        code: '11'
      },
      {
        name: '经期与排卵',
        url: '../set-period/set-period',
        icon: '../img/shezhi.png',
        code: '11'
      },
      {
        name: '帮助中心',
        url: '../my-help/my-help',
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
    this.getDataDay();

    this.initUser()
  },

  /**
   * 绑定手机号
   */
  onClickPhone() {
    // console.log('这里是绑定手机号')
  },
  // 切换模式功能
  clickTab() {
    wx.showModal({
      // title: '提示',
      content: `${shaonv}`=== '只记经期' ? '确定要切换到"我是辣妈"模式吗?' : '确定要切换到"只记经期"模式吗?',
      success: function(res) {
        if (res.confirm) {

          userInfoQueryMensAndOvulation().then(res => {
            console.log('查询经期与排卵', res);
            if (res.userModel === '01') {
              var data = {
                'userModel': '02',
                'menstrualStartTime': res.menstrualStartTime,
                'menstrualTimes': res.menstrualTimes,
                'menstrualCycle': res.menstrualCycle,
                'birthday': res.birthday
              }
              console.log(data)

              userInfoAdd(data).then(res => {
                console.log('登录经期信息', res);
                wx.switchTab({
                  url: '../today/today',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              })
            } else {
              var data = {
                'userModel': '01',
                'menstrualStartTime': res.menstrualStartTime,
                'menstrualTimes': res.menstrualTimes,
                'menstrualCycle': res.menstrualCycle,
                'birthday': res.birthday
              }
              console.log(data)

              userInfoAdd(data).then(res => {
                console.log('登录经期信息', res);
                wx.switchTab({
                  url: '../today/today',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              })

            }


          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

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
            integral: result.integral
          })
        }
      })

    })
  },
  //在show函数里面做数据切换
  onShow: function() {
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
        if (result.userModel) {

          if (result.userModel === '01') {
            shaonv = '只记经期'
          } else {
            shaonv = '我是辣妈'
          }
          this.setData({
            shaonv: shaonv
          })
        } else {
          this.setData({
            shaonv: '只记经期',
          })
        }

      }
    })
  }
})