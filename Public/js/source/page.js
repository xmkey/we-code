!function($){
  window.page=function(){
  var isFirst=true;

  $('.pages').parallax({
    direction: 'vertical',  // horizontal (水平翻页)
    swipeAnim: 'default',   // default (切换效果)
    drag:      true,    // 是否允许拖拽 (若 false 则只有在 touchend 之后才会翻页)
    loading:   false,   // 有无加载页
    indicator: false,   // 有无指示点
    arrow:     false,   // 有无指示箭头
    /*
     * 翻页后立即执行
     * {int}    index: 第几页
     * {DOMElement} element: 当前页节点
     * {String}   directation: forward(前翻)、backward(后翻)、stay(保持原页)
     */
    onchange: function(index, element, direction) {
      // code here...
      // console.log(index, element, direction);
      
      if (index !== 2 || index !== 3 || index !== 8) {
        $('.content').css("-webkit-transform", "none"); 
      }
      // var curindex=$(".pages .page").index($(".page.current"));
      var gameindex=$(".pages .page").index($(".page-game"));
      if(index==gameindex&&!$(".game-success").hasClass("success-show")){
        window.stopDirec=1;
        $(".u-guideTop").hide();
        
      }else{
        window.stopDirec=0;
        $(".u-guideTop").show();
        
      }
    },
    /*
     * 横竖屏检测
     * {String}   orientation: landscape、protrait
     */
    orientationchange: function(orientation) {
      // console.log(orientation);
    }
  });

  window.sliderTo=function(index){
    var pageHeight=$(window).height()
    $(".pages").css({"-webkit-transition-duration":"0ms","transition-duration":"0ms"});

    $(".pages").css({'-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + pageHeight*timeIndex + ')'});
    setTimeout(function(){
      $(".pages").css({"-webkit-transition-duration":"400ms","transition-duration":"400ms"})
    },300)
    
  }
  window.moveTo=function(index){
    var pageHeight=$(window).height()
    $(".pages").css({'-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + pageHeight*timeIndex + ')'});
  }

  


  var endPos,
      startPos,
      temp,
      offset,
      offset2,
      $pages = $('.pages'),
      $content = null,
      cHeight = 0,
      wHeight = $(window).height();

  $('.page-timeline').on('touchstart', function() {
    onStart(event.changedTouches[0],$(this).find($('.content')));
  })
  .on('touchmove', function() {
    onMove(event.changedTouches[0],$(this).find($('.content')));
  });
  $('.page-speaker').on('touchstart', function() {
    onStart(event.changedTouches[0],$(this).find($('.content')));
  })
  .on('touchmove', function() {
    onMove(event.changedTouches[0],$(this).find($('.content')));
  });
  $('.page-history').on('touchstart', function() {
    onStart(event.changedTouches[0],$(this).find($('.content')));
  })
  .on('touchmove', function() {
    onMove(event.changedTouches[0],$(this).find($('.content')));
  });

  function onStart(e,element) {
    startPos = e.pageY; 

    cHeight = element.height() + 50;
    offset = element.css("-webkit-transform")
                        .replace("matrix(", "")
                        .replace(")", "")
                        .split(",");

    offset = parseInt(offset[5]) || 0;
  }

  function onMove(e,element) {
    cHeight = element.height() + 50;
        offset2 = $pages.css("-webkit-transform")
                        .replace("matrix(", "")
                        .replace(")", "")
                        .split(",");

    offset2 = Math.abs(parseInt(offset2[5]) || 0);
    endPos = e.pageY; 
    if (cHeight > wHeight && endPos < startPos) {
      temp = offset + endPos - startPos;
      if (Math.abs(temp) <= (cHeight - wHeight)) {
        event.preventDefault();
        event.stopPropagation();
        element.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + temp + ")");  
      }
    }
    // 往上拖
    else if (temp < 0 && endPos >= startPos ) {
      event.preventDefault();
      event.stopPropagation();
      temp = offset + endPos - startPos;
      element.css("-webkit-transform", "matrix(1, 0, 0, 1, 0, " + temp + ")");
    }
  }

  $("#btn-invite").tap(function(){
    // var index=$(".pages .page").index($(".page-game"));
    if(ISSENDER){
      $(".m-weixinShareLayer").show();
      return false;
    }else{
      location.href=$(this).attr("href");
    }
  })

  var slider = null;
  slider =Swipe(document.getElementById('slider'), {
    auto: false,
    callback: function(pos) {
      console.log(pos);
    }
  });
  
  $('.guest-card').tap(function(e) {
    $('.guest-pop').addClass("hide");
  });
  $(".speaker-list li").tap(function(){
   
    var index=$(".speaker-list li").index($(this));
    $(".guest-pop").removeClass("hide");
      slider.slide(index,0)
    });
    $(".u-guidePrev").tap(function(){
      slider.prev();
    })
    $(".u-guideNext").tap(function(){
      slider.next();
    })
  }


}(Zepto)