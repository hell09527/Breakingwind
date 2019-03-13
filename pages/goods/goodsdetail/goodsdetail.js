const app = getApp();
var wxParse = require('../../../wxParse/wxParse.js');
var time = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [{
      id: 0,
      url: 'https://image.weilanwl.com/img/4x3-1.jpg'
    }, {
        id: 1,
        url: 'https://image.weilanwl.com/img/4x3-2.jpg'
      }, {
        id: 2,
        url: 'https://image.weilanwl.com/img/4x3-3.jpg'
      }, {
        id: 3,
        url: 'https://image.weilanwl.com/img/4x3-4.jpg'
      }, {
        id: 4,
        url: 'https://image.weilanwl.com/img/4x3-2.jpg'
      }, {
        id: 5,
        url: 'https://image.weilanwl.com/img/4x3-4.jpg'
      }, {
        id: 6,
        url: 'https://image.weilanwl.com/img/4x3-2.jpg'
      }],
    indicatorDots: false,
    // vertical: true, 上下轮播
    autoplay: true,
    circular: true, //无缝链接
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
    let window_width = wx.getSystemInfoSync().windowWidth;
    _this.setData({
      swiperHeight: window_width
    })
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

  }
})