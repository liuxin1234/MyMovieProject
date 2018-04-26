// pages/posts/post.js

var postsData = require('../../data/posts-data.js')

Page({

      /**
       * 页面的初始数据 ,小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
       * 而这个动作A的执行，是在onLoad函数执行之后发生的
       */
      data: {

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            //这里如果是进行了同步操作的话，可以直接使用this.data.xxx = xxx;进行赋值
            // this.data.postList = postsData.postList;

            //这里如果是进行了异步操作的话，就需要this.setData
            this.setData({
                  postList: postsData.postList
            });
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {

      },

      onPostTap: function (event) {
            var postId = event.currentTarget.dataset.postid;
            // console.log("on post id is" + postId);
            wx.navigateTo({
                  url: "post-detail/post-detail?id=" + postId
            })
      },

      onSwiperTap: function (event) {
            // target 和currentTarget
            // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
            // target这里指的是image，而currentTarget指的是swiper
            var postId = event.target.dataset.postid;
            wx.navigateTo({
                  url: "post-detail/post-detail?id=" + postId
            })
      }

})