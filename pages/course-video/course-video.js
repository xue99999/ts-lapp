// pages/courseVideo/coursevideo.js
const {
  apiSectionPlay,
  apiSection
} = require('../../service/user.js');
const {
  auth
} = require('../../utils/auth.js');
const WxParse = require('../../wxParse/wxParse.js');
var pos = -1;
var SectionList = [];
//区分播放暂停
var record, courseId, sectionID, index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:false,
    videoDuration:'',
    visible1: false,
    sectionName: '',
    videoID: "",
    filePath: "",
    teacherName: "",
    initial_times: 0.0,
    remark: "",
    videoDirection: "90",
    // 小节列表
    sections: [],
    // 课节所有列表
    sectionAll: [],
    sectionShowImgId: 0,
    pageGesture: true,
    posters: "",
    no_auth_status: false, // 无权播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //加载这个函数
    this.videoContext = wx.createVideoContext('myVideo')
    auth();
    //课节id
    sectionID = options.id;
    //课程id
    courseId = options.courseId;
    apiSection(courseId).then(result => {
      if (result.code === 200) {
        console.log("-----------------", result);
        const {
          list = []
        } = result;
        const sections = [];
        var sectionName = "";
        var remark = "";
        SectionList = list;

        // 数据转换
        for (let i = 0; i < list.length; i++) {
          const section = list[i];
          section['name'] = section.sectionName;
          sections.push(section);
          if (list[i].id === sectionID) {
            pos = i;
            sectionName = list[i].sectionName;
            this.onPlay(list[i].id);
            WxParse.wxParse('remark', 'html', list[i].remark, this, 0);
          }
        }
        this.setData({
          list: list,
          sections,
          sectionName,
          sectionAll: list,
          sectionShowImgId: pos,
        })
      }

    });

  },
  onReady: function () {
    //加载这个函数
    this.videoContext = wx.createVideoContext('myVideo')
  },
  doPlay: function (id) {
    const that = this;
    console.log('课节id--------', id)
    apiSectionPlay(id).then(result => {
      console.log("课节播放", result)

      this.setData({
        sectionName: SectionList[pos].sectionName,
      })
      WxParse.wxParse('remark', 'html', SectionList[pos].remark, this, 0);

      if (result.code === 200) {
        this.setData({
          filePath: result.filePath,
          isplay: true,
          no_auth_status: false,
        })
        // that.videoContext.play();

      } else {
        this.setData({
          filePath: '',
          isplay: false,
          no_auth_status: true,
        })
        wx.showToast({
          title: "当前课程未订阅 , 无权观看",
          icon: 'none',
          duration:2000
        })
      }

    })
  },
  // 暂停
  videoPlay() {
    console.log()
    this.setData({
      isplay: true
    })
  },
  // 播放
  videoPause() {
    this.setData({
      isplay: false
    })
  },
  videoError() {
    this.setData({
      isplay: false
    })
  },
  onPlay: function (id) {
    this.doPlay(id);
  },

  //点击那个列表
  handleClickItem1({
    detail
  }) {
    index = detail.index;
    this.onPlay(SectionList[index].id);
    //点击之后播放视频
    record = 3;
    this.setData({
      visible1: false,
    });
  },
  //隐藏
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  //显示
  onClickList() {
    this.setData({
      visible1: true
    });

  },
  //下一首
  toNext: function () {
    //拿到数组的长度
    var listLength = SectionList.length - 1;
    //记录一下当前的位置
    pos += 1
    if (pos > listLength) {
      pos = listLength
      wx.showToast({
        title: '当前已是最后一节课',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.onPlay(SectionList[pos].id);
    this.onSuspend()
    this.setData({
      filePath: '',
      isPlay: false,
      visible1: false,
      sectionName: SectionList[pos].sectionName,

    })


  },
  //上一首
  toLast: function () {
    //记录一下当前的位置
    pos -= 1
    if (pos < 0) {
      pos = 0
      wx.showToast({
        title: '当前已为第一节课',
        icon: 'none',
        duration: 2000
      })
      return;
    } 
    this.onPlay(SectionList[pos].id);
    this.onSuspend()
    this.setData({
      filePath: '',
      isPlay: false,
      visible1: false,
      sectionName: SectionList[pos].sectionName,
    })
  },
  //暂停播放
  onSuspend: function () {
    if (this.data.isplay) {
      this.videoContext.pause();
      this.setData({
        isplay: false,
      })
    } else {
      this.videoContext.play();
      this.setData({
        isplay: true,
      })
    }


  },
  // 课节列表
  clickItem(e) {
    console.log('~~~~~~~~~~~~~~~~~', e.target.dataset.index)
    const ind = e.target.dataset.index
    this.videoContext.stop();
    setTimeout(_ => {
      this.setData({
        filePath: '',
        isPlay: false,
        visible1: false,
        state:true
      })
    }, 0)
    pos = ind
    setTimeout(_ => {
      let id = e.target.dataset.id
      this.doPlay(id)
    }, 300)
  }

})