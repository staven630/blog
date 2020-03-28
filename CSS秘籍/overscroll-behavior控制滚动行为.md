&emsp;&emsp;overscroll-behavior设置可以在滚动到内容的顶部/底部时覆盖浏览器的默认滚动行为(如：禁用移动端的pull-to-reflash功能、移除炫光和回弹效果)。

# 滚动链接
&emsp;&emsp;在页面中打开一个模态框，默认情况下，如果滚动到模态框内容的滚动限制，则低层页面将继续滚动。称为滚动链接。

# 特性
&emsp;&emsp;overscroll-behavior属性有3个值：

### auto
&emsp;&emsp;默认，元素的滚动会传播给祖先元素。

### contain
&emsp;&emsp;组织滚动链接。滚动不会传播给祖先，但会显示元素内的原生效果（如：Android上的炫光效果或IOS上的回弹效果），当用户触摸滚动边界时会通知用户。

&emsp;&emsp;overscroll-behavior:contain;设置在html元素上可防止滚动导航操作。

### none
&emsp;&emsp;和contain类似，但它也可以防止节点本身的滚动效果（Android上的炫光效果或IOS上的回弹效果）。


# 扩展阅读
* [控制滚动：自定义拉到刷新和溢出效果](https://developers.google.com/web/updates/2017/11/overscroll-behavior)
* [CSS overscroll-behavior：控制界面的滚动](https://blog.buddyweb.fr/css-overscroll-behavior-contr%C3%B4lez-le-scroll-de-vos-interfaces-d8754f0e68a6)