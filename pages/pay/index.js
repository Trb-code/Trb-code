import {
  getSetting,
  openSetting,
  chooseAddress,
  requestPayment,
  showToast
} from "../../utils/asyncWx"
import { request } from "../../request/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[], //购物车信息
    address:{}, //地址信息
    totalprice:"", //总价格
    totalnum:"" //总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cart =wx.getStorageSync("cart")||[];
    let address=wx.getStorageSync("address")||{}
    this.setData({address})
    this.setcar(cart)
  },
// 已经有地址，但是重新选地址
handleAddressChange: async function(e){


  //   }
try{
  var that =this
  wx.chooseAddress({
  success (res) {
  //  console.log(res);
     res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo; 
     wx.setStorageSync("address", res);
     that.setData({address:res})
  }
})
}catch{
}

},

// 当没有收获地址
handleAddressChoose:async function(e){
 try {
      //通过 wx.getSetting获取当前用户拥有的权限
      //https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html
      const setting = await getSetting();
      // 判断一下用户有没有获取当前地址的权限 scope.address
      //打开微信的权限设置 看能不能直接设置地址权限
      if (!setting.authSetting["scope.address"]) {
        //打开设置授权页面
        await openSetting();
      }
      //获取用户的地址 wx.chooseAddress
      let res = await chooseAddress();
      //拼接地址
      res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo;
      //存到缓存和 this.data中
      wx.setStorageSync("address", res);
      this.setData({
        address:res
      })
      console.log(address);

      console.log(setting);
    } catch (e) {
      console.log(e);
    }
},

// 计算总的价格
  setcar:function(cart){
    let totalprice=0
    let totalnum=0
cart.forEach(v=>{
  if(v.check){
    
    totalprice+=v.num*v.goods_price
    totalnum+=v.num
  }
 
})
 this.setData({totalprice,totalnum,cart})
  },

// 点击支付实现支付流程
handlePay:async function(e){
let token=wx.getStorageSync("token")
if(!token){
  wx.navigateTo({
   url: '/pages/auth/index',
  })
}
// 支付流程
let order_price=this.data.totalprice //订单总价格
let consignee_addr=this.data.address.all //收货地址
 let goods=[]
let {cart} =this.data
 cart.forEach(v=>{
   if(v.check){
let parasm={}
parasm["goods_id"]=v.goods_id
parasm["goods_number"]=v.num
parasm["goods_price"]=v.goods_price
goods.push(parasm)
   }
 })

 const order =await request({
   url:'/my/orders/create',
   method:"post",
   data:{
     'order_price':order_price,
     'consignee_addr':consignee_addr,
     'goods':goods
   }
 })
 console.log(order);
 
const pay =await request({
  url:"/my/orders/req_unifiedorder",
  method:"post",
  data:{
    order_number:order.data.message.order_number
  }
})
console.log(pay);


// 调用微信支付  wx.requestPayment================================
wx.requestPayment({
  timeStamp: pay.data.message.pay.timeStamp,
  nonceStr: pay.data.message.pay.nonceStr,
  package:  pay.data.message.pay.package,
  signType:  pay.data.message.pay.signType,
  paySign:  pay.data.message.pay.paySign,
  success (res) { 

    console.log(res);
   wx.showToast({
  title: '支付成功',
  icon: 'success',
  duration: 5000
})

    //    wx.navigateTo({
    //   url:"/pages/order/index"
    // })
    
  },
  fail (res) { }
})
// 查询订单状态
 let resorder = await request({
        url: "/my/orders/chkOrder",
        method: "post",
        data: {
          order_number:order.data.message.order_number
        }
     
      });
      console.log(resorder);
      

     


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