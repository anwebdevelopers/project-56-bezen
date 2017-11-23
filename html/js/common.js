$(function() {

    'use strict';

    /*******************************************************/
    //VARS
    /*******************************************************/
    var $window = $(window),
        $html = $('html'),
        $body = $('body'),
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
        w = $window.width();
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

    /*******************************************************/
    //SLIDER NEWS
    /*******************************************************/
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
    $('.research__box').addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        autoplay: true,
        autoplayTimeout: 10000,
        smartSpeed: 1200
    });

    /*******************************************************/
    //SEX TABS
    /*******************************************************/
    $('.disease__sex-img img').not(':first').hide();
    $('.disease__sex-buttons').on('click', 'label', function() {
        $(this).closest('.disease__sex').find('.disease__sex-img img').hide().eq($(this).index()).show();
    });

    /*******************************************************/
    //HOVER FOR IOS
    /*******************************************************/
    $('.news__item, .research__item, .blog__item').hover(function() {
        $(this).addClass('active');
    }, function() {
        $(this).removeClass('active');
    });

    /*******************************************************/
    //SLIDER GALLERY
    /*******************************************************/
    $('.gallery').addClass('owl-carousel').owlCarousel({
        nav: true,
        navText: '',
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
                items: 3,
            }
        }
    }).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*******************************************************/
    //VIDEO
    /*******************************************************/
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    /*******************************************************/
    //POPUP
    /*******************************************************/

    // $.magnificPopup.open({
    //     items: {
    //         src: '.popup',
    //         type: 'inline'
    //     },
    //     fixedContentPos: false,
    //     showCloseBtn: false
    // });

    /*******************************************************/
    //PAGE BOX MAX HEIGHT
    /*******************************************************/

    var $pageBoxMaxHeight = $('.page__box_max_height');

    $pageBoxMaxHeight.each(function() {
        var $this = $(this),
            $thisHeight = $this.height();
        if($thisHeight >= 300) {
            $this.css({
                'max-height' : '31rem'
            }).after('<button type="button" class="page__box-show hide">Читать подробнее...</button>');
        }
    });

    $('.page__box-show').on('click', function() {
        var $this = $(this);
        if ($this.hasClass('hide')) {
            $this.removeClass('hide')
            var $thisTextHeight = $this.prev($pageBoxMaxHeight).removeAttr('style').height();
            $this.html('Скрыть...').prev($pageBoxMaxHeight).css({
                'max-height' : '31rem'
            }).animate({
                'max-height' : $thisTextHeight + 'px'
            }, 300);
        } else {
            $this.html('Читать подробнее...').addClass('hide').prev($pageBoxMaxHeight).animate({
                'max-height' : '31rem'
            }, 300);
        }
    });

    /*******************************************************/
    //Аккордеон technologi
    /*******************************************************/
    var $questionsItem = $('.questions__item'),
        $questionsItemTitle = $('.questions__item-title'),
        $questionsItemText = $('.questions__item-text');

    $questionsItemTitle.addClass('hide');
    $questionsItemText.hide();

    $questionsItemTitle.on('click', function() {
        var $this = $(this);
        if($this.hasClass('hide')) {
            $this.removeClass('hide').closest($questionsItem).find($questionsItemText).slideDown(300);
        } else {
            $this.addClass('hide').closest($questionsItem).find($questionsItemText).slideUp(300);
        }
    });

    /*******************************************************/
    //SEX TABS
    /*******************************************************/
    $('.condition__tabs-sections-item').not(':first').hide();
    $('.condition__tabs-buttons-item').first().addClass('active');
    $('.condition__tabs-buttons').on('click', '.condition__tabs-buttons-item:not(.active)', function() {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active').closest('.condition__tabs').find('.condition__tabs-sections-item').slideUp(300).eq($this.index()).slideDown(300);
        $('html, body').animate({scrollTop: $this.closest('.condition__tabs').find('.condition__tabs-sections').offset().top }, 600, 'swing');
    });

    //*****************************************************
    // Google Map
    //*****************************************************
    if(typeof google === 'object' && typeof google.maps === 'object' && $('#map').length) {
        var markerPosition = new google.maps.LatLng(55.763319, 37.551117);

        function initialize() {
            var loc, map;

            loc = new google.maps.LatLng(55.763319, 37.551117);

            map = new google.maps.Map(document.getElementById('map'), {
                 zoom: 12,
                 center: loc,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 scrollwheel: false
            });

            var marker = new google.maps.Marker({
                map: map,
                position: markerPosition,
                visible: true,
                icon: 'img/icon-map.png'
            });
        }
        initialize();
        google.maps.event.addDomListener(window, 'load', initialize);
    }


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
        if(($html.hasClass('ie') || $html.hasClass('gecko')) && $body.hasClass('home') ) {
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
