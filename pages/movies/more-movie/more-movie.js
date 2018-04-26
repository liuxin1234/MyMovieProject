// pages/movies/more-movie/more-movie.js
var app = getApp();
var utils = require('../../../utils/util.js')

Page({

      /**
       * 页面的初始数据
       */
      data: {
            movies:{},
            navigateTitle: "",
            requestUrl: "",
            totalCount: 0,
            isEmpty: true,
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var category = options.category;
            this.data.navigateTitle = category;
            var dataUrl = "";
            switch (category) {
                  case "正在热映":
                        dataUrl = app.globalData.doubanBase +
                              "/v2/movie/in_theaters";
                        break;
                  case "即将上映":
                        dataUrl = app.globalData.doubanBase +
                              "/v2/movie/coming_soon";
                        break;
                  case "豆瓣Top250":
                        dataUrl = app.globalData.doubanBase +
                              "/v2/movie/top250";
                        break;
            }
            wx.setNavigationBarTitle({
                  title: this.data.navigateTitle,
            })
            this.data.requestUrl = dataUrl;
            utils.http(dataUrl,this.processDoubanData);
      },


      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function (event) {
            var refreshUrl = this.data.requestUrl + 
                  "?start=0&count=20" ;
            this.data.movies = {};
            this.data.isEmpty = true;
            this.data.totalCount = 0;
            utils.http(refreshUrl,this.processDoubanData);
            wx.showNavigationBarLoading()
      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
            var nextUrl = this.data.requestUrl +
                  "?start=" + this.data.totalCount + "&count=20";
            utils.http(nextUrl, this.processDoubanData);
            wx.showNavigationBarLoading();
      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      },


      processDoubanData:function(moviesDouban){
            console.log(moviesDouban);
            var movies = [];
            for(var idx in moviesDouban.subjects){
                  var subject = moviesDouban.subjects[idx];
                  var title = subject.title;
                  if(title.length >= 6){
                        title = title.substring(0,6) + "...";
                  }
                  var temp = {
                        stars: utils.convertToStarsArray(subject.rating.stars),
                        title:title,
                        average:subject.rating.average,
                        coverageUrl:subject.images.large,
                        movieId:subject.id,
                  }
                  movies.push(temp);
            }
            var totalMovies = {};
            //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
            if(!this.data.isEmpty){
                  totalMovies = this.data.movies.concat(movies);
            }else{
                  totalMovies = movies;
                  this.data.isEmpty = false;
            }
            this.setData({
                  movies: totalMovies
            });

            this.data.totalCount += 20;
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();

      },
})