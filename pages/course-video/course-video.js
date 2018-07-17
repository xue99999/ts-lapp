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
var isplay, record, courseId, sectionID;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    sectionName: '',
    videoID: "",
    filePath: "",
    teacherName: "",
    isplay,
    initial_times:0.0,
    remark: "",
    // 小节列表
    sections: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //加载这个函数
    this.videoContext = wx.createVideoContext('myVideo')
    auth();
    console.log('courseId',options.courseId);
    console.log('id',options.id);
    console.log('teacherName',options.teacherName);
    //课节id
    sectionID = options.id;
    //课程id
    courseId = options.courseId;
    apiSection(courseId).then(result => {
      console.log('课节播放列表', result);
      if (result.code === 200) {
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
        })
      }

    });

  },
  doPlay: function(id) {

    apiSectionPlay(id).then(result => {
      console.log('课节播放', result)
      if (result.code === 200) {
        this.setData({
          filePath: result.filePath
        })
    
        if (record===1){
         pos= pos + 1
        } else if (record === 2){
          pos = pos - 1
        }
        this.setData({
          sectionName: SectionList[pos].sectionName,
        })
        WxParse.wxParse('remark', 'html', SectionList[pos].remark, this, 0);
      } else {
        wx.showToast({
          title: "无权限播放课节",
          icon: 'none',
          duration: 2000
        })
        return;
      }

    })
  },

  
  onPlay: function(id) {
    for (let i = 0; i < SectionList.length; i++) {
      if (SectionList[i].id === id) {
         // 播放当前匹配的id
        this.doPlay(SectionList[i].id);
        this.videoContext.play();
      }else{
        this.doPlay(SectionList[0].id);
      }
    }

  },

  //点击那个列表
  handleClickItem1({
    detail
  }) {
    const index = detail.index;
    pos = index;
    this.onPlay(SectionList[index].id);
    //点击之后播放视频
    this.videoContext.play();
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
  toNext: function() {
    //拿到数组的长度
    var listLength=SectionList.length-1;
    //记录一下当前的位置
  var s= pos+1;
   if (s > listLength){
      wx.showToast({
            title: '当前已是最后一个视频',
            icon: 'none',
            duration: 2000
          })
          return;
    }
   record=1;
   this.onPlay(SectionList[pos + 1].id);
  },
  //上一首
  toLast: function() {
    //记录一下当前的位置
    if (pos ===0) {
      wx.showToast({
        title: '当前已是第一个视频了',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    //pos=pos-1;
    record = 2;
    this.onPlay(SectionList[pos-1].id);
  },
  video_observer: function (event) {
    console.log('时间', event);
    if (event.detail.currentTime > 1) {
      isplay = true;
  
    } else {
      isplay = false;
    }
    console.log('isplay>>>', isplay);
    this.setData({
      isplay: isplay,
    })
  },
  //暂停播放
  onSuspend: function() {
    console.log('isplay>>>', isplay);
    if (isplay){
      this.videoContext.pause();
      isplay=false;
      // this.setData({
      //   isplay: true,
      // })
    }else{
      this.videoContext.play();
      isplay=true;
      // this.setData({
      //   isplay: false,
      // })
    }
 

  },


})