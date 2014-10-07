!function($){
function preventDefault(e){
   
    e.preventDefault();
    return false;
}
var fingerprint=$(".we-gamebox .fingerprint");
var status=0;
 $(document).on("touchstart",".btn-fingerprint-left",function(){
 	$(".pages").on("touchmove",preventDefault);
 	if(ISSENDER){
 		fingerprint.eq(2).addClass("on");
 	}else{
 		fingerprint.eq(0).addClass("on");
 	}
 	status=status+1;

 	check(status);
 });
 $(document).on("touchend",".btn-fingerprint-left",function(){
 	$(".pages").off("touchmove",preventDefault);
 	if(ISSENDER){
 		fingerprint.eq(2).removeClass("on");
 	}else{
 		fingerprint.eq(0).removeClass("on");
 	}
 	status=status-1;
 	
 });
 $(document).on("touchstart",".btn-fingerprint-right",function(){
 	$(".pages").on("touchmove",preventDefault);
 	if(ISSENDER){
 		fingerprint.eq(3).addClass("on");
 	}else{
 		fingerprint.eq(1).addClass("on");
 	}
 	status=status+2;
 	check(status);
 });
 $(document).on("touchend",".btn-fingerprint-right",function(){
 	$(".pages").off("touchmove",preventDefault);
 	if(ISSENDER){
 		fingerprint.eq(3).removeClass("on");
 	}else{
 		fingerprint.eq(1).removeClass("on");
 	}
 	status=status-2;
 	
 });
 // var isTrigger=false;
 // var timeRemain=60;
 // var isFirst=true;
var global={
	isTrigger:false,
	timeRemain:60,
	isFirst:true,
	interval:null
}

 var Timer={
 	start:function(timeRemain){
 		
 		global.interval=setInterval(function(){
 			var data={
	 			isSender:ISSENDER,
	 			status:status,
	 			key:KEY,
	 			timer:global.timeRemain
	 		}


	 		if(global.isTrigger){
	 			if(global.timeRemain-1<=0){
	 				global.timeRemain=0;
	 				clearInterval(interval);
	 			}else{
	 				global.timeRemain--;
	 			}
	 			$(".count-down").html(global.timeRemain);
	 		}
	 		
	 		postData(data,global.isFirst);
	 		
 		},1000)
 	}
 }
 if(!ISSENDER){
 	var index=$(".pages .page").index($(".page-game"));
 	
 	window.slideTo(index);
 	Timer.start(global.timeRemain);
 }

 function check(status){
 	if(global.isTrigger==false&&ISSENDER&&status==3){

 		var data={
 			isSender:ISSENDER,
 			status:status,
 			key:KEY,
 			timer:global.timeRemain
 		}
 		
 		postData(data,global.isFirst);
 		global.isFirst=false;
 		Timer.start(global.timeRemain);
 	}
 }
 function postData(data,isfirst){
 	$.post(APP+'/Home/data/', data, (function(isfirst){
	  return function(result){
	  	// console.log(result)
	  	var result=JSON.parse(result);
	  	
	  	if(result.status=="success"){
	  		clearInterval(global.interval);
	  		$(".game-content").addClass("game-hide");
	  		if(ISSENDER){
	  			$("#sender-success").addClass("success-show");
	  		}else{
	  			$("#helper-success").addClass("success-show");
	  		}
 			
	  		return true;
	  	}else if(result.status=="matched"){

	  		clearInterval(global.interval);
	  		alert("已经匹配过");
	  		return false;
	  	}else if(result.status=="timeout"){
	  		clearInterval(global.interval);
	  		alert("已经过期");
	  		return false;
	  	}
	  	global.isTrigger=true;

	  	if(result.status=="noyet"){
	  		
	  		global.isTrigger=false;
	  	}else if(isfirst&&!ISSENDER){

	  		global.timeRemain=result['timer'];
	  		$(".count-down").html(global.timeRemain);
	  		global.isFirst=false;
	  		
	  	}
	  	ISSENDER?setStatus(result.to):setStatus(result.from);
	  	console.log(result)
	  };
	})(isfirst));
 }
function setStatus(status){
	if(ISSENDER){
  		fingerprint.eq(0).removeClass("on")
  		fingerprint.eq(1).removeClass("on")
  		if(status==1){
  			fingerprint.eq(0).addClass("on")
  		}else if(status==2){
  			fingerprint.eq(1).addClass("on")
  		}else if(status==3){
  			fingerprint.eq(0).addClass("on")
  			fingerprint.eq(1).addClass("on")
  		}
  	}else{
  		fingerprint.eq(2).removeClass("on")
  		fingerprint.eq(3).removeClass("on")
  		if(status==1){
  			fingerprint.eq(2).addClass("on")
  		}else if(status==2){
  			fingerprint.eq(3).addClass("on")
  		}else if(status==3){
  			fingerprint.eq(2).addClass("on")
  			fingerprint.eq(3).addClass("on")
  		}
  	}
}

}(Zepto)