// pages/login/login.js
var httpUtils = require('../../utils/httpUtils.js');
import MD5Util from '../../utils/md5Util';

Page({

      /**
       * 页面的初始数据
       */
      data: {
            tvUserName: {},
            tvPassWord: {},
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {

      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },



      //用户名确定事件
      onBindInputUserName: function (e) {
            var tvUserName = e.detail.value;
            this.setData({
                  tvUserName: tvUserName,
            })
            console.log(this.data.tvUserName)
      },



      //密码确定事件
      onBindInputPassWord: function (e) {
            var tvPassWord = e.detail.value;
            this.setData({
                  tvPassWord: tvPassWord,
            })
      },



      //登录
      onLoginClick: function (e) {

            var params = "grant_type=password" + "&" + "username=" + this.data.tvUserName + "&" + "password=" + MD5Util.hexMD5(this.data.tvPassWord);

            httpUtils.tokenPost({
                  params: params,
                  success(res) {
                        console.log(res.data);
                        wx.setStorageSync('userInfoTokenBean', res.data);
                        wx.setStorageSync('userName', this.data.tvUserName);
                        wx.setStorageSync('passWord', this.data.tvPassWord);
                        wx.switchTab({
                              url: '../home/home',
                        })
                  },
                  fail(error) {
                        console.log(error.toString());
                  }
            })

      }


})