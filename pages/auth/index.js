import {request} from "../../request/request"
import{login} from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
getUserInfotap:async function(e){
try{
  console.log(e);
  let{ encryptedData,iv,rawData,signature}=e.detail
  // 获取code

let {code}=  await login()
// 获取token
let res =await request({
  url:"/users/wxlogin",
  method:"POST", 
  data:{
    encryptedData,
    rawData,
   iv,
    signature,
    code
  }
})
console.log(res)
wx.setStorageSync("token", res.data.message.token);
  

}catch{

}
  
  

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