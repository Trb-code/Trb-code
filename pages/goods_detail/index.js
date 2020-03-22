import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品id
    goods_id:"",
    // 商品详情数据
    goodsdata:[],
    // 商品详情轮播图
    prics:[]
  },
  // 点击预览图片
  imgclick:function(e){
    console.log(555)
    wx.previewImage({
  current: this.data.prics[0].pics_mid_url, // 当前显示图片的http链接
  urls: this.data.prics.map(v=>v.pics_mid_url) // 需要预览的图片http链接列表
})

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options)
  // 调用获取数据函数
     this.getgoodsid(options)

  },

// 获取商品列表闲情
getgoodsid:async function(params){
  let goodsdata= await request({
    url:"/goods/detail",
   data:
     params
   
  })
  console.log(goodsdata);
  this.setData({goodsdata:goodsdata.data.message})
  this.setData({prics:goodsdata.data.message.pics})

  
},

// 点击加入购物车
handleCartAdd:function(){
// 先看看本地有没有

let cart=wx.getStorageSync("cart")||[];
let index=cart.findIndex(v=>v.goods_id==this.data.goodsdata.goods_id)
console.log(index)

if(index===-1){

let goodslist=this.data.goodsdata
goodslist.num=1,
goodslist.check=true,
  cart.push(goodslist)
  // wx.setStorageSync("cart",cart)
}else{
 cart[index].num++
//  wx.setStorageSync("cart",cart)
}
wx.setStorageSync("cart",cart)
wx.showToast({
  title: '加入成功',
  icon: 'success'
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