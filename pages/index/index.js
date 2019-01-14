//index.js
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    editMode: true,
    dialogText: '',
    dialogShow:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    jius:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function(){
    this.setData({
      jius: getApp().globalData.jiusData
    })
  },
  onLoad: function () {
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  shuffle: function (array) {
    var m = array.length,
    t, i;
    // 如果还剩有元素…
    while(m) {
      // 随机选取一个元素…
      i = Math.floor(Math.random() * m--);
      // 与当前元素进行交换
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  },
  startCatch: function(){
    if (this.data.jius.length < 2 ){
      util.showModel('错误','老哥,最少要两个阄呀');
      return;
    }

    this.setData({
      editMode: false
    })
    //开始洗牌
    this.setData({
      jius: this.shuffle(this.data.jius)
    });
  },
  endCatch: function () {
    var list = this.data.jius;
    list.forEach(e => e.isSelect = false)
    this.setData({
      editMode: true,
      jius: list
    })
  },
  showDialog: function(event){

    this.setData({
      dialogText: event.currentTarget.dataset.content.content,
      dialogShow: true
    });

    if (!this.data.editMode) {
      var list = this.data.jius;
      var id = parseInt(event.currentTarget.dataset.content.id);
      const target = list.find(e => e.id === id)
      target.isSelect = true
      this.setData({
        jius: list
      })
    }
  },
  closeDialog: function(){
    this.setData({
      dialogShow: false
    })
  },
  delete: function(event){
    var list = this.data.jius;
    list.splice(parseInt(event.target.dataset.index),1);
    app.globalData.jiusData = list;
    this.setData({
      jius: list
    })
  }
})
