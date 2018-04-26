// pages/home/home.js
import httpUtils from "../../utils/httpUtils.js";
import { apiUtil } from "../../utils/apiUtil.js";
import { constant } from "../../utils/constant"

Page({

      /**
       * 页面的初始数据
       */
      data: {

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            this.getContractData();
            this.getContentDetailsData();
            this.getCommonApplicationData();
            this.getAppModuleAll();
            this.getUserHolidayData();

      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {

      },


      //获取项目合同，发票数据
      getContractData() {
            var that = this;
            httpUtils.apiGet(apiUtil.ContractDataUrl, {
                  params: {},
                  success(res) {
                        console.log(res.data);
                        var contractData = res.data.Data;
                        that.setData({
                              ContractData: contractData,
                        })
                  },
                  fail(error) {

                  }
            })
      },



      //获取通知公告列表信息
      getContentDetailsData() {
            var that = this;
            let sorts = { 'SortIndex': 'desc', 'PubDateTime': 'desc' };
            let data = {
                  'CategoryId': constant.CONTENT_ID, 'IsEnabled': true,
                  'IsPermission': true, 'PageSize': 3, 'PageIndex': 1, 'Sorts': sorts
            };

            httpUtils.apiPost(apiUtil.ContentListQueryUrl, {
                  params: JSON.stringify(data),
                  success(res) {
                        console.log(res.data);
                        var contentListDataRows = res.data.Data.Rows;

                        var contentArrayData = [];
                        for (var idx in contentListDataRows) {
                              var data = contentListDataRows[idx];
                              var id = data.Id;
                              var contentName = data.ContentName;
                              var pubDateTime = data.PubDateTime.split(' ')[0];
                              var temp = {
                                    id: id,
                                    contentName: contentName,
                                    pubDateTime: pubDateTime,
                              }
                              contentArrayData.push(temp);
                        }
                        that.setData({
                              ContentListDataRows: contentListDataRows,
                              ContentArrayData: contentArrayData,
                        })
                  },
                  fail(error) {

                  }
            })
      },

      //获取常见应用数据
      getCommonApplicationData() {
            var that = this;
            httpUtils.apiPost(apiUtil.AppModuleCommonUrl, {
                  params: {},
                  success(res) {
                        console.log(res.data)
                        var commonApplicationData = res.data.Data;
                        that.setData({
                              CommonApplicationData: commonApplicationData
                        })
                  },
                  fail(res) {

                  }
            })
      },

      //获取所有应用的数据
      getAppModuleAll() {

      },

      //获取本月寿星的数据
      getUserHolidayData() {
            var that = this;
            var date = new Date;
            var month = date.getMonth() + 1;
            console.log(month);
            httpUtils.apiGet(apiUtil.UserHolidayUrl, {
                  params: { "month": month },
                  success(res) {
                        console.log(res.data);
                        var userHolidayData = res.data.Data;
                        var headImgUrl = apiUtil.HEAD_IMG_URL;
                        that.setData({
                              UserHolidayData: userHolidayData,
                              HeadImgUrl: headImgUrl
                        });
                        
                  },
                  fail(error) {

                  }
            })
      }

});