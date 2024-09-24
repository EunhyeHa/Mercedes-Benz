// menu
let mainMenu = $('header nav .main-menu > li');
let lastScrollTop = 0;
let header = $('header');

// scroll
$(window).scroll(function() {
    let scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
        header.css('top', '-110px');
    } else {
        header.css('top', '0');
    }
    lastScrollTop = scrollTop;
});

// menu
mainMenu.mouseenter(function() {
    $(this).find('.sub-menu').stop().slideDown(500);
}).mouseleave(function() {
    $(this).find('.sub-menu').stop().slideUp(500);
});

// intro title
