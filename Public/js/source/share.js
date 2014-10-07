
!function($){

var imgUrl = 'http://imgcache.qq.com/ac/www_tencent/we/2014/images/logo.png'; 
var lineLink = window.location.href;

if(ISSENDER){
 
  var search="from_key="+KEY;
  if(window.location.search.indexOf("?")==0){
    search="&"+search;
  }else{
    search="?"+search;
  }
  lineLink=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search+search+window.location.hash;
}



var descContent = "这里没有商业或者公司竞争,只有前沿的科学思想和最新技术，还有天马行空般的想象力。";  
var shareTitle = 'we大会';  
var appid = 'wxc9937e3a66af6dc8';  
  
function shareFriend() {  

    WeixinJSBridge.invoke('sendAppMessage',{  
      "img_url": imgUrl,  
      "img_width": "640",  
      "img_height": "640",  
      "link": lineLink,  
      "desc": descContent,  
      "title": shareTitle  
      }, function(res) {  
      _report('send_msg', res.err_msg);  
      })  
}
function shareTimeline() {  
    WeixinJSBridge.invoke('shareTimeline',{  
    "img_url": imgUrl,  
    "img_width": "640",  
    "img_height": "640",  
    "link": lineLink,  
    "desc": descContent,  
    "title": shareTitle  
    }, function(res) {  
    _report('timeline', res.err_msg);  
    });  
}  
function shareWeibo() {  
    WeixinJSBridge.invoke('shareWeibo',{  
    "content": descContent,  
    "url": lineLink,  
    }, function(res) {  
    _report('weibo', res.err_msg);  
    });  
}  

// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。  
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      // 发送给好友  
  WeixinJSBridge.on('menu:share:appmessage', function(argv){
    var index=$(".pages .page").index($(".page-share"));

    window.slideTo(index+1);  
        shareFriend();  
  });  

    // 分享到朋友圈  
    WeixinJSBridge.on('menu:share:timeline', function(argv){  
      var index=$(".pages .page").index($(".page-share"));

    window.slideTo(index+1); 
        shareTimeline();  
        });  

    // 分享到微博  
    WeixinJSBridge.on('menu:share:weibo', function(argv){
    var index=$(".pages .page").index($(".page-share"));

    window.slideTo(index+1);   
        shareWeibo();  
        });  
    }, false);   
}(Zepto)