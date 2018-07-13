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
var isplay = true;
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
        if (!result.code === 200) {
          wx.showToast({
            title: "当前课节无权播放请订阅",
            icon: 'none',
            duration: 2000
          })
          return;
        }

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


            // sectionName = list[i].sectionName;
            // //请求播放列表
            // this.onPlay(section[i].id);
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
  doPlay: function(id) {

    apiSectionPlay(id).then(result => {
      console.log('课节播放', result)
      if (!result.code === 200) {
        wx.showToast({
          title: "当前课节无权播放请订阅",
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (result.code === 200) {
        this.setData({
          filePath: result.filePath
        })
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
      if (sections[i].id === id) {
        this.doPlay(sections[i].id);
        // 播放
        // videoContext.play()
      }
    }

  },
  //绑定视频播放事件  
  onReady: function(res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  //点击那个列表
  handleClickItem1({
    detail
  }) {
    const index = detail.index;
    console.log('点击列表播放视频id', SectionList[index].id);
    this.doPlay(SectionList[index].id);
    this.setData({
      visible1: false
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
    console.log('选择的下标', pos);

    for (var i = 0; i < SectionList.length; i++) {
      if (pos === i) {
      if ((i + 1) > SectionList.length) {
        wx.showToast({
          title: '当前已是最后一个视频',
          icon: 'none',
          duration: 2000
        })
        return;
      }
  
        pos = i + 1;
        if (SectionList[i + 1].id){
          this.doPlay(SectionList[i + 1].id);
        }
      
      }
    }
  },
  //上一首
  toLast: function() {
    console.log('选择的下标', pos);

    for (var i = 0; i < SectionList.length; i++) {
      if (pos=== 0) {
        wx.showToast({
          title: '当前已是第一个视频了',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (pos === i) {
        this.doPlay(SectionList[i - 1].id);
      }
    }
  },
  //暂停
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