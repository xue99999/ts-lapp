// request
function Request(method, requestHandler) {
  const {
    url,
    params,
    headers
  } = requestHandler

  wx.showNavigationBarLoading()

  return new Promise((resolve, reject) => {
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      data: params,
      method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].indexOf(method) > -1 ? method : 'GET',
      header: Object.assign({
        'Content-Type': 'application/json',
        // 'Authorization': 'E5E258A5656F4038BAD3D1E79986D1B7',
        'Authorization': wx.getStorageSync('token'),

        /*
        这里可以自定义全局的头信息，这是一个栗子 
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded'
        */

      }, headers),
      success: function(res) {
        const {
          data,
          statusCode
        } = res

        if (statusCode === 411 || statusCode===413){
            wx.redirectTo({
              url: '../pages/index/index',
            })
        }
        // 处理数据
        statusCode === 200 ? resolve(data) : reject(data, statusCode)
      },
      fail: function() {
        reject('Network request failed')
      },
      complete: function () {
        wx.hideNavigationBarLoading()

      }
    })
  })
}

var Http = {
  /**
   * [HTTP GET 请求]
   * @param [第1种使用方法是URL不带参数。第2种使用方法是在请求URL后带参数，如：?id=1&name=ming]
   * 1. HTTP.get(url).then((data) => {}).catch((error) => {})
   * 2. HTTP.get({url: url, params: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  get: function(requestHandler) {
    if (typeof requestHandler === 'string') {
      requestHandler = {
        url: String(requestHandler),
        params: {}

      }
    }
    return Request('GET', requestHandler)
  },

  /**
   * [HTTP POST 请求]
   * @param [可自定义 headers，如需 Authorization 等，默认：'Content-Type': 'application/json']
   * HTTP.post({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  post: function(requestHandler) {
    return Request('POST', requestHandler)
  },

  /**
   * [HTTP PATCH 请求]
   * HTTP.patch({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  patch: function(requestHandler) {
    return Request('PATCH', requestHandler)
  },

  /**
   * [HTTP PUT 请求]
   * HTTP.put({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  put: function(requestHandler) {
    return Request('PUT', requestHandler)
  },

  /**
   * [HTTP DELETE 请求]
   * HTTP.delete({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  delete: function(requestHandler) {
    return Request('DELETE', requestHandler)
  },


}

module.exports = Http;