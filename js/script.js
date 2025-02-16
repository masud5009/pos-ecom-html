!(function ($) {

    'use strict';

    /* hero slider */
    $(document).ready(function () {
        // Initialize the slider
        $('.hero-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000, // Adjust autoplay speed
            arrows: false,
            dots: true,
            fade: true, // Disable Slick's fade effect
            cssEase: 'linear',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        fade: true
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        fade: true
                    }
                }
            ]
        });
    
        // Handle animations
        $('.hero-slider').on('init beforeChange', function (e, slick, currentSlide, nextSlide) {
            var targetSlide = nextSlide !== undefined ? nextSlide : 0;
            var animatingElements = $(this).find(`.slider-item[data-slick-index="${targetSlide}"] [data-animation]`);
            doAnimations(animatingElements);
        });
    
        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $element = $(this);
                var animationDelay = $element.data('delay');
                var animationType = 'animate__animated ' + $element.data('animation');
    
                // Reset animation state
                $element.css({
                    'animation-delay': '',
                    '-webkit-animation-delay': ''
                }).removeClass(animationType);
    
                // Reapply animation
                setTimeout(function () {
                    $element.css({
                        'animation-delay': animationDelay,
                        '-webkit-animation-delay': animationDelay
                    }).addClass(animationType).one(animationEndEvents, function () {
                        $element.removeClass(animationType);
                    });
                }, 10); // Small delay to ensure the reset takes effect
            });
        }
    });
    /*flash sale */
    $('.flash-sale-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    });

    function updateCountdown() {
        $('.product').each(function () {
            let endTime = new Date($(this).data('time')).getTime();
            let now = new Date().getTime();
            let distance = endTime - now;
            if (distance < 0) {
                $(this).find('.countdown').text('Expired');
            } else {
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                $(this).find('.countdown').text(hours + 'h ' + minutes + 'm ' + seconds + 's');
            }
        });
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


    document.addEventListener("DOMContentLoaded", function () {
        const tabButtons = document.querySelectorAll(".tab-button");
        const productGrids = document.querySelectorAll(".product-grid");

        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                // Remove active class from all buttons and grids
                tabButtons.forEach((btn) => btn.classList.remove("active"));
                productGrids.forEach((grid) => grid.classList.remove("active"));

                // Add active class to the clicked button and corresponding grid
                button.classList.add("active");
                const category = button.getAttribute("data-category");
                document.querySelector(`.product-grid[data-category="${category}"]`).classList.add("active");
            });
        });
    });

    new WOW().init(); // Initialize WOW.js

})(jQuery);