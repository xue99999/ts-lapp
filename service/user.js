import Http from '../utils/http.js';
// import mock from './mock.js';
//RAP2 开发阶段测试路径
//const baseUrl = 'http://192.168.9.171:8080/app/mock/20/';
//程东林 本地测试路径
// const baseUrl ='http://192.168.5.137:8081/ts-app-web/';
//王丽娟 本地测试路径大家都在发
const baseUrl = 'http://192.168.5.82:8080/ts-app-web/';
// const baseUrl ='http://192.168.5.82:8080/ts-app-web/';
//李康 本地测试路径

//  const baseUrl = 'http://192.168.5.167:8080/ts-app-web/'
//const baseUrl = 'http://192.168.9.171:8090/'
//const baseUrl = 'http://192.168.5.113:8083/ts-app-web/'
//171测试服务器
// const baseUrl ='http://192.168.9.171:8089/'
// const baseUrl ='http://192.168.5.167:8080/ts-app-web/'
//刘小东 本地测试路径
//const baseUrl = 'http://192.168.5.113:8083/ts-app-web/'
//171测试服务器

// const baseUrl ='http://36.110.31.179:8090/'
// 生产地址
// const baseUrl = 'https://api.tashi2018.com/'

const {
  get
} = Http;

function ownerQuery(params) {
  return get({
    url: baseUrl + 'owner/query',
    params
  })
}
//课节列表
const {
  post
} = Http;

function apiSection(params) {
  return get({
    url: baseUrl + 'api/course/' + params + '/sections',
    //params
  })
}
//我的课程和我的收藏
function apiCourseCollectList(params) {
  return get({
    url: baseUrl + 'api/course/collectList',
    params
  })
}
//课程详情
function apiCourseId(params) {
  return get({
    url: baseUrl + 'api/course/' + params,

  })
}
// 用户信息同步
function login(params) {
  return post({
    url: baseUrl + 'auth/wechat/login',
    params
  })
}
// 登录微信授权
function loginWithCode(params) {
  return post({
    url: baseUrl + 'auth/wechat/loginWithCode',
    params
  })
}
//企业码 目前作废
function icketQuery(params) {
  return get({
    url: baseUrl + '/ticket/query',
    params
  })
}
//统一下单
function payUnifiedorder(params) {
  return post({
    url: baseUrl + 'pay/unifiedorder',
    params
  })


}
//订单查询接口
function orderQuery(params) {
  return get({
    url: baseUrl + 'order/' + params,

  })
}
//课节播放
function apiSectionPlay(params) {
  return get({
    url: baseUrl + 'api/section/play/' + params,

  })

}
//课程--推荐
function apiCourseRecommendList(params) {

  return get({
    url: baseUrl + 'api/course/recommendList',
    params
  })
}

function apiCourseSeriesList(params) {
  return get({
    url: baseUrl + '/api/course/seriesList',
    params
  })
}
//登录经期信息
function userInfoAdd(params) {
  return post({
    url: baseUrl + 'userInfo/add',
    params
  })

}

//查询设置经期与排卵
function userInfoQueryMensAndOvulation(params) {
  return get({
    url: baseUrl + 'userInfo/queryMensAndOvulation',
    params
  })
}

//查询身体状态接口
function userInfoQueryBodyStatus(params) {

  // return mock.bodys()
  return get({
    url: baseUrl + 'userInfo/queryBodyStatus/' + params.startDay + '/' + params.endDay,

  })
}

//更新身体状态
function userInfoUpdateBodyStatus(params) {
  return post({
    url: baseUrl + 'userInfo/updateBodyStatus',
    params
  })
}
//取消收藏 
function apiCourseCollectCourse(params) {
  return post({
    url: baseUrl + 'api/course/collectCourse',
    params
  })
}
//设置经期与排卵接口
function userInfoUpdateMensAndOvulation(params) {
  return post({
    url: baseUrl + 'userInfo/updateMensAndOvulation',
    params
  })
}
//免费课程订阅
function payFreeCourse(params) {
  return post({
    url: baseUrl + 'pay/freeCourse',
    params
  })
}
//查询宝宝按摩打卡
function userInfoQueryBabyRecord(params) {
  return get({
    url: baseUrl + 'userInfo/queryBabyRecord/'+ params.day,
  })
}
//更新宝宝按摩打卡
function userInfoUpdateBabyRecord(params) {
  return get({
    url: baseUrl + 'userInfo/updateBabyRecord',
    params
  })
}
//月经周期记录
function userInfoQueryMensesCycleList(params) {
  return get({
    url: baseUrl + 'userInfo/queryMensesCycleList',
    params
  })
}
module.exports = {
  ownerQuery,
  apiSection,
  apiCourseCollectList,
  apiCourseId,
  loginWithCode,
  login,
  icketQuery,
  payUnifiedorder,
  orderQuery,
  apiSectionPlay,
  userInfoAdd,
  userInfoQueryMensAndOvulation,
  apiCourseRecommendList,
  apiCourseSeriesList,
  userInfoQueryBodyStatus,
  userInfoUpdateBodyStatus,
  apiCourseCollectCourse,
  userInfoUpdateMensAndOvulation,
  payFreeCourse,
  userInfoQueryBabyRecord,
  userInfoUpdateBabyRecord,
  userInfoQueryMensesCycleList,
};