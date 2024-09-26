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
$(document).ready(function () {
    let recomenuLinks = $('.menu a');
    let recoSections = $('.charging-section');
    let recomenu = $('.menu');

    // 메뉴 클릭 시 부드러운 스크롤
    recomenuLinks.click(function (event) {
        event.preventDefault();
        let target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 500);
    });

    // GSAP ScrollTrigger 설정
    gsap.registerPlugin(ScrollTrigger);

    recoSections.each(function (index) {
        gsap.fromTo($(this), 
            { 
                y: 100, // 시작 위치
                opacity: 0 // 시작 투명도
            }, 
            { 
                y: 0, 
                opacity: 1, 
                scrollTrigger: {
                    trigger: $(this),
                    start: "top 80%", // 섹션의 상단이 뷰포트의 80% 지점에 도달할 때
                    toggleActions: "play none none reverse", // 스크롤 시 애니메이션 재생 및 되감기
                    markers: false // 디버그를 위해 마커를 추가할 수 있음
                }
            }
        );
    });
});



// models 
// title scroll
$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let windowHeight = $(this).height();
    let modelsSection = $('.models');
    let modelsText = modelsSection.find('h1');

    // 모델 섹션의 위치와 높이 계산
    let sectionOffsetTop = modelsSection.offset().top;
    let sectionHeight = modelsSection.outerHeight();

    // 섹션이 뷰포트에 들어올 때 애니메이션 적용
    if (scrollTop + windowHeight > sectionOffsetTop && scrollTop < sectionOffsetTop + sectionHeight) {
        let opacity = Math.min((scrollTop - sectionOffsetTop + windowHeight) / 800, 1);
        modelsText.css({
            'color': `rgba(0,0,0, ${opacity})`,
            'transform': `translateY(${50 - opacity * 50}px)`
        });
    } else {
        // 섹션이 화면에서 벗어날 때 초기 상태로 되돌리기
        modelsText.css({
            'color': 'transparent',
            'transform': 'translateY(50px)'
        });
    }
});

// list tab
let tabMenu = $('.models li');
let images = $('.models .content img');

tabMenu.click(function(e){
    e.preventDefault();
    tabMenu.removeClass('active');
    $(this).addClass('active');

    // 현재 클릭한 항목의 텍스트에 따라 이미지 변경
    let selectedModel = $(this).find('span').text().toLowerCase(); // 선택된 모델 이름
    images.removeClass('active');

    // 선택된 모델에 해당하는 이미지 보이기
    images.each(function() {
        if ($(this).attr('alt') === selectedModel) {
            $(this).addClass('active');
        }
    });
});


// outro
gsap.registerPlugin(ScrollTrigger);

// 전체 아우트로 섹션 고정
gsap.to('.outro', {
    scrollTrigger: {
        trigger: '.outro',
        start: "top top",  // 아우트로 섹션이 스크롤의 맨 위에 닿을 때
        end: "bottom top",  // 아우트로 섹션이 스크롤의 맨 아래에 닿을 때
        pin: true,          // 아우트로 섹션 고정
        scrub: true,
    }
});

// 패럴랙스 효과 적용
gsap.utils.toArray('.outro div').forEach((section, index) => {
    gsap.fromTo(section, 
        { opacity: 0, y: 100 },  // 초기 상태
        { 
            opacity: 1, y: 0,     // 나타나는 효과
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: true,  // 스크롤에 따라 애니메이션이 부드럽게 진행
                markers: true, // 디버깅용 마커
                toggleActions: "play none none reverse" // 애니메이션을 한 번만 실행하도록 설정
            }
        });
});

// 배경의 패럴랙스 효과
gsap.utils.toArray('.outro div').forEach((section, index) => {
    gsap.to(section, {
        yPercent: -20,  // 배경이 천천히 위로 이동
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});











// footer
// back to top
let BTT = $('footer .back-to-top');

BTT.click(function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});