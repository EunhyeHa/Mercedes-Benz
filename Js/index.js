// menu
let mainMenu = $('header nav .main-menu > li');
let lastScrollTop = 0;
let header = $('header');

// scroll
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
        header.css('top', '-110px');
    } else {
        header.css('top', '0');
    }
    lastScrollTop = scrollTop;
});

// side-menu
mainMenu.mouseenter(function () {
    $(this).find('.sub-menu').stop().slideDown(500);
}).mouseleave(function () {
    $(this).find('.sub-menu').stop().slideUp(500);
});


// intro title
let introText = $('.intro h2');

$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let opacity = Math.min(scrollTop / 800, 1);
    introText.css({
        'color': `rgba(255, 255, 255, ${opacity})`,
        'transform': `translateY(${50 - opacity * 50}px)`
    });
});


// recommen list
$(document).ready(function() {
    let menuLinks = $('.menu a');
    let sections = $('.list > div');
    let menu = $('.menu');
    let menuOffset = menu.offset().top; // 메뉴의 초기 위치

    // 각 섹션의 위치를 고정
    sections.each(function(index) {
        $(this).css({
            top: index * $(window).height() + 'px' // 각 섹션을 화면 높이만큼 아래로 배치
        });
    });

    // 스크롤 시 이벤트 처리
    $(window).scroll(function() {
        let scrollTop = $(this).scrollTop();
        let windowHeight = $(window).height(); // 현재 창의 높이

        sections.each(function(index) {
            let sectionOffset = $(this).offset().top; // 각 섹션의 상단 위치

            // 스크롤 위치가 섹션의 상단에 도달했을 때
            if (scrollTop + windowHeight > sectionOffset) {
                $(this).addClass('visible'); // 해당 섹션 보이기
            } else {
                $(this).removeClass('visible'); // 해당 섹션 숨기기
            }
        });

        // 메뉴 고정 처리
        if (scrollTop >= menuOffset) {
            menu.css({
                position: 'fixed',
                top: '120px'
            });
        } else {
            menu.css({
                position: 'absolute',
                top: '100px' // 원하는 위치 조정
            });
        }

        // 메뉴 링크 활성화 처리
        sections.each(function() {
            let sectionOffset = $(this).offset().top; // 각 섹션의 상단 위치
            let sectionHeight = $(this).outerHeight(); // 각 섹션의 높이
            let id = $(this).attr('id'); // 현재 섹션의 ID

            if (scrollTop >= sectionOffset - 100 && scrollTop < sectionOffset + sectionHeight) {
                menuLinks.removeClass('active'); // 모든 메뉴 링크의 활성화 상태 제거
                menuLinks.filter(`[href="#${id}"]`).addClass('active'); // 현재 섹션에 맞는 메뉴 링크 활성화
            }
        });
    });

    // 메뉴 클릭 시 부드러운 스크롤
    menuLinks.click(function(event) {
        event.preventDefault(); // 기본 링크 동작 방지
        let target = $(this).attr('href'); // 클릭한 링크의 href 속성
        $('html, body').animate({
            scrollTop: $(target).offset().top // 해당 섹션으로 스크롤
        }, 500);
    });
});


// footer
// back to top
let BTT = $('footer .back-to-top');

BTT.click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});