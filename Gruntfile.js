module.exports = function(grunt){

    require('load-grunt-tasks')(grunt); //加载所有的任务
   
    
    var pkg=grunt.file.readJSON("package.json");
    var zepto=[
      "Public/js/zepto/zepto.min.js",
      "Public/js/zepto/detect.js",
      "Public/js/zepto/fx.js",
      "Public/js/zepto/fx_methods.js",
      // "Public/js/zepto/touch.js",
      "Public/js/zepto/tap.js",
      "Public/js/zepto/cookie.js"
    ];
    var module=[
      
      "Public/js/source/fastclick.js",
      "Public/js/source/prefixfree.min.js",
      "Public/js/source/jquery.keyframes.js",
      "Public/js/source/parallax.js",
      "Public/js/source/swipe.js",
      // "Public/js/source/transform.js",
      "Public/js/source/page.js",
      "Public/js/source/finger.js",
      "Public/js/source/share.js"
      // "Public/js/source/bg.js",
      // "Public/js/source/game.js"

    ]
    grunt.initConfig({
      pkg:pkg,
      uglify:{
        options: {
            
        },
        zepto: {
          src:zepto,
          dest:'Public/js/zepto.min.js'
        },
        module: {
          src:module,
          dest:'Public/js/main.js'
        }
      },
      cssmin: {
        minify: {
            src: 'Public/css/main-debug.css',       
            dest:'Public/css/main.css'
        }
      },
      watch: {
        css: {
          files: [
            "Public/css/*.css"
            
          ],
          tasks: ['cssmin']
        },
        js: {
          files: [
            "Public/js/source/*.js"
            
          ],
          tasks: ['uglify']
        },

      }
      
    });
    grunt.registerTask('default',['uglify','cssmin','watch']);
    
    
}