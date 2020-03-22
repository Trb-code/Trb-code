
import {request} from "../../request/request"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:[],
    leftindex:"0"

  },
// 点击左边列表
leftbindtap:function(e){
  // console.log(e.currentTarget.dataset.index)
  
  this.setData({leftindex:e.currentTarget.dataset.index})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 提升用户体验
  const bendicate= wx.getStorageSync("bendicate");
  if(!bendicate){
    this.getlistdata()
  }else{
    if(Date.now() - bendicate.time>10000){
       this.getlistdata()
    }else{
      this.setData({listdata:bendicate.bendidata})
    }
    
  }
  


  },
// 获取分类数据
getlistdata: async function(e){
  const listdata=await request({
    url:"/categories"
  })
  // console.log(listdata);
  
  this.setData({listdata:listdata.data.message})
// 本地储存数据
 wx.setStorageSync("bendicate",{
   time:Date.now(),
   bendidata:listdata.data.message
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
console.log('55');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})