
/***
 * parmas :{
 * page : 返回的页面
 * tag: 返回的方式 支付的方式 navigate redirect switch reLaunch  默认 redirect
 * openTag:navigate redirect
 * }
 */
function auth(parmas={}){
  
  const token = wx.getStorageSync('token');
  const currentPage = getCurrentPages()[0];
  const currentRoute = currentPage.route;
  console.log(currentPage.route)
  const page = parmas.page || `/${currentPage.route}`
  const tag = parmas.tag||'';
  const url=`/pages/index/index?callback=${page}&&tag=${tag}`;

  const redirect = parmas.openTag ||'redirect';
  if (!token) {
    if (redirect ==='redirect'){
      wx.redirectTo({url})
    }else{
      wx.navigateTo({
        url
      })
    }
    }
   
}

module.exports = { auth }
