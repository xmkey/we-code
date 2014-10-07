(function($) {
    $.fn.extend({
        smartpreload: function(options) {
            var settings = $.extend({
                images: null,
                oneachimageload: null,
                onloadall: null
            }, options);
            return this.each(function() {
                var loadcounter = 0;
                for (var i = 0; i < settings.images.length; i++) {
                    var img = $('<img/>').addClass('preloading').css('display', 'none').attr('src', settings.images[i]).load(function() {
                        loadcounter++;
                        if (settings.oneachimageload != null) settings.oneachimageload($(this).attr('src'));
                        if (loadcounter == settings.images.length) {
                            if (settings.onloadall != null) settings.onloadall();
                        }
                    });
                }              
            });
        }
    });
})(Zepto);


$(document).smartpreload({ images: ['../img/bg.jpg'], oneachimageload: function(src) {
    
}, onloadall: function() {
    
}
});