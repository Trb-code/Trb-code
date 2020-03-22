
import {request} from "../../request/request.js"
Page({
  data: {
    // 轮播图
    swiperlist:[]
  },
  
  onLoad: function(options) {
this.getswiperlist()
},
// 轮播图数据
getswiperlist:async function(e){
  const swiperlist= await request({
    url:"/home/swiperdata"
  })
  console.log(swiperlist)
  this.setData({
    swiperlist:swiperlist.data.message
  })
  

},






    
  
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {
   console.log(44);
   
    

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  