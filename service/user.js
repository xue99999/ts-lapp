import Http from '../utils/http.js';
const baseUrl = 'http://192.168.9.171:8080/app/mock/20/';
const {get}=Http;

function ownerQuery(params){
  return get({
    url: baseUrl + 'owner/query',
    params
  })
}
const {post}=Http;
 function apiSection(params){
   return post({
     url: baseUrl + 'api/section',
     params
   })
 }

module.exports = {
  ownerQuery,
  apiSection,
};