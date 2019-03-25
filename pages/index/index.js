//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cardCur: 0,
    tower: [{
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
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol: 3,
    skin: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    that.indexInit();
  },

  /**
   * 图片路径处理
   */
  IMG: function (img) {
    let base = app.globalData.siteBaseUrl;
    img = img == undefined ? '' : img;
    img = img == 0 ? '' : img;
    if (img.indexOf('http://') == -1 && img.indexOf('https://') == -1 && img != '') {
      img = base + img;
    }
    return img;
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad: function (options) {
    let that = this;
    app.sendRequest({
      url: "api.php?s=goods/getDefaultImages",
      data: {},
      success: function (res) {
        let code = res.code;
        let data = res.data;
        if (code == 0) {
          that.data.defaultImg = data;
          that.indexInit(that);
        }
      }
    });
    app.sendRequest({
      url: "index.php?s=/api/index/getindeximglist",
      data: {},
      success: function (res) {
        var shop = res;
        for (let index in shop) {
          let img = shop[index].imgUrl;
          shop[index].imgUrl = app.IMG(img);
        }
        that.setData({
          shop: shop
        })
      }
    });
    },
  listClick: function (event) {
    let url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/pages' + url,
    })
  },
  /**
 * 首页初始化
 */
  indexInit: function (that) {
    let base = app.globalData.siteBaseUrl;
    let timeArray = {};

    app.sendRequest({
      url: 'api.php?s=index/getIndexData',
      data: {},
      success: function (res) {
        // console.log(res)
        let code = res.code;
        let indicatorDots = true;
        if (code == 0) {
          let data = res.data;
          //当前时间初始化
          let current_time = data.current_time;
          that.setData({
            current_time: current_time
          })

          //广告轮播初始化
          if (data.adv_list != undefined && data.adv_list.adv_index != undefined && data.adv_list.adv_index.adv_list != undefined) {
            let adv_index = data.adv_list.adv_index;
            let adv_list = adv_index.adv_list;

            if (adv_list.length == 1) {
              indicatorDots = false;
            }
            if (adv_index.is_use != 0) {
              for (let index in adv_list) {
                let img = adv_list[index].adv_image;
                adv_list[index].adv_image = that.IMG(img);
              }
            } else {
              adv_list = [];
            }
            that.setData({
              imgUrls: adv_list,
              swiperHeight: adv_index.ap_height
            })
          } else {
            that.setData({
              imgUrls: [],
            })
          }
          //优惠券初始化
          for (let index in data.coupon_list) {
            data.coupon_list[index].status = 1;
          }
          //限时折扣初始化
          let discount_list = data.discount_list.data;
          for (let index in discount_list) {
            let img = discount_list[index].picture.pic_cover_small;
            discount_list[index].picture.pic_cover_small = that.IMG(img);
            timeArray[index] = {};
            timeArray[index].end = 0;
            timeArray[index].end_time = discount_list[index].end_time;
            that.timing(that, timeArray, index);
          }
          //商品楼层图片处理
          // console.log(data);
          let four_list = data.four_list;
          let block_list = data.block_list;
          let top_list = data.top_goods_list;
          let index_goods_list = data.index_goods_list;
          console.log(index_goods_list );
          let new_pro = data.new_pro;
          let small_sample_list = data.small_sample_list;
          let exponent = "";

          for (let index in small_sample_list) {
            let img = small_sample_list[index].pic_cover_big;
            small_sample_list[index].pic_cover_small = that.IMG(img);
            small_sample_list[index].exponent = exponent;
          }

          for (let index in top_list) {
            let img = top_list[index].pic_cover_big;
            exponent = (parseInt(top_list[index].material_black) + parseInt(top_list[index].material_black) + parseInt(top_list[index].effect_black)) / 3
            top_list[index].pic_cover_small = that.IMG(img);
            top_list[index].exponent = exponent;
            that.setData({
              exponent: exponent
            })
          }

          for (let index in index_goods_list) {
            let img = index_goods_list[index].pic_cover_big;
            exponent = (parseInt(index_goods_list[index].material_black) + parseInt(index_goods_list[index].material_black) + parseInt(index_goods_list[index].effect_black)) / 3
            index_goods_list[index].pic_cover_small = that.IMG(img);
            index_goods_list[index].exponent = exponent
            that.setData({
              exponent: exponent
            })
          }


          for (let index in block_list) {
            for (let key in block_list[index].goods_list) {
              let img = block_list[index].goods_list[key].pic_cover_small;
              block_list[index].goods_list[key].pic_cover_small = that.IMG(img);
            }
          }
          let sqk_alls = data.block_list[0];


          //(某一个品牌的商品)
          // let mei_alls = data.block_list[2].goods_list;


          that.setData({
            Base: base,
            indicatorDots: indicatorDots,
            index_notice: data.notice.data,
            goods_platform_list: data.goods_platform_list,
            sqk_alls: '',
            block_list: block_list,
            // mei_alls: mei_alls,
            top_list: top_list,  //Top10
            index_goods_list: index_goods_list,   //商品列表
            new_pro: new_pro,   //新品推荐
            topShopsIcon: data.icon,
            coupon_list: data.coupon_list,
            discount_list: discount_list,
            small_sample_list: small_sample_list,
            four_list: four_list,
          });
        }
        // console.log(res);
      }
    })
  },
  location:function(){
    wx.getLocation({
      success: res => {
        console.log(res)
      }
    })
  }
})
