!function($){
  // $(".light").tap(function(){
  //       var self=this;
  //       var screenW=$(document.body).width(),
  //           screenH=$(document.body).height();
  //       var scale=screenW/90>screenH/125?screenW/60:screenH/90;

  //       // $(this).addClass("on");
  //       $(this).find(".inner").css({
  //         "-webkit-transform":"scale("+scale+") rotate(90deg)",
  //         "opacity":1
  //       });

  //       setTimeout(function(){
  //         $(self).closest(".page").find(".page-front").addClass("hide");
  //         $(self).closest(".page").find(".page-back").addClass("show");
  //         setTimeout(function(){
  //           // $(self).addClass("out");
  //           $(self).find(".inner").css({
  //             "-webkit-transition-duration": 1.5+"s",
  //             "opacity":0
  //           });
  //           setTimeout(function(){
  //             $(self).hide();
  //           },1500)
  //         },300)

  //       },500)
  //   })

// "use strict";
// window.onload = function() {
//     setTimeout(start, 200);
// };
var oldX=0;
var oldY=0;
function deviceMotionHandler(eventData){

    var acceleration = eventData.accelerationIncludingGravity; 
    var x=Math.round(acceleration.x)*3;
    var y=-Math.round(acceleration.y)*3;
    if(Math.abs(oldX-x)>4||Math.abs(oldY-y)>4){
        var translate="translate("+x+"px,"+y+"px)";
        $(".motion").css({
            "-webkit-transform":translate,

        })
        oldX=x;
        oldY=y;
    }
}
if (window.DeviceMotionEvent) { 
    window.addEventListener('devicemotion',deviceMotionHandler, false); 
}

// function start() {

//     //Helpers
//     function lineToAngle(x1, y1, length, radians) {
//         var x2 = x1 + length * Math.cos(radians),
//             y2 = y1 + length * Math.sin(radians);
//         return { x: x2, y: y2 };
//     }

//     function randomRange(min, max) {
//         return min + Math.random() * (max - min);
//     }

//     function degreesToRads(degrees) {
//         return degrees / 180 * Math.PI;
//     }

//     //Particle
//     var particle = {
//         x: 0,
//         y: 0,
//         vx: 0,
//         vy: 0,
//         radius: 0,

//         create: function(x, y, speed, direction) {
//             var obj = Object.create(this);
//             obj.x = x;
//             obj.y = y;
//             obj.vx = Math.cos(direction) * speed;
//             obj.vy = Math.sin(direction) * speed;
//             return obj;
//         },

//         getSpeed: function() {
//             return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
//         },

//         setSpeed: function(speed) {
//             var heading = this.getHeading();
//             this.vx = Math.cos(heading) * speed;
//             this.vy = Math.sin(heading) * speed;
//         },

//         getHeading: function() {
//             return Math.atan2(this.vy, this.vx);
//         },

//         setHeading: function(heading) {
//             var speed = this.getSpeed();
//             this.vx = Math.cos(heading) * speed;
//             this.vy = Math.sin(heading) * speed;
//         },

//         update: function() {
//             this.x += this.vx;
//             this.y += this.vy;
//         }
//     };

//     //Canvas and settings
//     var canvas = document.getElementById("canvas"),
//         context = canvas.getContext("2d"),
//         width = canvas.width = window.innerWidth,
//         height = canvas.height = window.innerHeight,
//         stars = [],
//         shootingStars = [],
//         layers = [
//             { speed: 0.01, scale: 0.2, count: 50 },
//             { speed: 0.03, scale: 0.5, count: 50 },
//             { speed: 0.05, scale: 0.75, count: 30 }
//         ],
//         starsAngle = 135,
//         shootingStarSpeed = {
//             min: 8,
//             max: 15
//         },
//         shootingStarOpacityDelta = 0.01,
//         trailLengthDelta = 0.01,
//         shootingStarEmittingInterval = 4000,
//         shootingStarLifeTime = 400,
//         maxTrailLength = 200,
//         starBaseRadius = 2,
//         shootingStarRadius = 3,
//         paused = false;

//     //Create all stars
//     for (var j = 0; j < layers.length; j += 1) {
//         var layer = layers[j];
//         for (var i = 0; i < layer.count; i += 1) {
//             var star = particle.create(randomRange(0, width), randomRange(0, height), 0, 0);
//             star.radius = starBaseRadius * layer.scale;
//             star.setSpeed(layer.speed);
//             star.setHeading(degreesToRads(starsAngle));
//             stars.push(star);
//         }
//     }

//     function createShootingStar() {
//         var shootingStar = particle.create(randomRange(width / 2, width), randomRange(0, height / 2), 0, 0);
//         shootingStar.setSpeed(randomRange(shootingStarSpeed.min, shootingStarSpeed.max));
//         shootingStar.setHeading(degreesToRads(starsAngle));
//         shootingStar.radius = shootingStarRadius;
//         shootingStar.opacity = 0;
//         shootingStar.trailLengthDelta = 0;
//         shootingStar.isSpawning = true;
//         shootingStar.isDying = false;
//         shootingStars.push(shootingStar);
//     }

//     function killShootingStar(shootingStar) {
//         setTimeout(function() {
//             shootingStar.isDying = true;
//         }, shootingStarLifeTime);
//     }

//     function update() {
//         if (!paused) {
//             context.clearRect(0, 0, width, height);
//             // context.fillStyle = "#282a3a";
//             // context.fillRect(0, 0, width, height);
//             // context.fill();

//             for (var i = 0; i < stars.length; i += 1) {
//                 var star = stars[i];
//                 star.update();
//                 drawStar(star);
//                 if (star.x > width) {
//                     star.x = 0;
//                 }
//                 if (star.x < 0) {
//                     star.x = width;
//                 }
//                 if (star.y > height) {
//                     star.y = 0;
//                 }
//                 if (star.y < 0) {
//                     star.y = height;
//                 }
//             }

//             for (i = 0; i < shootingStars.length; i += 1) {
//                 var shootingStar = shootingStars[i];
//                 if (shootingStar.isSpawning) {
//                     shootingStar.opacity += shootingStarOpacityDelta;
//                     if (shootingStar.opacity >= 1.0) {
//                         shootingStar.isSpawning = false;
//                         killShootingStar(shootingStar);
//                     }
//                 }
//                 if (shootingStar.isDying) {
//                     shootingStar.opacity -= shootingStarOpacityDelta;
//                     if (shootingStar.opacity <= 0.0) {
//                         shootingStar.isDying = false;
//                         shootingStar.isDead = true;
//                     }
//                 }
//                 shootingStar.trailLengthDelta += trailLengthDelta;

//                 shootingStar.update();
//                 if (shootingStar.opacity > 0.0) {
//                     drawShootingStar(shootingStar);
//                 }
//             }

//             //Delete dead shooting shootingStars
//             for (i = shootingStars.length -1; i >= 0 ; i--){
//                 if (shootingStars[i].isDead){
//                     shootingStars.splice(i, 1);
//                 }
//             }
//         }
//         requestAnimationFrame(update);
//     }

//     function drawStar(star) {
//         context.fillStyle = "rgb(166, 184, 224)";
//         context.beginPath();
//         context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
//         context.fill();
//     }

//     function drawShootingStar(p) {
//         var x = p.x,
//             y = p.y,
//             currentTrailLength = (maxTrailLength * p.trailLengthDelta),
//             pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

//         context.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";
//         // context.beginPath();
//         // context.arc(x, y, p.radius, 0, Math.PI * 2, false);
//         // context.fill();
//         var starLength = 5;
//         context.beginPath();
//         context.moveTo(x - 1, y + 1);

//         context.lineTo(x, y + starLength);
//         context.lineTo(x + 1, y + 1);

//         context.lineTo(x + starLength, y);
//         context.lineTo(x + 1, y - 1);

//         context.lineTo(x, y + 1);
//         context.lineTo(x, y - starLength);

//         context.lineTo(x - 1, y - 1);
//         context.lineTo(x - starLength, y);

//         context.lineTo(x - 1, y + 1);
//         context.lineTo(x - starLength, y);

//         context.closePath();
//         context.fill();

//         //trail
//         context.fillStyle = "rgba(255, 221, 157, " + p.opacity + ")";
//         context.beginPath();
//         context.moveTo(x - 1, y - 1);
//         context.lineTo(pos.x, pos.y);
//         context.lineTo(x + 1, y + 1);
//         context.closePath();
//         context.fill();
//     }

//     //Run
//     update();

//     //Shooting stars
//     setInterval(function() {
//         if (paused) return;
//         createShootingStar();
//     }, shootingStarEmittingInterval);

//     window.onfocus = function () {
//       paused = false;
//     };

//     window.onblur = function () {
//       paused = true;
//     };

// }
   
function $i(id) { return document.getElementById(id); }
function $r(parent,child) { (document.getElementById(parent)).removeChild(document.getElementById(child)); }
function $t(name) { return document.getElementsByTagName(name); }
function $c(code) { return String.fromCharCode(code); }
function $h(value) { return ('0'+Math.max(0,Math.min(255,Math.round(value))).toString(16)).slice(-2); }
function _i(id,value) { $t('div')[id].innerHTML+=value; }
function _h(value) { return !hires?value:Math.round(value/2); }

function get_screen_size()
    {
    var w=document.documentElement.clientWidth;
    var h=document.documentElement.clientHeight;
    return Array(w,h);
    }

var url=document.location.href;

var flag=true;
var test=true;
var n=parseInt((url.indexOf('n=')!=-1)?url.substring(url.indexOf('n=')+2,((url.substring(url.indexOf('n=')+2,url.length)).indexOf('&')!=-1)?url.indexOf('n=')+2+(url.substring(url.indexOf('n=')+2,url.length)).indexOf('&'):url.length):512);
var n=256;
var w=0;
var h=0;
var x=0;
var y=0;
var z=0;
var star_color_ratio=0;
var star_x_save,star_y_save;
var star_ratio=256;
var star_speed=4;
var star_speed_save=0;
var star=new Array(n);
var color;
var opacity=0.1;

var cursor_x=0;
var cursor_y=0;
var mouse_x=0;
var mouse_y=0;

var canvas_x=0;
var canvas_y=0;
var canvas_w=0;
var canvas_h=0;
var context;

var key;
var ctrl;

var timeout;
var fps=20;

function init()
    {
    var a=0;
    for(var i=0;i<n;i++)
        {
        star[i]=new Array(5);
        star[i][0]=Math.random()*w*2-x*2;
        star[i][1]=Math.random()*h*2-y*2;
        star[i][2]=Math.round(Math.random()*z);
        star[i][3]=0;
        star[i][4]=0;
        }
    var starfield=$i('starfield');

    // starfield.style.position='absolute';
    starfield.width=w;
    starfield.height=h;
    context=starfield.getContext('2d');
    //context.lineCap='round';
    context.fillStyle='rgba(0,0,0,0)';
    context.strokeStyle='rgb(255,255,255)';
    
}

function anim(){
    mouse_x=cursor_x-x;
    mouse_y=cursor_y-y;
    context.clearRect(0,0,w,h);
    for(var i=0;i<n;i++)
        {
        test=true;
        star_x_save=star[i][3];
        star_y_save=star[i][4];
        star[i][0]+=mouse_x>>4; if(star[i][0]>x<<1) { star[i][0]-=w<<1; test=false; } if(star[i][0]<-x<<1) { star[i][0]+=w<<1; test=false; }
        star[i][1]+=mouse_y>>4; if(star[i][1]>y<<1) { star[i][1]-=h<<1; test=false; } if(star[i][1]<-y<<1) { star[i][1]+=h<<1; test=false; }
        star[i][2]-=star_speed; if(star[i][2]>z) { star[i][2]-=z; test=false; } if(star[i][2]<0) { star[i][2]+=z; test=false; }
        star[i][3]=x+(star[i][0]/star[i][2])*star_ratio;
        star[i][4]=y+(star[i][1]/star[i][2])*star_ratio;
        if(star_x_save>0&&star_x_save<w&&star_y_save>0&&star_y_save<h&&test)
            {
            context.lineWidth=(1-star_color_ratio*star[i][2])*2;
            context.beginPath();
            context.moveTo(star_x_save,star_y_save);
            context.lineTo(star[i][3],star[i][4]);
            context.stroke();
            context.closePath();
            }
        }
    timeout=setTimeout(function(){
        anim();
    },fps);
}

function move(evt)
    {
    evt=evt||event;
    cursor_x=evt.pageX-canvas_x;
    cursor_y=evt.pageY-canvas_y;
    }


function start()
    {
    resize();
    anim();
    }

function resize()
    {
    w=parseInt((url.indexOf('w=')!=-1)?url.substring(url.indexOf('w=')+2,((url.substring(url.indexOf('w=')+2,url.length)).indexOf('&')!=-1)?url.indexOf('w=')+2+(url.substring(url.indexOf('w=')+2,url.length)).indexOf('&'):url.length):get_screen_size()[0]);
    h=parseInt((url.indexOf('h=')!=-1)?url.substring(url.indexOf('h=')+2,((url.substring(url.indexOf('h=')+2,url.length)).indexOf('&')!=-1)?url.indexOf('h=')+2+(url.substring(url.indexOf('h=')+2,url.length)).indexOf('&'):url.length):get_screen_size()[1]);
    x=Math.round(w/2);
    y=Math.round(h/2);
    z=(w+h)/2;
    star_color_ratio=1/z;
    cursor_x=x;
    cursor_y=y;
    init();
    }
// if(window.addEventListener) window.addEventListener('DOMMouseScroll',mouse_wheel,false);
start()


}(Zepto)