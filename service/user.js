import Http from '../utils/http.js';
const baseUrl = 'http://192.168.9.171:8080/app/mock/20/';
const {get}=Http;

function ownerQuery(params){
  return get({
    url: baseUrl + 'owner/query',
    params
  })
}
//课程列表
const {post}=Http;
 function apiSection(params){
   return post({
     url: baseUrl + 'api/section',
     params
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
    url: baseUrl + 'api/course/:id',
    params
  })
}

module.exports = {
  ownerQuery,
  apiSection,
  apiCourseCollectList,
  apiCourseId,

  
};