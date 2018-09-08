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
    list: {
      type: Array,
      value: []
    },
    showAmount: {
      type: Boolean,
      value: true
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    url: '/pages/course-details/course-details',
    collection1: '../../pages/img/collection1@3x.png',
    collect: '../../pages/img/collect.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {
    isCollect(e) {
      const { id, isCollect, bindex } = e.currentTarget.dataset;
      const { list } = this.data
      const that = this;
      let status;
      console.log(e)

      if (that.data.list[bindex].isCollect == '0') {

        that.data.list[bindex].isCollect = '1'

        that.setData({
          list
        })
        status = "01";
        console.log('收藏')
      } else {
        that.data.list[bindex].isCollect = '0'
        that.setData({
          list,
        })
        status = "02";
        console.log('取消收藏')
      }
      console.log('this.data.isCollect---', this.data);
      this.getApiCourseCollectCourse(id, status, bindex);
    },
    getApiCourseCollectCourse(id, status, bindex) {
      var data = {
        courseId: id,
        status: status
      }
      apiCourseCollectCourse(data).then(result => {
        console.log(result)
        this.triggerEvent('myevent', bindex)
      })
    },
  }
})
