// alert(1)
!function($){

var imgUrl = 'http://imgcache.qq.com/ac/www_tencent/we/2014/images/logo.png'; 
var lineLink =window.location.protocol+"//"+window.location.host+window.location.pathname;
var senderLink=lineLink;
if(ISSENDER){
 
  var search="from_key="+KEY;
  if(window.location.search.indexOf("?")==0){
    search="&"+search;
  }else{
    search="?"+search;
  }
  senderLink=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search+search+window.location.hash;
}



var descContent = "这里没有商业或者公司竞争,只有前沿的科学思想和最新技术，还有天马行空般的想象力。";  
var shareTitle = 'we大会';  
var appid = 'wxc9937e3a66af6dc8';  
  
function shareFriend() {  
  var curindex=$(".pages .page").index($(".page.current"));
  var gameindex=$(".pages .page").index($(".page-game"));

  descContent = "这里没有商业或者公司竞争,只有前沿的科学思想和最新技术，还有天马行空般的想象力。"; 
  // alert($(".share-content").is(':hidden'))
  lineLink =window.location.protocol+"//"+window.location.host+window.location.pathname;

  if(curindex==gameindex&& $(".share-content").css("display")=="block"){
    
    descContent="帮我一起赢取we大会直播码吧";
    lineLink=senderLink;
    
  }
  // alert(1222);
    WeixinJSBridge.invoke('sendAppMessage',{  
      "img_url": imgUrl,  
      "img_width": "640",  
      "img_height": "640",  
      "link": lineLink,  
      "desc": descContent,  
      "title": shareTitle  
      }, function(res) { 
        
        // alert(res.err_msg);
          if(curindex==gameindex&& $(".share-content").css("display")=="block"){
            
            // if(res.err_msg.toUpperCase().indexOf("OK")>=0){
              window.toGame();
            // }
              
          }
      })  
}
function shareTimeline() {  
  var curindex=$(".pages .page").index($(".page.current"));
  var gameindex=$(".pages .page").index($(".page-game"));
  descContent = "这里没有商业或者公司竞争,只有前沿的科学思想和最新技术，还有天马行空般的想象力。"; 
  lineLink =window.location.protocol+"//"+window.location.host+window.location.pathname;
  if(curindex==gameindex&& $(".share-content").css("display")=="block"){
    descContent="帮我一起赢取we大会直播码吧";
    lineLink=senderLink;
    // window.toGame();
  }
    WeixinJSBridge.invoke('shareTimeline',{  
    "img_url": imgUrl,  
    "img_width": "640",  
    "img_height": "640",  
    "link": lineLink,  
    "desc": descContent,  
    "title": shareTitle  
    }, function(res) {  
      if(curindex==gameindex&& $(".share-content").css("display")=="block"){
        // if(res.err_msg.toUpperCase().indexOf("OK")>=0){
          window.toGame();
        // }
      }
    });  
}  
function is_weixn(){  
  var curindex=$(".pages .page").index($(".page.current"));
  var gameindex=$(".pages .page").index($(".page-game"));
  descContent = "这里没有商业或者公司竞争,只有前沿的科学思想和最新技术，还有天马行空般的想象力。"; 
  if(curindex==gameindex&& $(".share-content").css("display")=="block"){
    descContent="帮我一起赢取we大会直播码吧";
    lineLink=senderLink;
    window.toGame();
  }
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
}  
if(!is_weixn()){
  // alert("请在微信中打开该页面");
}
 
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。  
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      // 发送给好友  

  WeixinJSBridge.on('menu:share:appmessage', function(argv){
   

   
      // window.toGame();
        shareFriend();  
  });  

    // 分享到朋友圈  
    WeixinJSBridge.on('menu:share:timeline', function(argv){  
    //   var index=$(".pages .page").index($(".page-share"));

    // window.slideTo(index+1); 
    

   
     // window.toGame();
        shareTimeline();  
        });  

    // 分享到微博  
    WeixinJSBridge.on('menu:share:weibo', function(argv){
    
    
        shareWeibo();  
        });  
    }, false); 

}(Zepto)