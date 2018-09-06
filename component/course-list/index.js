// component/course-list/index.js
const {
  apiCourseCollectCourse
} = require('../../service/user.js');
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
    title:null,
    isCollect: -1,
    list: [],
    url: '/pages/course-details/course-details',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isCollect(e) {
      const { id, status } = e.currentTarget.dataset
      console.log(this.data.list)
      if (this.data.isCollect === 0) {
        this.setData({ 
          isCollect: 1
        })
      } else {
        this.setData({
          isCollect: 0
        })
      }
      this.getApiCourseCollectCourse(id, status);
    },
    getApiCourseCollectCourse(id, status) {
      var data = {
        courseId: id,
        status: status === '01' ? '02' : '01'
      }

      apiCourseCollectCourse(data).then(result => {
        console.log(result)
      })
    },
  }
})
