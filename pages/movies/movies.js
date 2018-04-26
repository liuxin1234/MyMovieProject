// pages/movies/movies.js
var utils = require('../../utils/util.js')
var app = getApp();

Page({

      /**
       * 页面的初始数据 ，注意再做数据绑定的时候记住要写一下初始值
       */
      data: {
            inTheaters: {},
            comingSoon: {},
            top250: {},
            searchResult: {},
            containerShow: true,    //用来判断是否显示电影页
            searchPanelShow: false, //用来判断是否隐藏搜索框
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var inTheatersUrl = app.globalData.doubanBase +
                  "/v2/movie/in_theaters" + "?start=0&count=3";
            var comingSoonUrl = app.globalData.doubanBase +
                  "/v2/movie/coming_soon" + "?start=0&count=3";
            var top250Url = app.globalData.doubanBase +
                  "/v2/movie/top250" + "?start=0&count=3";

            this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
            this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
            this.getMovieListData(top250Url, "top250", "豆瓣Top250");

      },

      //取消搜索
      onCancellmgTap: function(event){
            this.setData({
                  containerShow: true,
                  searchPanelShow: false,
                  searchResult: {},
            })
      },

      //触摸到焦点
      onBindFocus: function(event){
            this.setData({
                  containerShow: false,
                  searchPanelShow: true
            })
      },

      //完成点击键盘上的搜索按钮
      onBindConfirm: function(event){
           var text = event.detail.value;
           var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
           this.getMovieListData(searchUrl,"searchResult","");
      },


      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      //更多点击事件
      onMoreTap: function (event) {
            var category = event.currentTarget.dataset.category;
            wx.navigateTo({
                  url: "more-movie/more-movie?category=" + category
            })
      },

      //电影点击事件
      onMovieTap: function (event) {
            var movieId = event.currentTarget.dataset.movieid;
            wx.navigateTo({
                  url: "movie-detail/movie-detail?id=" + movieId
            })
      },

      getMovieListData: function (url, settedKey, categoryTitle) {
            var that = this;
            wx.request({
                  url: url,
                  header: {
                        'Content-Type': 'json'
                  },
                  method: 'GET',
                  success: function (res) {
                        that.prosessDoubanData(res.data, settedKey, categoryTitle);
                  },
                  fail: function (error) {
                        console.log(error);
                  },
                  complete: function (res) {

                  },
            })
      },

      prosessDoubanData: function (moviesDouban, settedKey, categoryTitle) {
            var movies = [];
            for(var idx in moviesDouban.subjects){
                  var subject = moviesDouban.subjects[idx];
                  var title = subject.title;
                  if(title.length >= 6){
                        title = title.substring(0.6) + "...";
                  }
                  var temp = {
                        stars: utils.convertToStarsArray(subject.rating.stars),
                        title: title,
                        average: subject.rating.average,
                        coverageUrl: subject.images.large,
                        movieId: subject.id,
                  }
                  movies.push(temp);
            }
            //下面写法是JS的基本功操作
            var readyData = {};
            readyData[settedKey] = {
                  categoryTitle: categoryTitle,
                  movies:movies
            }
            this.setData(readyData);
      },

      

})