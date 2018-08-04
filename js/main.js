(function ($) {

    'use-strict';

    $('#hamburger').click(function() {
        $(this).toggleClass('open');
    });

    $(window).on('load', function () {
        $('.preloader').fadeOut(3000);
    });

    $(window).on('scroll', function(event) {
        var scrollValue = $(window).scrollTop();
        if (scrollValue > 20) {
            $('.navbar').addClass('affix');
            $('.navbar').removeClass('non-affix');
        } else {
            $('.navbar').removeClass('affix');
            $('.navbar').addClass('non-affix');
        }
    });
       var statSection = $(".stats"),
        stats = $(".stats_count");
    console.log(statSection);
    statSection.waypoint({
        handler: function(direction) {
            if (direction === "down") {
                stats.each(function() {
                    var $this = $(this);
                    $({
                        Counter: 0
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function(curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });
            }
            // trigger once only
            this.destroy();
        },
        offset: "90%"
    });

})(jQuery);