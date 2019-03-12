//app.js
App({
  globalData: {
    siteBaseUrl: "https://store-test.91xdb.com/", //服务器url
    code:'',//获取token三大必要参数
    encryptedData:'',//获取token三大必要参数
    iv:'', //获取token三大必要参数
    token:'',
    userInfo:''
  },
    //app初始化函数
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


   // 获取系统状态栏信息
      wx.getSystemInfo({
          success: e => {
              this.globalData.StatusBar = e.statusBarHeight;
              let custom = wx.getMenuButtonBoundingClientRect();
              this.globalData.Custom = custom;
              this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
          }
      })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })


  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      "use strict";


    },

  /**
 * 封装请求函数
 */
  sendRequest: function (param, customSiteUrl) {
    let that = this;
    let data = param.data || {};
    let header = param.header;
    let requestUrl;
    data.token = that.globalData.token;
    // console.log(data.token)

    if (param.method == '' || param.method == undefined) {
      param.method = 'POST';
    }
    if (customSiteUrl) {
      requestUrl = customSiteUrl + param.url;
    } else {
      requestUrl = this.globalData.siteBaseUrl + param.url;
    }

    if (param.method) {
      if (param.method.toLowerCase() == 'post') {
        header = header || {
          'content-type': 'application/x-www-form-urlencoded;'
        }
      } else {
        data = this._modifyPostParam(data);
      }
      param.method = param.method.toUpperCase();
    }

    if (!param.hideLoading) {
      // this.showToast({
      //   title: '请求中...',
      //   icon: 'loading'
      // });
    }

    wx.showLoading({
      title: '加载中',
      success: function () {
        wx.request({
          url: requestUrl,
          data: data,
          method: param.method || 'GET',
          header: header || {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            //请求失败
            if (res.statusCode && res.statusCode != 200) {
              that.hideToast();
              /*that.showModal({
                content: '' + res.errMsg
              });*/
              typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
              return;
            }
            typeof param.success == 'function' && param.success(res.data);
            let code = res.data.code;
            let message = res.data.message;
            if (code == -50) {
              that.showModal({
                content: message,
                url: '/pages/index/index'
              })
            } else if (code == -10) {
              that.showModal({
                content: message,
                code: -10,
              })
            }
            //console.log(res);
          },
          fail: function (res) {
            that.hideToast();
            wx.hideLoading();
            that.showModal({
              content: '请求失败,请检查网络',
            })
            typeof param.fail == 'function' && param.fail(res.data);
          },

          complete: function (res) {
            param.hideLoading || that.hideToast();
            typeof param.complete == 'function' && param.complete(res.data);
          }
        });
      }
    })
  },
  //隐藏加载提示
  hideToast: function () {
    wx.hideToast();
  },
  //模态框提示
  showModal: function (param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
          let pages = getCurrentPages();
          if (param.url != '' && param.url != undefined && pages.length < 2) {
            wx.switchTab({
              url: param.url,
            })
          } else if (param.code == -10) {
            wx.navigateBack({
              delta: 1
            })
          }

        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  /**
 * 图片路径处理
 */
  IMG: function (img) {
    let base = this.globalData.siteBaseUrl;
    img = img == undefined ? '' : img;
    img = img == 0 ? '' : img;
    if (img.indexOf('http://') == -1 && img.indexOf('https://') == -1 && img != '') {
      img = base + img;
    }
    return img;
  },

 
})