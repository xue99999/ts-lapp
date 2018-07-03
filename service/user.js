import Http from '../utils/http.js';

const {get}=Http;
const baseUrl ='http://192.168.9.171:8080/app/mock/20/';
function ownerQuery(params){
  return get({
    url: baseUrl +'/owner/query'
  })
}
 

module.exports = {
  ownerQuery,
  
};