/**
 * @author  : hahnzhu
 * @version : 0.2
 * @date    : 2014-09-17
 * @repository: https://github.com/hahnzhu/parallax.js
 */
window.stopDirec=0;
if (typeof Zepto === 'undefined') { throw new Error('Parallax.js\'s script requires Zepto') }

!function($) {

//  'use strict';

    var startPos,           // 开始触摸点(X/Y坐标)
        endPos,             // 结束触摸点(X/Y坐标)
        stage,              // 用于标识 onStart/onMove/onEnd 流程的第几阶段，解决 onEnd 重复调用
        offset,             // 偏移距离
        direction,			// 翻页方向

        curPage, 			// page 当前页
        pageCount,          // page 数量
        pageWidth,          // page 宽度
        pageHeight,         // page 高度
        
        temp = 0,
        $prevPage,
        $curPage,
        $nextPage,
        
        $pages,             // page 外部 wrapper
        $pageArr,           // page 列表
        $animateDom,		// 所有设置 [data-animate] 的动画元素

        options,            // 最终配置项

        touchDown = false,  // 手指已按下 (取消触摸移动时 transition 过渡)
        movePrevent = true, // 阻止滑动 (动画过程中手指按下不可阻止)
        isFirst=true;



    // 定义实例方法 (jQuery Object Methods)
    // ==============================
    $.fn.parallax = function(opts) {
        options = $.extend({}, $.fn.parallax.defaults, opts);

        return this.each(function() {
            $pages = $(this);
            $pageArr = $pages.find('.page');

            init();
        })
    }


    // 定义配置选项
    // ==============================

    $.fn.parallax.defaults = {

        direction: 'vertical',  // 滚动方向, "horizontal/vertical"
        swipeAnim: 'default',   // 滚动动画，"default/cover"
        drag: true,             // 是否有拖拽效果
        loading: false,         // 是否需要加载页
        indicator: false,       // 是否要有指示导航
        arrow: false,           // 是否要有箭头
        onchange: function(){}, // 回调函数
        orientationchange: function(){}	// 屏幕翻转

    };



    function init() {
    	
		curPage 	= 0;
		movePrevent = false;
		direction	= 'stay';
        pageCount   = $pageArr.length;           	// 获取 page 数量
        pageWidth   = $(window).width();         	// 获取手机屏幕宽度
        pageHeight  = $(window).height();       	// 获取手机屏幕高度
        $animateDom = $('[data-animation]');// 获取动画元素节点
        var gameindex=$(".pages .page").index($(".page-game"));

        if($.fn.cookie("code")){
            curPage=gameindex;
        }
        for (var i=0; i<pageCount; i++) {          // 批量添加 data-id
            $($pageArr[i]).attr('data-id', i+1);
        }

        $pages.addClass(options.direction)		// 添加 direction 类
            	.addClass(options.swipeAnim);  	// 添加 swipeAnim 类

        $pageArr.css({                    		// 初始化 page 宽高
            'width': pageWidth + 'px'
            // 'height': pageHeight + 'px'
        });
        
        $($pageArr[curPage]).addClass('current');
        options.onchange(curPage, $pageArr[curPage], direction);
        animShow();
    }



    // 手指第一次按下时调用
    // 提供的接口：
    //  1. 初始位置 startPos
    // ==============================

    function onStart(e) {
	   

        if (movePrevent === true) {
            event.preventDefault();
            return false;
        }
      
        if(window.stopDirec==3){
      
            return;
        }
        // console.log('curpage:'+curPage+', pageCount:'+pageCount);
        
        stage = 1;
        touchDown = true;	// 手指已按下
        $pageArr.addClass('drag');    // 阻止过渡效果
        options.direction === 'horizontal' ? startPos = e.pageX : startPos = e.pageY;

    }




    // 移动过程中调用（手指没有放开）
    // 提供的接口：
    //  1. 实时变化的 endPos
    //  2. 添加方向类 forward/backward
    // ==============================

    function onMove(e) {

        if(movePrevent === true || touchDown === false){
            event.preventDefault();
            return false;
        }

        stage = 2;
        event.preventDefault();
        options.direction === 'horizontal' ? endPos = e.pageX : endPos = e.pageY;
        
        if((curPage==0||!curPage)&&isFirst){

            window.stopDirec=2;
        }
        if(window.stopDirec==1){
            if(endPos - startPos<0){
               stage = 1
                return ;
            }
        }
        if(window.stopDirec==2){
            if(endPos - startPos>0){
                stage = 1
                return ;
            }
        }
        if(window.stopDirec==3){
            stage=1;
            return;
        }
        addDirecClass();    // 添加方向类

        temp = endPos - startPos;
        
        if (temp < 0) {
        	curPage === 0 ? $prevPage = $($pageArr[pageCount-1]) :
							$prevPage = $($pageArr[curPage-1]);
		
 			curPage === pageCount-1 ? $nextPage = $($pageArr[0]) :
 								 	  $nextPage = $($pageArr[curPage+1]);
        }
        else {
        	curPage === 0 ? $prevPage = $($pageArr[pageCount-1]) :
						$prevPage = $($pageArr[curPage-1]);
		
 			curPage === pageCount-1 ? $nextPage = $($pageArr[0]) :
 								  	$nextPage = $($pageArr[curPage+1]);
        }
		
        $curPage = $($pageArr[curPage]);
        
        
        if (temp < 0) {
        	$nextPage.addClass('mov');
        	$nextPage.css({'-webkit-transform': 'translateY('+(pageHeight+temp)+'px)'});
        	$curPage.css({'-webkit-transform': 'translateY('+temp+'px)'});
        }
        else {
        	$prevPage.addClass('mov');
        	$prevPage.css({'-webkit-transform': 'translateY('+(-pageHeight+temp)+'px)'});
        	$curPage.css({'-webkit-transform': 'translateY('+temp+'px)'});
        }

//      console.log('prevPage:'+$prevPage.data('id'));
//      console.log('curPage:'+$curPage.data('id'));
//      console.log('nextPage:'+$nextPage.data('id'));
        
    }




    // 手指放开后调用
    // 提供的接口：
    //  1. 获得最后的坐标信息 endPos
    //
    // 执行的操作：
    //  1、将页面归位（前后一页或者原位）
    //  2、为 indicator 添加 current 类
    // ==============================

    function onEnd(e) {

        if (movePrevent === true || stage !== 2){
            // event.preventDefault();
            // return false;
        } else {
        	
        	stage = 3;
            touchDown = false;
            $pageArr.removeClass('drag');
            options.direction === 'horizontal' ? endPos = e.pageX : endPos = e.pageY;

			temp = endPos-startPos;
			
            if (Math.abs(temp) <= 50 && temp > 0) {
            	
            	direction = 'stay';
            	
            	$curPage.css({'-webkit-transform': 'translateY(0)'});
				$prevPage.css({'-webkit-transform': 'translateY('+(-pageHeight)+'px)'});
				
            }
            else if (Math.abs(temp) <= 50 && temp < 0) {
            	
            	direction = 'stay';
            	
            	$curPage.css({'-webkit-transform': 'translateY(0)'});
				$nextPage.css({'-webkit-transform': 'translateY('+pageHeight+'px)'});
            	
            }
            else if (temp >= 0) {
            	
            	direction = 'backward';
            	
            	curPage === 0 ? curPage = pageCount-1 : curPage -= 1;
            	
            	$curPage.css({'-webkit-transform': 'translateY('+pageHeight+'px)'});
				$prevPage.css({'-webkit-transform': 'translateY(0)'});
				
            }
            else if (temp < 0) {
            	
                direction = 'forward';
                
                curPage === pageCount-1 ? curPage = 0 : curPage += 1;
                
                $curPage.css({'-webkit-transform': 'translateY('+(-pageHeight)+'px)'});
				$nextPage.css({'-webkit-transform': 'translateY(0)'});
				
            }
            
            // console.log('====='+curPage);
            
            if(curPage==pageCount-1){
                isFirst=false;
            }
            var gameindex=$(".pages .page").index($(".page-game"));

              if(curPage==gameindex&&!$(".game-success").hasClass("success-show")){
                window.stopDirec=1;

                $(".u-guideTop").hide();
                
              }

			movePrevent = true;         // 动画过程中不可移动
	        setTimeout(function() {
	            movePrevent = false;
	        }, 300);
	        
        }
        
    }





    // 添加 forward / backward 状态类
    // ==============================

    function addDirecClass() {
        if(options.direction === 'horizontal'){
            if (endPos >= startPos) {
                $pages.removeClass('forward').addClass('backward');
            } else if (endPos < startPos) {
                $pages.removeClass('backward').addClass('forward');
            }
        } else {
            if (endPos >= startPos) {
                $pages.removeClass('forward').addClass('backward');
            } else if (endPos < startPos) {
                $pages.removeClass('backward').addClass('forward');
            }
        }
    }





    // 在第一页向前翻和末页前后翻都不允许
    // ==============================

    function isHeadOrTail() {
        if (options.direction === 'horizontal') {
            if ((endPos >= startPos && curPage === 0) ||
                (endPos <= startPos && curPage === pageCount-1)) {
                return true;
            }
        } else if ((endPos >= startPos && curPage === 0) ||
                (endPos <= startPos && curPage === pageCount-1)) {
            return true;
        }
        return false;
    }




    // 当前页动画显示
    // ==============================

    function animShow() {
        
        $animateDom.css({
        	'-webkit-animation': 'none',
        	'display': 'none'	// 解决部分 Android 机型 DOM 不自动重绘的 bug
        });

        
        $('.current [data-animation]').each(function(index, element){
            var $element    = $(element),
                $animation  = $element.attr('data-animation'),
                $duration   = $element.attr('data-duration') || 500,
                $timfunc    = $element.attr('data-timing-function') || 'ease',
                $delay      = $element.attr('data-delay') ?  $element.attr('data-delay') : 0;


			if ($animation === 'followSlide') {
				
				if (options.direction === 'horizontal' && (direction === 'forward' || direction === 'stay')) {
					$animation = 'followSlideToLeft';
				}
				else if (options.direction === 'horizontal' && direction === 'backward') {
					$animation = 'followSlideToRight';
				}
				else if (options.direction === 'vertical' && (direction === 'forward' || direction === 'stay')) {
					$animation = 'followSlideToTop';
				}
				else if (options.direction === 'vertical' && direction === 'backward') {
					$animation = 'followSlideToBottom';
				}
				
			}

            $element.css({
//              '-webkit-animation': $animation +' '+ $duration + 'ms ' + $timfunc + ' '+ $delay + 'ms both',
				
				'display': 'block',
				
				// 为了兼容不支持贝塞尔曲线的动画，需要拆开写
				// 严格模式下不允许出现两个同名属性，所以不得已去掉 'use strict'
				'-webkit-animation-name': $animation,
				'-webkit-animation-duration': $duration + 'ms',
				'-webkit-animation-timing-function': 'ease',
				'-webkit-animation-timing-function': $timfunc,
				'-webkit-animation-delay': $delay + 'ms',
				'-webkit-animation-fill-mode': 'both'
            })
        });
    }



    // 事件代理绑定
    // ==============================

    $(document)
        .on('touchstart', '.page', function(e) {
            onStart(e.changedTouches[0]);
        })
        .on('touchmove', '.page', function(e) {
            onMove(e.changedTouches[0]);
        })
        .on('touchend', '.page', function(e) {
            onEnd(e.changedTouches[0]);
        })
        .on('webkitAnimationEnd webkitTransitionEnd', '.pages', function() {

			if (direction !== 'stay') {
				setTimeout(function() {
	               $pageArr.removeClass('mov');
	            }, 10);
	
	            $($pageArr.removeClass('current').get(curPage)).addClass('current');
	            options.onchange(curPage, $pageArr[curPage], direction);  // 执行回调函数
	            animShow();
			}
            
        });

	
	$('.page *').on('webkitAnimationEnd', function() {
        event.stopPropagation();    // 事件代理无法阻止冒泡，所以要绑定取消
    })


    
    // 翻转屏幕提示
    // ============================== 
    
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    	if (window.orientation === 180 || window.orientation === 0) {  
			options.orientationchange('portrait');
		}  
		if (window.orientation === 90 || window.orientation === -90 ){  
			options.orientationchange('landscape') 
		} 	
    }, false);
window.slideTo=function(index){
        var pageHeight=$(window).height();
        curPage=index;
        direction='forward';
        
        $($pageArr.get(curPage)).css("-webkit-transform:translateY(0)")
        $($pageArr.removeClass('current').get(curPage)).addClass('current');
        animShow();
        
        setTimeout(function(){
          $(".pages").css({"-webkit-transition-duration":"400ms","transition-duration":"400ms"})
        },300)
        
      }
  window.moveTo=function(index){
     curPage=index;
    var pageHeight=$(window).height()
    $(".pages").css({'-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + pageHeight*index + ')'});
  }


}(Zepto)