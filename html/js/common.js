$(function() {

    'use strict';

    /*******************************************************/
    //VARS
    /*******************************************************/
    var $window = $(window),
        $html = $('html'),
        w = $window.width();


    /*******************************************************/
    //MENU MOBILE
    /*******************************************************/
    var $headerMenu = $('.header__menu'),
        $headerButtonMenu = $('.header__button-menu');
    $headerButtonMenu.click(function() {
        $(this).toggleClass('active');
        $headerMenu.toggleClass('active');
    });

    /*******************************************************/
    //SUBMENU MOBILE
    /*******************************************************/
    $headerMenu.find('a').click(function(e) {
        if (w <= 960) {
            var $this = $(this),
                $ul = $this.next('ul'),
                $li = $this.closest('li');
            if ($ul.length && !$li.hasClass('active')) {
                e.preventDefault();
                $ul.slideDown(300);
                $li.addClass('active').siblings().removeClass('active').find('ul').slideUp(300);
            } else {
                $headerMenu.toggleClass('active');
                $headerButtonMenu.toggleClass('active');
            }
        }
    });

    /*******************************************************/
    //FIRST SCREEN SLIDER
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
            autoplay: true,
            autoplayTimeout: 10000,
            smartSpeed: 1200
        });
    }

    //------------------------------------------------------------
    //SLIDER NEWS
    //------------------------------------------------------------
    $('.news__box').addClass('owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        navText: '',
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 600,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            481: {
                items: 2
            },
            961: {
                items: 3
            }
        }
    });

    /*******************************************************/
    //NEWS SLIDER
    /*******************************************************/
    // $headerBanner.wrapAll('<div class="header__slider owl-carousel"></div>');
    $('.research__box').addClass('owl-carousel').owlCarousel({
        // animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        autoplay: true,
        autoplayTimeout: 10000,
        smartSpeed: 1200
    });

    //------------------------------------------------------------
    //HOVER FOR IOS
    //------------------------------------------------------------
    $('.news__item').hover(function() {
        $(this).addClass('active');
    }, function() {
        $(this).removeClass('active');
    });

    /*******************************************************/
    //Chrome Smooth Scroll
    /*******************************************************/
    try {
        $.browserSelector();
        if ($html.hasClass('chrome')) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $('img, a').on('dragstart', function(e) {
        e.preventDefault();
    });

    /*******************************************************/
    //Fullscreen Header for IE
    /*******************************************************/

    var $header = $('.header');
    function fullscreen() {
        if($html.hasClass('ie') || $html.hasClass('gecko')) {
            $header.removeAttr('style');
            var windowHeight = $window.height(),
                headerHeight = $header.height();
            if ( windowHeight >= headerHeight ) {
                $header.css({
                    'height' : windowHeight + 'px'
                });
            }
        }
    }
    fullscreen();


    $window.resize(function() {

        $headerMenu.find('ul, li').removeAttr('style').removeClass('active');

        fullscreen();
    });

    /*******************************************************/
    //SECTION COUNTER
    /*******************************************************/
    var $section = $('.section');
    $section.each(function() {
        $(this).find('[class*="__container"]').prepend('<div class="counter"><span class="counter__number">' + ($(this).index('.section') + 1) + '</span><span class="counter__quantity"> /' + $section.length + '</span></div>');
    });
});
