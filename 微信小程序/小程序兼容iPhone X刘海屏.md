### app.js中获取设备信息
```
App({
 onLaunch: function (options) {
     // 获取设备信息
     wx.getSystemInfo({
       success: res => {
         this.globalData.is_ipx = res.model.search('iPhone X')  !== -1；
       }
     });
   },
    globalData: {
     is_ipx: false
    }
});
```
### page页面设置is_ipx变量
```
const app = getApp();

Page({
    data: {
        is_ipx: app.globalData.is_ipx,
    }
});
```
### wxml末尾添加
```
<view class="ipx-wrapper" wx:if="{{ipx}}"></view>
```
### 设置wxss样式
```
.ipx-wrapper{
  height: 68rpx;
}

.ipx-wrapper::after {
  content: '';
  display: block;
  position: fixed;
  bottom: 0 !important;
  height: 68rpx !important;
  width: 100%;
  background: #f6f6f6;
  z-index: 500000;
}
```