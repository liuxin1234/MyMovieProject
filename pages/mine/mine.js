//index.js

import { apiUtil } from "../../utils/apiUtil.js";
import httpUtils from "../../utils/httpUtils.js";

//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        UserInfoData: {}
    },


    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        this.getUserInfoData();
    },

    //获取用户信息
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    //意见反馈
    onFeedBackClick: function (e) {
        httpUtils.GET({
            params: params,
            success: function (res) {
                console.log(res)
            },
            fail: function (error) {

            }
        })
    },


    //关于我们
    onAboutWeClick: function (e) {

    },

    //退出
    onSignOutClick: function (e) {
        wx: wx.redirectTo({
            url: '../login/login',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },


    /**
     * 获取个人信息
     */
    getUserInfoData() {
        var that = this;
        var userInfoTokenBean = wx.getStorageSync('userInfoTokenBean');
        var userId = userInfoTokenBean.userId;

        httpUtils.apiGet(apiUtil.UserDtoQueryUrl, {
            params: { "id": userId },
            success(res) {
                console.log(res.data);
                that.setData({
                    UserInfoData: res.data.Data
                })
            },
            fail(error) {
                console.log(error)
            }
        })
    },

})
