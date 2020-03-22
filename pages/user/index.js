var QQMapWX = require('../../sdk/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前城市定位
    city:"",
  markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: "",
      longitude: "",
      width: 50,
      height: 50
    }],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
 qqmapsdk = new QQMapWX({
            key: 'DUTBZ-RRNCD-Q4G4F-HJMLF-WHFRT-VOF4Y'
        });
    var that = this
 wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        console.log(res);     
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
 qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
          console.log(res['result']['address_component']['city']);//获取市名称
that.setData({city:res['result']['address_component']['city']})
          },
        })
      }  
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