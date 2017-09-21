(function ($) {
    /**
       A simple ripple effect, material design like jQuery plugin to beautify your UI component. jQuery水纹效果插件
       How to use it? 使用方式
            $('.ripple-effect').ripple({
                    speed: 200, // the wave's speed 水纹速度
                    color: '#fff' // the wave's color 水纹颜色
                }
            });
    */
    $.fn.ripple = function (options) {
        var defaults = {
            speed: 200,
            color: '#000'
        };
        var supportedTouch = true;
        try { ontouchstart; } catch (e) { supportedTouch = false; }
        options = $.extend({}, defaults, options);

        this.each(function () {
            var This = $(this),
                tpl = '<span class="ripple-container"><span class="ripple is-animated"></span></span>';
            This.append(tpl);

            var $r = This.find('.ripple'),
                width = This.width(),
                height = This.height();

            if (supportedTouch) {
                This.on('touchstart', function (e) {
                    var clientX = e.originalEvent.touches[0].clientX,
                        clientY = e.originalEvent.touches[0].clientY;
                    press(clientX, clientY);
                });
                This.on('touchend', release);
            } else {
                This.on('mousedown', function (e) {
                    var clientX = e.clientX || e.pageX,
                        clientY = e.clientY || e.pageY;
                    press(clientX, clientY);
                });
                This.on('mouseup', release);
            }
            function press(clientX, clientY) {
                var radius = Math.pow(width * width + height * height, 0.5) * 2;
                clientX = clientX - This.offset().left;
                clientY = clientY - This.offset().top;

                $r.removeClass('is-animated').addClass('is-visible').css({
                    background: options.color,
                    width: radius + 'px',
                    height: radius + 'px',
                    transform: 'translate(-50%, -50%) translate(' + clientX + 'px,' + clientY + 'px) ' + 'scale(0.0001, 0.0001)',
                    '-webkit-transform': 'translate(-50%, -50%) translate(' + clientX + 'px,' + clientY + 'px) ' + 'scale(0.0001, 0.0001)'
                });

                setTimeout(function () {
                    $r.addClass('is-animated').css({
                        transform: 'translate(-50%, -50%) translate(' + clientX + 'px,' + clientY + 'px)',
                        '-webkit-transform': 'translate(-50%, -50%) translate(' + clientX + 'px,' + clientY + 'px)'
                    });
                }, 10);
            }
            function release() {
                setTimeout(function () {
                    $r.removeClass('is-visible');
                }, options.speed);// the wave's speed 这里控制水纹的速度
            }
        });
    }
})(jQuery);
