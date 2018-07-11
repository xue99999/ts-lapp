import Http from '../utils/http.js';
//RAP2 开发阶段测试路径
//const baseUrl = 'http://192.168.9.171:8080/app/mock/20/';
//程东林 本地测试路径
const baseUrl ='http://192.168.5.137:8081/ts-app-web/';
//王丽娟 本地测试路径
//const baseUrl ='http://192.168.5.82:8080/ts-app-web/';

//李康 本地测试路径
// const baseUrl ='http://192.168.5.167:8080/ts-app-web/'

//刘小东 本地测试路径
//const baseUrl = 'http://192.168.5.113:8083/ts-app-web/';
const {get}=Http;

function ownerQuery(params){
  return get({
    url: baseUrl + 'owner/query',
    params
  })
}
//课节列表
const {post}=Http;
 function apiSection(params){
   return get({
     url: baseUrl + '/api/course/'+params+'/sections',
     //params
   })
 }
 //我的课程和我的收藏
function apiCourseCollectList(params){
  return get({
    url: baseUrl + 'api/course/collectList',
    params
  })
}
//课程详情
function apiCourseId(params){
  return get({
    url: baseUrl + 'api/course/' + params,
   
  })
}
// 用户信息同步
function authUserInfo(params){
  return post({
    url: baseUrl + 'auth/userInfo',
    params
  })
}
  // 登录微信授权
function authWechatLogin(params) {
  return post({
    url: baseUrl + '/auth/wechatLogin',
    params
  })
}
//企业码 目前作废
function icketQuery(params){
  return get({
    url: baseUrl + '/ticket/query',
    params
  })
}
//统一下单
function payUnifiedorder(params){
  return post({
    url: baseUrl + 'pay/unifiedorder',
    params
  })

  
}
//订单查询接口
function orderQuery(params) {
  return get({
    url: baseUrl + 'order/query',
    params
  })
}
//课节播放
function apiSectionPlay(params){
  return get({
    url: baseUrl + 'api/section/play/' + params,
   
  })

}

function apiCourseRecommendList(params){

  return get({
    url: baseUrl +'api/course/recommendList',
    params
  })
}

function apiCourseSeriesList(params){
return get({
  url: baseUrl +'/api/course/seriesList',
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
//查询一天的经期信息
function userInfoQueryMenByDay(params) {
  return get({
    url: baseUrl + 'userInfo/queryMenByDay',
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
module.exports = {
  ownerQuery,
  apiSection,
  apiCourseCollectList,
  apiCourseId,
  authUserInfo,
  authWechatLogin,
  icketQuery,
  payUnifiedorder,
  orderQuery,
  apiSectionPlay,
  userInfoAdd,
  userInfoQueryMenByDay,
  userInfoQueryMensAndOvulation,
  apiCourseRecommendList,
  apiCourseSeriesList


  
};