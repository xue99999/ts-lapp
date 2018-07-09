// pages/courseVideo/coursevideo.js
const {
  apiSectionPlay,
  apiSection
} = require('../../service/user.js')
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
    teacherName:"",
    durations: 0,
    remark: "",
    list:[],
    // 小节列表
    sections:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.courseId);
    console.log(options.id);
    console.log(options.teacherName);

    const sectionID = options.id;
   
    this.setData({
      id: options.id,
     
    })
    var data = {
      courseId: options.courseId
    }

    apiSection(data).then(result => {
      console.log('课节播放列表', result);
      const {list=[]} = result;
      const sections=[];
      var sectionName="";
      var durations=0;
      var remark="";
      // 数据转换
      for(let i=0;i<list.length;i++){
        const section=list[i];
        section['name'] = section.sectionName;
        sections.push(section);
        // if (list[i].id === sectionID){
        //   sectionName = list[i].sectionName;
        //   //请求播放列表
        //   this.onPlay(section[i].id);
        // }
        if (i===0) {
          console.log('id>>>>>>>>>', list[i].id)
          sectionName = list[i].sectionName;
          durations = list[i].duration;
          console.log('durations>>>>>>>>>', durations)
          //请求播放列表
          this.doPlay(list[i].id);
          remark = list[i].remark;
        }
      }
      console.log('sectionName>>>>>>>>>', sectionName)
      this.setData({
        sections,
        sectionName,
        teacherName: options.teacherName,
        durations,
        remark,
      })

   
     
    });

  },
  doPlay: function (id){

    var data = {
      id: id
    }
    apiSectionPlay(data).then(result => {
      console.log('课节播放',result)
      this.setData({
        filePath: result.filePath
      })
    })
  },
  onPlay:function(id){
    console.log('---id')
    const { sections}=this.data;
    const { videoContext}=this;
    for(let i=0;i<sections.length;i++){
      const section=id;
      if (sections[i].id ===id) {
        this.doPlay(sections[i].id);
        // 播放
        videoContext.play()
      }
    }
    
  },

  onReady: function(res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  handleClickItem1({ detail }) {
    const index = detail.index + 1;

    console.log(index)
  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  onClickList() {
    this.setData({
      visible1: true
    });
      // 显示遮罩层
      /** 
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)

      */
    },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //下一首
  toNext:function(){
  
  },
  //上一首
  toLast:function(){
  
  },
  //暂停
  onSuspend:function(){
    //暂停
    videoContext.pause();
  }
})