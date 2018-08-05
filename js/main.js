(function($) {

    'use-strict';

    $('body').css('overflow','hidden')

    $('#hamburger').click(function() {
        $(this).toggleClass('open');
    });

    $('#footer').footerReveal();

    $('.contact-overlay-content').click(function(event) {
        return false;
    });

    $(window).on('load', function() {
        $('.popup-overlay').hide();
        $('.contact-overlay-content').hide();
        $('#footer').footerReveal();

        $('#home').css('padding-top', $('.navbar').outerHeight() * 2);
        $('#home').css('padding-bottom', $('.navbar').outerHeight() * 2);
        $('#team').css('padding-top', $('.navbar').outerHeight());
        $('#aboutus').css('padding-top', $('.navbar').outerHeight());
        $('#contact').css('padding-top', $('.navbar').outerHeight());
        $('section').css('padding-bottom', $('.navbar').outerHeight() * 2);
        $('.preloader').fadeOut(3000, function() {
            $('body').css('overflow','auto')
        });
        // $('.preloader').fadeOut(3000);
    });

    // Select all links with hashes
    $('a').not('[href="#"]').not('[href="#0"]').click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, "swing", function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
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

function copyToClipBoard() {
    var copyText = $('#contact-overlay-contact').text();
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showSnackBar();
}

function showSnackBar() {
    var x = $('#snackbar');
    x.addClass('show');
    setTimeout(function() {
        x.removeClass('show')
    }, 3000);
}

function closeOverlay(event) {
    event.preventDefault();
    $('.contact-overlay-content').hide('300', function() {
        $('.popup-overlay').hide();
    });
    $('body').css('overflow', 'auto');
}

function showContactPopUp(textToInsert, type) {
    if (1 <= type && type <= 2) {
        if (type === 1) {
            $('#contact-overlay-heading').text('Email');
        } else if (type == 2) {
            $('#contact-overlay-heading').text('Phone Number');
        }
        $('#contact-overlay-contact').text(textToInsert);
        $('.popup-overlay').show();
        $('.contact-overlay-content').show('300');
        $('body').css('overflow', 'hidden');
    }
}
