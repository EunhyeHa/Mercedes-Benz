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

    // 각 txt 요소 초기 상태 설정 (숨김)
    $('.txt').css({
        opacity: 0,
        transform: 'translateY(20px)', // 아래쪽으로 이동
        transition: 'opacity 0.5s ease, transform 0.5s ease' // 전환 효과
    });

    // 스크롤 시 이벤트 처리
    $(window).scroll(function() {
        let scrollTop = $(this).scrollTop();

        sections.each(function() {
            let sectionOffset = $(this).offset().top; // 각 섹션의 상단 위치
            let sectionHeight = $(this).outerHeight(); // 각 섹션의 높이
            let id = $(this).attr('id'); // 현재 섹션의 ID

            // 스크롤 위치가 섹션의 상단과 하단 사이에 있을 때
            if (scrollTop >= sectionOffset - 100 && scrollTop < sectionOffset + sectionHeight) {
                menuLinks.removeClass('active'); // 모든 메뉴 링크의 활성화 상태 제거
                menuLinks.filter(`[href="#${id}"]`).addClass('active'); // 현재 섹션에 맞는 메뉴 링크 활성화

                // 현재 섹션의 txt 요소 서서히 보이기
                $(this).find('.txt').css({
                    opacity: 1,
                    transform: 'translateY(0)' // 원래 위치로 이동
                });

                // 메뉴 고정 처리
                if (id === 'recommen4') {
                    menu.css({
                        position: 'absolute',
                        top: sectionOffset + sectionHeight - menu.outerHeight() + 'px'
                    });
                } else {
                    menu.css({
                        position: 'fixed',
                        top: '20px'
                    });
                }
            } else {
                // 현재 섹션이 보이지 않으면 txt 요소 비활성화
                $(this).find('.txt').css({
                    opacity: 0,
                    transform: 'translateY(20px)' // 아래쪽으로 이동
                });
            }
        });

        // 메뉴 고정 처리
        if (scrollTop >= menuOffset && scrollTop < sections.last().offset().top + sections.last().outerHeight() - menu.outerHeight()) {
            menu.css({
                position: 'fixed',
                top: '100px'
            });
        } else {
            menu.css({
                position: 'absolute',
                top: '100px'
            });
        }
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
