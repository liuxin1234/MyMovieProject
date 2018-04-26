// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({

      /**
       * 页面的初始数据
       */
      data: {
            isPlayingMusic: false,
            collected: {}
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var postId = options.id;
            this.data.currentPostId = postId;
            var postData = postsData.postList[postId];
            this.setData({
                  postData: postData
            });

            var postsCollected = wx.getStorageSync('posts_Collected');
            //判断一下 postsCollected是否存在。
            if (postsCollected) {
                  var postCollected = postsCollected[postId];
                  this.setData({
                        collected: postCollected
                  });
            } else {
                  //如果postsCollected对象为空的话，则赋值一个空的对象 并设置postid值为false
                  var postsCollected = {};
                  postsCollected[postId] = false;
                  wx.setStorageSync('posts_Collected', postsCollected);
            };

            if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
                  this.setData({
                        isPlayingMusic : true
                  });
            };

            this.setMusicMonitor();


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

      onCollectionTap: function (event) {
            // this.getPostsCollectedAsy();
           this.getPostsCollectedSyc();
           
      },

      //分享的方法
      onShareTap: function () {
            var itemList = [
                  '分享给微信好友',
                  '分享到朋友圈',
                  '分享到QQ',
                  '分享到微博'
            ];
            wx.showActionSheet({
                  itemList: itemList,
                  itemColor: '#405f80',
                  success: function (res) {
                        //res.cancel 用户是否是点击了取消按钮
                        //res.tapIndex 数组元素的序号，从0开始
                        wx.showModal({
                              title: '用户' + itemList[res.tapIndex],
                              content: '用户是否取消？' + res.cancel + '现在无法实现分享功能，什么时候能支持呢？',
                        })
                  },
                  fail: function (res) { },
                  complete: function (res) { },
            })
      },

      //收藏方式的 异步操作 方法
      getPostsCollectedAsy: function(){
            var that = this;
            wx.getStorage({
                  key: 'posts_Collected',
                  success: function(res) {
                        var postsCollected = res.data;
                        var postCollected = postsCollected[that.data.currentPostId];
                        //收藏变成未收藏，未收藏变成收藏
                        postCollected = !postCollected;
                        postsCollected[that.data.currentPostId] = postCollected;
                        // that.showModal(postsCollected, postCollected);
                        that.showToast(postsCollected, postCollected);
                  },
            })
      },

       //收藏方式的 同步操作 方法
      getPostsCollectedSyc: function(){
            var postsCollected = wx.getStorageSync('posts_Collected');
            var postCollected = postsCollected[this.data.currentPostId];
            //收藏变成未收藏，未收藏变成收藏
            postCollected = !postCollected;
            postsCollected[this.data.currentPostId] = postCollected;
            // this.showModal(postsCollected, postCollected);
            this.showToast(postsCollected, postCollected);
      },

      //显示showToast方法
      showToast: function (postsCollected, postCollected){
            //这里需要传递一个函数上下文：this
            var that = this;
            //更新文章是否有缓存值
            wx.setStorageSync('posts_Collected', postsCollected);
            //更新数据绑定变量，从而实现切换图片
            that.setData({
                  collected: postCollected
            })

            wx.showToast({
                  title: postCollected ? '成功收藏' : '取消收藏',
                  duration: 1000,
                  icon: 'success'
            })
      },

      //显示showModal方法
      showModal: function (postsCollected, postCollected){
            var that = this;
            wx.showModal({
                  title: '收藏',
                  content: postCollected?'收藏该文章？':'取消收藏该文章？',
                  showCancel: 'true',
                  cancelText: '取消',
                  cancelColor: '#333',
                  confirmText: '确认',
                  confirmColor: '#405f80',
                  success:function(res){
                        if(res.confirm){ //如果点击了确定按钮
                              //更新文章是否有缓存值
                              wx.setStorageSync('posts_Collected', postsCollected);
                              //更新数据绑定变量，从而实现切换图片
                              that.setData({
                                    collected: postCollected
                              })
                        }
                  }
      
            })
      },

      //播放音乐的方法
      onMusicTap: function(event){
            //当前播放的状态
            var isPlayingMusic = this.data.isPlayingMusic;
            var currentPostId = this.data.currentPostId;
            var postData = postsData.postList[currentPostId];
            if(isPlayingMusic){
                  wx.pauseBackgroundAudio();
                  this.setData({
                        isPlayingMusic: false,
                  })
            }else{
                  wx.playBackgroundAudio({
                        dataUrl: postData.music.url,
                        title: postData.music.title,
                        coverImgUrl: postData.music.coverImg,
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                  })
                  this.setData({
                        isPlayingMusic: true,
                  })
            }
            
      },

      //设置音乐播放暂停和播放 监听效果  点击播放图标和总控开关都会触发这个函数
      setMusicMonitor: function(){
            var that = this;
            wx.onBackgroundAudioPlay(function () {
                  that.setData({
                        isPlayingMusic: true,
                  });
                  app.globalData.g_isPlayingMusic = true;
                  app.globalData.g_currentMusicPostId = that.data.currentPostId;
            });
            wx.onBackgroundAudioPause(function () {
                  that.setData({
                        isPlayingMusic: false,
                  });
                  app.globalData.g_isPlayingMusic = false;
                  app.globalData.g_currentMusicPostId = null;
            });
            wx.onBackgroundAudioStop(function () {
                  that.setData({
                        isPlayingMusic: false,
                  });
                  app.globalData.g_isPlayingMusic = false;
                  app.globalData.g_currentMusicPostId = null;
            });
      },

})