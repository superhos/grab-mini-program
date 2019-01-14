//index.js
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    addText : ''
  },
  changeText:function(e){
    this.setData({
      addText: e.detail.value
    })
  },
  add: function(){
    if (this.data.addText.length === 0){
      util.showModel('错误','内容不能为空哟');
      return false;
    }

    if (app.globalData.jiusData.find(e => e.content === this.data.addText))    {
      util.showModel('错误', '这个阄已经存在了哟');
      return false;
    } 

    app.globalData.jiusData.push({
      id: app.globalData.jiusData.length+1,
      content:this.data.addText,
      isSelect: false
    })

    wx.navigateBack();
  }
});