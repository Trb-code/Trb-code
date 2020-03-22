import { request } from "../../request/request"

// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:[{
      id:"1",
      name:"综合"
    },
    {
      id:"2",
      name:"销量"
    },
    {
      id:"3",
      name:"价格"
    }
  ],
  goodindex:'0',
goodslistdata:{
  pagenum:1,
  pagesize:15
},
// 首页数据
goodsindexdata:[]
  },
  titlehand:function(e){
    // console.log(e);
    this.setData({goodindex:e.currentTarget.dataset.index})
    
  },

  // 首页数据渲染
  goodslist:async function(params){
const goodslist=await request({
  url:"/goods/search",
  data:this.data.goodslistdata
  // data:params
})
console.log(goodslist);
this.setData({goodsindexdata:goodslist.data.message.goods})

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
console.log(options);

// 如果是点击跳转会带上cid，将icd属性加到对象中
const page=getCurrentPages()

 const currpage=page[page.length-1]
 console.log(currpage);
 let {cid,query}=currpage.options

 if(cid){
    this.data.goodslistdata['cid']=cid
 }
 
 if(query){
   this.data.goodslistdata['query']=query
 }
  
this.goodslist(options)
    

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
 this.data.goodslistdata.pagenum=1
    this.goodslist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  this.data.goodslistdata.pagesize+=15
  this.goodslist()
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})