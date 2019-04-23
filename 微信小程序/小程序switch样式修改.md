小程序switch样式修改
```
.wx-switch-input{
    width:82rpx !important;
    height:40rpx !important;
}
/*白色样式（false的样式）*/
.wx-switch-input::before{
    width:78rpx !important;
    height: 37rpx !important;
}
/*绿色样式（true的样式）*/
.wx-switch-input::after{
    width: 40rpx !important;
    height: 36rpx !important;
}
```