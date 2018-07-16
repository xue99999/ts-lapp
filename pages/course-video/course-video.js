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
var isplay = true, record;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    sectionName: '',
    videoID: "",
    id: "",
    filePath: "",
    teacherName: "",
    initial_times:0.0,
    durations: 0,
    remark: "",

    // 小节列表
    sections: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    auth();
    console.log(options.courseId);
    console.log(options.id);
    console.log(options.teacherName);

    const sectionID = options.id;

    this.setData({
      id: options.id,

    })


    apiSection(options.courseId).then(result => {
      console.log('课节播放列表', result);
      if (result.code === 200) {
        const {
          list = []
        } = result;
        const sections = [];
        var sectionName = "";
        var durations = 0;
        var remark = "";
        SectionList = list;
        // 数据转换
        for (let i = 0; i < list.length; i++) {
          const section = list[i];
          section['name'] = section.sectionName;
          sections.push(section);
          if (list[i].id === sectionID) {
            console.log('当id匹配的时候', i);
            pos = i;
            console.log('id>>>>>>>>>', list[i].id)
            sectionName = list[i].sectionName;
            durations = list[i].duration;
            console.log('durations>>>>>>>>>', durations)
            //请求播放列表
            this.doPlay(list[i].id);
            WxParse.wxParse('remark', 'html', list[i].remark, this, 0);
            //remark = list[i].remark;
          }
        }
        console.log('sectionName>>>>>>>>>', sectionName)
        this.setData({
          list: list,
          sections,
          sectionName,
          teacherName: options.teacherName,
          durations,
          // remark,
        })
      }

    });

  },
  //绑定视频播放事件  
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  doPlay: function(id) {

    apiSectionPlay(id).then(result => {
      console.log('课节播放', result)
      if (result.code === 200) {
    
        this.setData({
          filePath: result.filePath
        })
        this.videoContext.play();
        if (record===1){
         pos= pos + 1
        } else if (record === 2){
          pos = pos - 1
        }

        this.setData({
          sectionName: SectionList[pos].sectionName,
          teacherName: SectionList[pos].teacherName,
          durations: SectionList[pos].durations,
          // remark,
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
    console.log('---id')
    const {
      sections
    } = this.data;
    const {
      videoContext
    } = this;
    for (let i = 0; i < sections.length; i++) {
      const section = id;
      if (sections[i].id === section) {
         // 播放当前匹配的id
        this.doPlay(sections[i].id);
      }
    }

  },

  //点击那个列表
  handleClickItem1({
    detail
  }) {
    const index = detail.index;
    console.log('点击列表播放视频id', SectionList[index].id);
    console.log('点击列表播放视频id', index);
    this.videoContext.pause();
    pos = index;
    this.onPlay(SectionList[index].id);
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
    this.videoContext.pause();
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
    this.videoContext.pause();
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
  //暂停播放
  onSuspend: function() {

    if (isplay) {
      this.videoContext.play();
      isplay = false;
      console.log('播放');
    } else {
      //暂停
      this.videoContext.pause();
      console.log('暂停');
      isplay = true;
    }



  }
})