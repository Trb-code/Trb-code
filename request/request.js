// 封装请求库
// 引入基准路径

// 添加遮罩
import {baseurl} from "./baseurl"

export const request=(params)=>{
    wx.showLoading({
        title:"加载中",
        mask:true
    })
// 结构是否有head
let header={...params.header}
if(params.url.includes("/my/")){

     header["Authorization"]=wx.getStorageSync("token")    
      
}
return new Promise(function(resovle,reject){
    wx.request({
        ...params,
        url:baseurl+params.url,
        header:header,
         success (res) {
   resovle(res)
  },
  fail(res){
      reject(res)
  },
  complete(res){
    wx.hideLoading();    
  }
    })
    

})

}
