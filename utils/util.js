/**
 * 设置心心的亮起数量
 */
function convertToStarsArray(stars) {
      var num = stars.toString().substring(0, 1);
      var array = [];
      for (var i = 1; i <= 5; i++) {
            if (i <= num) {
                  array.push(1);
            } else {
                  array.push(0);
            }
      }
      return array;
}

/**
 * 豆瓣数据网络请求
 */
function http(url, callBack) {
      wx.request({
            url: url,
            header: {
                  "Content-Type": "json"
            },
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                  callBack(res.data)
            },
            fail: function (error) {
                  console.log(error)
            },
            complete: function (res) { },
      })
}

/**
 * 将电影主演人员用"/"分开
 */
function convertToCastString(casts){
      var castsjoin = "";
      for(var idx in casts){
            castsjoin = castsjoin + casts[idx].name + "/";
      }
      return castsjoin.substring(0,castsjoin.length - 2 );
}

/**
 * 这里设置影人的个人信息 数组
 */
function convertToCastInfos(casts){
      var castsArray = [];
      for(var idx in casts){
            var cast = {
                  img: casts[idx].avatars ? casts[idx].avatars.large:"",
                  name: casts[idx].name
            }
            castsArray.push(cast);
      }
      return castsArray;
}

/**
 * 设置根据以保存的用户名和密码来再次请求票据token
 */




module.exports = {
      http: http,
      convertToStarsArray: convertToStarsArray,
      convertToCastString: convertToCastString,
      convertToCastInfos: convertToCastInfos
}
