$(function() {

    'use strict';

    /*******************************************************/
    //First Screen Slider
    /*******************************************************/
    var $headerBanner = $('.header__banner');
    if ($headerBanner.length > 1) {
        $headerBanner.wrapAll('<div class="header__slider owl-carousel"></div>');
        $('.header__slider').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            loop: true,
            items: 1,
            nav: true,
            navText: '',
            autoplayTimeout: 10000,
            autoplay: true,
            smartSpeed: 1200
        });
    }

    /*******************************************************/
    //Chrome Smooth Scroll
    /*******************************************************/
    try {
        $.browserSelector();
        if ($('html').hasClass('chrome')) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $('img, a').on('dragstart', function(event) {
        event.preventDefault();
    });

    /*******************************************************/
    //Fullscreen Header for IE
    /*******************************************************/

    var $header = $('.header');
    function fullscreen() {
        if($('html').hasClass('ie') || $('html').hasClass('gecko')) {
            $header.removeAttr('style');
            var windowHeight = $(window).height(),
                headerHeight = $header.height();
            if ( windowHeight >= headerHeight ) {
                $header.css({
                    'height' : windowHeight + 'px'
                });
            }
        }
    }
    fullscreen();
    $(window).resize(function() {
        fullscreen();
    });
});
