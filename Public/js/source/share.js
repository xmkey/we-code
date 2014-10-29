// alert(1)
!function($){
window.share=function(){

}
var imgUrl = 'http://web.liveapp.cn/Public/img/share_logo.jpg'; 
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



var descContent = "全球征集１００００个前往未来世界的同路人，速度点击与我同行！";  
var shareTitle = '环游火星 往返月球？ Yes, WE are coming!';  
var appid = 'wxc9937e3a66af6dc8';  

function shareFriend() {  
  var curindex=$(".pages .page").index($(".page.current"));
  var gameindex=$(".pages .page").index($(".page-game"));

  descContent = "全球征集１００００个前往未来世界的同路人，速度点击与我同行！"; 
  // alert($(".share-content").is(':hidden'))
  lineLink =window.location.protocol+"//"+window.location.host+window.location.pathname;

  if(curindex==gameindex&& $(".share-content").css("display")=="block"){
    shareTitle ="那谁，快醒醒帮我抢WE码了，我会坚持３００秒，速来！"
    descContent="腾讯２０１４WE大会限量直播观看码开抢中！想一站式看完全球最新科技？只在这里，小伙伴们一起来吧！";
    lineLink=senderLink;
    // alert(lineLink);
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
        
      if(curindex==gameindex&& $(".share-content").css("display")=="block"){
        // alert(res.err_msg.toUpperCase());
        if(res.err_msg.toUpperCase()!='SEND_APP_MSG:CANCEL'){

          window.toGame();
          
        }
          
      }
    })  
}
function shareTimeline() {  
  var curindex=$(".pages .page").index($(".page.current"));
  var gameindex=$(".pages .page").index($(".page-game"));
  descContent = "全球征集１００００个前往未来世界的同路人，速度点击与我同行！"; 
  lineLink =window.location.protocol+"//"+window.location.host+window.location.pathname;
  if(curindex==gameindex&& $(".share-content").css("display")=="block"){
    shareTitle ="那谁，快醒醒帮我抢WE码了，我会坚持３００秒，速来！"
    descContent="腾讯２０１４WE大会限量直播观看码开抢中！想一站式看完全球最新科技？只在这里，小伙伴们一起来吧！";
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
        if(res.err_msg!="share_timeline:cancel"){
          window.toGame();
        }
      }
    });  
}  
function is_weixn(){  
  var curindex=$(".pages .page").index($(".page.current"));
  var gameindex=$(".pages .page").index($(".page-game"));
  descContent = "全球征集１００００个前往未来世界的同路人，速度点击与我同行！"; 
  if(curindex==gameindex&& $(".share-content").css("display")=="block"){
    shareTitle ="那谁，快醒醒帮我抢WE码了，我会坚持３００秒，速来！"
    descContent="腾讯２０１４WE大会限量直播观看码开抢中！想一站式看完全球最新科技？只在这里，小伙伴们一起来吧！";
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
// }
}(Zepto)