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

})(jQuery);