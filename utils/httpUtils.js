const BASIC = "OQA1ADUAYwBjAGEANgA2AC0AOQA0ADcAMQAtADQAMwA4AGMALQBhAGEAZAAxAC0AYQA5ADcAZAA2ADMAMwA1ADYAMgAyADgAOgA3AGYAZgAzAGMAYwAzADUALQA0AGYAOQBiAC0ANAAxADIAMwAtAGIAMwBjADIALQA3ADYAMwA2AGEANwBhADAAZQAxADQAYQA=";
const TOKEN_URL = "http://api.nbcei.cn:8002/token";
const API_URL = "http://mobile.nbcei.cn:8002/";
const BASE_COMMON_URL = "http://mobile.nbcei.cn:8003/";

var requestHandler = {
      param: {},
      success: function (res) {

      },
      fail: function (error) {

      },
}

//GET请求token
function tokenGet(requestHandler) {
      tokenRequest('GET', requestHandler)
}

//POST请求token
function tokenPost(requestHandler) {
      tokenRequest('POST', requestHandler)
}


//GET请求api
function apiGet(apiUrl, requestHandler) {
      apiGetRequest(apiUrl, 'GET', requestHandler)
}

//POST请求api
function apiPost(apiUrl, requestHandler) {
      apiPostRequest(apiUrl, 'POST', requestHandler)
}



//token网络请求
function tokenRequest(method, requestHandler) {
      //注意：可以对params加密等处理
      var params = requestHandler.params;

      wx.request({
            url: TOKEN_URL,
            data: params,
            header: {
                  'Authorization': 'Basic ' + BASIC,
            },
            method: method,
            success: function (res) {
                  //注意：可以对参数解密等处理
                  requestHandler.success(res)
            },
            fail: function (error) {
                  requestHandler.fail(error)
            },
            complete: function (res) { }
      })

}


//api网络请求
function apiPostRequest(apiUrl,method, requestHandler) {
      //注意：可以对params加密等处理
      var params = requestHandler.params;
      //同步缓存中获取token数据
      var userInfoTokenBean = wx.getStorageSync('userInfoTokenBean');
      var token =  userInfoTokenBean.access_token;

      wx.request({
            url: API_URL + apiUrl,
            data: params,
            header: {
                  'Authorization': 'Bearer ' + token,
            },
            method: method,
            success: function (res) {
                  //注意：可以对参数解密等处理
                  requestHandler.success(res)
            },
            fail: function (error) {
                  requestHandler.fail(error)
            },
            complete: function (res) { }
      })

}

//api网络请求
function apiGetRequest(apiUrl,method, requestHandler) {
    //注意：可以对params加密等处理
    var params = requestHandler.params;
    //同步缓存中获取token数据
    var userInfoTokenBean = wx.getStorageSync('userInfoTokenBean');
    var token =  userInfoTokenBean.access_token;
    //params={id: "123"} 这样的类型 才能判断是否为空
    if(params){
        let paramsArray = [];
        //拼接参数 这里拿到的是value值
        Object.keys(params).forEach(key => paramsArray.push(params[key]));
        //判断是否找到“?”
        if(apiUrl.search(/\?/) === -1){
            //这里拿到的是例如： /api/Nbcei.Framework.Api.Impl/v1/user/details/123/456
            apiUrl += '/' + paramsArray.join('/')
        }else {
            //这里拿到的是例如： /api/Nbcei.Framework.Api.Impl/v1/user/details?123&456
            apiUrl += '&' + paramsArray.join('&')
        }
    }

    wx.request({
        url: API_URL + apiUrl,
        header: {
            'Authorization': 'Bearer ' + token,
        },
        method: method,
        success: function (res) {
            //注意：可以对参数解密等处理
            requestHandler.success(res)
        },
        fail: function (error) {
            requestHandler.fail(error)
        },
        complete: function (res) {}
    })

}






module.exports = {
    tokenGet: tokenGet,
    tokenPost: tokenPost,
    apiGet:apiGet,
    apiPost:apiPost,
}

