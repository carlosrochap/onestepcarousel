(function( $ ){
    var switcher = {
        parent      : null,
        itemClass   : '',
        easing      : null,
        duration    : 1200,
        state       : 0,
        blocks      : {},

        init: function (carouselHolder, itemClass, easing, duration, callback) {
            var blks            = {};
            this.parent     = carouselHolder;
            this.itemClass  = itemClass;

            var hd              = this.parent.outerWidth();
            blks[this.parent.attr('id')] = {};

            this.parent.find(switcher.itemClass).each(function (i,e) {
                blks[switcher.parent.attr('id')][$(e).index()] = i;

                var elm = $(this);
                if (elm.hasClass('active')) {

                    var pos = (hd-elm.width())/2;
                    elm.css('left', pos+'px');
                }
            });

            this.blocks = blks;
            if (typeof easing !== "undefined") {
                this.easing = easing;
            }

            if (typeof duration !== "undefined") {
                this.duration = duration;
            }
            callback();
        },

        show: function (elm, callback) {
            if (this.state == 0) {

                var secTo 	= $(elm);
                var secToIndex = secTo.index();

                var hd 		= switcher.parent.outerWidth();
                var to 		= (hd-secTo.width())/2;
                var ce 		= switcher.parent.find(switcher.itemClass+'.active');
                var ceIndex = ce.index();

                if (ceIndex != secToIndex) {
                    this.state 	= 1;
                    if (this.blocks[switcher.parent.attr('id')][ceIndex] > this.blocks[switcher.parent.attr('id')][secToIndex]) {
                        hd = to-(hd-to);
                    }

                    this.alternate(ce, secTo, hd, to);
                    callback();
                }
            } else {
                //alert('busy..');
            }
        },

        alternate: function (elm1, elm2, from, to) {

            var outDis = 0>from ? (from*-1)+(to*2) : (to*2)-from;

            var options = {duration: switcher.duration, queue: false};

            if (switcher.easing) {
                options.easing = switcher.easing;
            }

            elm2.css({left:from+'px'}).addClass('active').animate(
                {left:to},
                options
            );

            options.complete = function () {
                $(this).removeClass('active');
                switcher.state = 0;
            };

            elm1.animate(
                {left:outDis},
                options

            );

        }
    };

    $.fn.osCarousel = function(opts) {
        var options = {
            next        : '#next',
            prev        : '#prev',
            buttons     : '#pagination .btns',
            rewind      : false,
            itemClass   : '.ctnsec',
            easing      : null,
            duration    : 700
        };

        for (var x in opts) {
            options[x] = opts[x];
        }

        var carouselHolder = $(this);

        switcher.init(carouselHolder, options.itemClass, options.easing, options.duration, function () {
            $(options.next).click(function () {
                var element = carouselHolder.find(options.itemClass+'.active').next();

                if(element.length > 0) {
                    switcher.show(element, function () {

                    });
                } else if (options.rewind){
                    switcher.show(carouselHolder.find(options.itemClass).first(), function () {

                    });
                }
            });

            $(options.prev).click(function () {
                var element = carouselHolder.find(options.itemClass+'.active').prev();

                if(element.length > 0) {
                    switcher.show(element, function () {

                    });
                } else if (options.rewind){
                    switcher.show(carouselHolder.find(options.itemClass).last(), function () {

                    });
                }
            });
        });


        $(options.buttons).live('click', function () {

            var element = carouselHolder.children(options.itemClass).get($(this).index());
            switcher.show(element, function () {

            });

        });
    };

})( jQuery );











