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
    visible1: false,
    sectionName: '',
    videoID: "",
    filePath: "",
    teacherName: "",
    initial_times:0.0,
    remark: "",
    videoDirection:"90",
    // 小节列表
    sections: [],
    // 课节所有列表
    sectionAll:[],
    sectionShowImgId:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
          }else{
            pos = 0;
            sectionName = list[0].sectionName;
            this.onPlay(list[0].id);
            WxParse.wxParse('remark', 'html', list[i].remark, this, 0);
            this.setData({
              isplay: false,
            })
          }
        }
        this.setData({
          list: list,
          sections,
          sectionName,
          sectionAll:list,
          sectionShowImgId: pos,
        })
      }

    });

  },
  onReady:function(){
    //加载这个函数
    this.videoContext = wx.createVideoContext('myVideo')
  },
  doPlay: function(id) {
    const that=this;
    apiSectionPlay(id).then(result => {
      if (result.code === 200) {
        this.setData({
          filePath: result.filePath,
          isplay:true,
        })
        that.videoContext.play();
        if (record===1){
         pos= pos + 1
        } else if (record === 2){
          pos = pos - 1
        } else if (record===3){
          pos = index
        }
        this.setData({
          sectionName: SectionList[pos].sectionName,
        })
        WxParse.wxParse('remark', 'html', SectionList[pos].remark, this, 0);
      } else {
        this.setData({
          isplay: false,
        })
        wx.showToast({
          title: "无权限播放",
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
        //this.videoContext.play();
      }
    }
  },

  //点击那个列表
  handleClickItem1({
    detail
  }) {
    index= detail.index;
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
  toNext: function() {
    //拿到数组的长度
    var listLength=SectionList.length-1;
    //记录一下当前的位置
  var s= pos+1;
   if (s > listLength){
      wx.showToast({
            title: '当前已是最后一节课',
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
        title: '当前已为第一节课',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    record = 2;
    this.onPlay(SectionList[pos-1].id);
  },
  //暂停播放
  onSuspend: function() {
    if (this.data.isplay){
      this.videoContext.pause();
      this.setData({
        isplay: false,
      })
    }else{
      this.videoContext.play();
      this.setData({
        isplay: true,
      })
    }
  

  },
  // 课节列表
  hahah: function (event){
    // this.videoContext.stop();
  },


})