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
    nextMargin: 0,
    isTouchMove :false
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
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    // var data = this.data.cart_list;
    // for (let index in data) {
    //   for (let key in data[index]) {
    //     data[index][key].isTouchMove = false
    //   }
    // }
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      // cart_list: data,
    })
  },
  /**
 * 计算滑动角度
 * @param {Object} start 起点坐标
 * @param {Object} end 终点坐标
 */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
   
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    var isTouchMove = that.data.isTouchMove;
    // var data = this.data.cart_list;
    // for (let i in data) {
    //   for (let key in data[i]) {
        // console.log(index,key)
        // console.log(data[i][key].isTouchMove)
        //滑动超过30度角 return
        if (Math.abs(angle) > 30) return;
     
          // console.log(touchMoveX > startX);
          if (touchMoveX > startX) //右滑
            isTouchMove = false
          else //左滑
           isTouchMove = true
        
    //   }
    // }
    // that.data.cart_list.forEach(function (v, i) {
    //   v.isTouchMove = false
    //   //滑动超过30度角 return
    //   if (Math.abs(angle) > 30) return;
    //   if (i == index) {
    //     if (touchMoveX > startX) //右滑
    //       v.isTouchMove = false
    //     else //左滑
    //       v.isTouchMove = true
    //   }
    // })
    //更新数据
    that.setData({
      isTouchMove
    })
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