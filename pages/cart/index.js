// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],//购物车数据
    totalprice:"", //总价
    totalnum:"", //总数
     allcheck:false
  },
// 点击全选
handleAllChecked:function(e){
let {allcheck,cart}=this.data
allcheck=!allcheck
cart.forEach(v=>v.check=allcheck)
this.setcar(cart)
},



// 点击左边选中图标
check:function(e){
   let {goods_id}=e.currentTarget.dataset
  //  let {cart}=this.data
  console.log(e.currentTarget.dataset);
  
   let cart=wx.getStorageSync("cart")
  let index= cart.findIndex(v=>v.goods_id==goods_id)
  cart[index].check= !cart[index].check
  this.setcar(cart)



},


handjiajian:function(e){
  var that=this
 let {goods_id,oper}=e.currentTarget.dataset
//  let cart=wx.getStorageSync("cart")
 let {cart}=this.data
 let index=cart.findIndex(v=>v.goods_id==goods_id)
//  console.log(index)


if(oper== -1){
  cart[index].num--
  if(cart[index].num==0){
 wx.showModal({
  title: '提示',
  content: '确定删除',
  success (res) {
    if (res.confirm) {  
   cart.splice(index,1)
   that.setcar(cart)
   wx.setStorageSync("cart",cart)
    
    } 
  }
})
}
}else{
  cart[index].num+=1
}
   that.setcar(cart)
   wx.setStorageSync("cart",cart)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
// 函数cart为了计算总价格，全选
  setcar:function(cart){
    let totalprice=0
    let totalnum=0
    let allcheck=true
   cart.forEach(v=>{
     if(v.check){
       totalnum+=v.num
totalprice+=v.goods_price*v.num
     }else{
     allcheck=false
     }
   })
  
   
 this.setData({  
    cart,totalnum,totalprice,allcheck
     })
     wx.setStorageSync("cart",cart)

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
    let cart= wx.getStorageSync("cart")||[];
  this.setcar(cart)
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