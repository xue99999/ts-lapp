// component/course-list/index.js
const {
  apiCourseCollectCourse
} = require('../../service/user.js');
const {
  auth
} = require('../../utils/auth.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //标题
    title: {           // 属性名
      type: null,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: null,     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    list:{
      type:Array,
      value:[]
    },
    showAmount:{
      type: Boolean,  
      value:true 
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCollect: 0,
    list: [],
    url: '/pages/course-details/course-details',
    collection1:'../../pages/img/collection1@3x.png',
    collect:'../../pages/img/collect.png'
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isCollect(e) {
      const { id, isCollect } = e.currentTarget.dataset;
      console.log('isCollect---', this.data.isCollect)
      const that = this;
      let status;
      console.log(e)
      
      if (this.data.isCollect == '0') {
        that.setData({ 
          isCollect: 1,
          hello: 'world++++',
        })
        status = "01";
      } else {
        that.setData({
          isCollect: 0,
          hello: 'world----',
        })
        status = "02";
      }
      console.log('this.data.isCollect---', this.data);
      this.getApiCourseCollectCourse(id,status);
    },
    getApiCourseCollectCourse(id,status) {
      var data = {
        courseId: id,
        status: status
      }
      apiCourseCollectCourse(data).then(result => {
        console.log(result)
        const { list } = this.data
        for(let i=0;i<list.length;i++){
          if(id==list[i].id){
            list[i]['isCollect'] = 1;

          }
          this.setData({ list })
        }
        
       
      })
    },
  }
})
