(function($) {
	$.fn.scrollUpdate = function(scrollObject) {
		var id = scrollObject.id || '#wrapper',
			pullUpEle = scrollObject.pullUpEle || "#pullUp",
			pullUpLabel = scrollObject.pullUpLabel || ".pullUpLabel",
			tipInfo = scrollObject.tipInfo || "加载更多...",
			show_gotop = function() {};
		if(scrollObject.goTopEle && scrollObject.getClientRectEle) {
			show_gotop = function() {
				if(document.querySelector(scrollObject.getClientRectEle).getBoundingClientRect().top < 0) {
					$(scrollObject.goTopEle).show();
				} else {
					$(scrollObject.goTopEle).hide();
				};
			}
		}
		if(typeof echo !== 'undefined'){
			echo.init();
		}

		var pullUpAction;
		if(!scrollObject.pullUpAction) {
			return;
		}
		pullUpAction = scrollObject.pullUpAction;

		var myScroll, pullUpEle, pullUpLabel;
		var loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  
		var pullLoaded = function() {
			pullUpEle = $(pullUpEle);
			pullUpLabel = pullUpEle.find(pullUpLabel);
			pullUpEle['class'] = pullUpEle.attr('class');
			pullUpEle.attr('class', '').hide();

			myScroll = new IScroll(id, {
				probeType: 2, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
				scrollbars: true, //有滚动条  
				mouseWheel: true, //允许滑轮滚动  
				fadeScrollbars: true, //滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
				bounce: true, //边界反弹  
				interactiveScrollbars: true, //滚动条可以拖动  
				shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
				click: true, // 允许点击事件  
				keyBindings: true, //允许使用按键控制  
				momentum: true // 允许有惯性滑动  
			});

			//滚动时  
			myScroll.on('scroll', function() {
				show_gotop();
				if(loadingStep == 0 && !pullUpEle.attr('class').match('flip|loading')) {
					if(this.y < (this.maxScrollY - 5)) {
						//上拉刷新效果  
						pullUpEle.attr('class', pullUpEle['class'])
						pullUpEle.show();
						myScroll.refresh();
						pullUpEle.addClass('flip');
						pullUpLabel.html(tipInfo);
						loadingStep = 1;
					}
				}
			});
			
			//滚动完毕  
			myScroll.on('scrollEnd', function() {
				if(typeof echo !== 'undefined'){
					echo.init();
				}
				show_gotop();
				if(loadingStep == 1) {
					if(pullUpEle.attr('class').match('flip|loading')) {
						pullUpEle.removeClass('flip').addClass('loading');
						pullUpLabel.html('加载中……');
						loadingStep = 2;
						setTimeout(function() {
							var flag = pullUpAction();							
							pullUpEle.removeClass('loading');
							if(!flag){
								pullUpLabel.html("无更多数据...");
								return;
							}
							pullUpLabel.html(tipInfo);
							pullUpEle['class'] = pullUpEle.attr('class');
							pullUpEle.attr('class', '').hide();
							myScroll.refresh();
							loadingStep = 0;
						}, 1000);
					}
				}
			});

			$(".go_top").on('tap', function() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				    myScroll.scrollTo(0, 0);
				} 
				myScroll.scrollTo(0, 0, 1000, IScroll.utils.ease.circular);
			});
		}

		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);
		document.addEventListener("DOMContentLoaded", pullLoaded, false);
	};

})(Zepto);

//$("#wrapper").scrollUpdate({
//	id: "#wrapper", //iScroll初始化id，默认#wrapper
//	pullUpAction: pullUpAction, //上拉事件
//	pullUpEle: "#pullUp", //提示元素， 默认#pullUp
//	pullUpLabel: ".pullUpLabel", //提示信息元素， 默认#pullUp
//	tipInfo: '加载更多...',   //提示信息    
//	getClientRectEle: "#scroller", //getBoundingClientRect作用的元素
//	goTopEle: ".go_top" //返回首页
//});