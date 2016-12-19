# scrollUpdate移动端上拉刷新
## 基于iscroll-probe和zepto/jquery的移动端滚动，上拉刷新组件scrollUpdate.js
### $("#wrapper").scrollUpdate({
###		id: "#wrapper", //iScroll初始化id，默认#wrapper
###		pullUpAction: pullUpAction, //上拉事件
###		pullUpEle: "#pullUp", //提示元素， 默认#pullUp
###		pullUpLabel: ".pullUpLabel", //提示信息元素， 默认#pullUp
###		tipInfo: '加载更多...',   //提示信息  
###		getClientRectEle: "#scroller", //getBoundingClientRect作用的元素
###		goTopEle: ".go_top" //返回首页
###});