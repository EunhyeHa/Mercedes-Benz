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
        'transform': `translateY(${60 - opacity * 60}px)`
    });
});




// recommendation 
$(document).ready(function() {
    // 첫 번째 메뉴를 처음부터 활성화 상태로 설정
    $('.menu a').removeClass('active'); // 모든 메뉴 비활성화
    $('.menu a').first().addClass('active'); // 첫 번째 메뉴 활성화

    let images = $('.images img'); // 이미지 요소
    let firstImage = images.first(); // 첫 번째 이미지
    let chargingSections = $('.charging-section'); // 텍스트 섹션
    let firstTxt = $('#recommen1'); // 첫 번째 텍스트 섹션
    let menu = $('.menu');
    let recommenSection = $('.recommen');
    let recommenTop = recommenSection.offset().top;
    let recommenBottom = recommenTop + recommenSection.outerHeight(); // recommen 섹션의 끝 지점

    // 메뉴 처음엔 숨김
    menu.css('opacity', '0');

    $(window).scroll(function () {
        let scrollTop = $(this).scrollTop();
        let windowHeight = $(window).height();
        let lastImage = $('.images img').last(); // 마지막 이미지
        let lastImageTop = lastImage.offset().top;

        // recommen 섹션이 브라우저에서 보이기 시작할 때 메뉴가 서서히 나타남
        if (scrollTop >= recommenTop - windowHeight && scrollTop < recommenBottom) {
            let opacityValue = Math.min(1, (scrollTop - (recommenTop - windowHeight)) / windowHeight); // 서서히 나타나는 효과
            menu.css('opacity', opacityValue);

            // 첫 번째 텍스트와 이미지에 서서히 나타나고 사라지는 애니메이션 적용
            firstTxt.css('opacity', opacityValue);
            firstImage.css('opacity', opacityValue);

        } else {
            // recommen 섹션을 벗어나면 메뉴, 첫 번째 텍스트, 이미지 서서히 사라짐
            menu.css('opacity', '0');
            firstTxt.css('opacity', '0');
            firstImage.css('opacity', '0');
        }

        // recommen 섹션 내에서만 메뉴 고정
        if (scrollTop >= recommenTop && scrollTop < lastImageTop) {
            menu.css({
                'position': 'fixed',
                'top': '120px'
            });

            // 이미지와 텍스트가 동시에 나타나는 처리
            images.each(function(index) {
                let imgTop = $(this).offset().top;
                let imgHeight = $(this).outerHeight();

                // 이미지와 텍스트 영역의 50%가 보일 때
                if (scrollTop >= imgTop - windowHeight / 2 && scrollTop < imgTop + imgHeight - windowHeight / 2) {
                    // 메뉴 활성화
                    $('.menu a').removeClass('active');
                    $('.menu a').eq(index).addClass('active');

                    // 텍스트 섹션 보이기
                    $('.charging-section').removeClass('visible');
                    $('#recommen' + (index + 1)).addClass('visible');

                    // 이미지 보이기
                    images.removeClass('visible');
                    $(this).addClass('visible'); // 이미지에 visible 클래스 추가
                }
            });
        } 
        // 마지막 이미지가 최상단에 닿을 때 메뉴 고정 해제
        else if (scrollTop >= lastImageTop || scrollTop < recommenTop) {
            menu.css({
                'position': 'absolute',
                'top': (scrollTop >= recommenTop ? (lastImageTop - recommenTop) + 'px' : 'initial')
            });
        }
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
let modelstabMenu = $('.models li');
let modelsimages = $('.models .content img');

modelstabMenu.click(function(e){
    e.preventDefault();
    modelstabMenu.removeClass('active');
    $(this).addClass('active');

    // 현재 클릭한 항목의 텍스트에 따라 이미지 변경
    let selectedModel = $(this).find('span').text().toLowerCase(); // 선택된 모델 이름
    modelsimages.removeClass('active');

    // 선택된 모델에 해당하는 이미지 보이기
    modelsimages.each(function() {
        if ($(this).attr('alt') === selectedModel) {
            $(this).addClass('active');
        }
    });
});


// outro
gsap.registerPlugin(ScrollTrigger);

let outro = document.querySelector('.outro');
gsap.to(outro, {
    scrollTrigger: {
        trigger: outro,
        start: "top top",
        end: "bottom top", // outro 섹션의 하단이 브라우저 최상단에 도달할 때 종료
        pin: true, 
        scrub: true,
        markers: false
    }
});

// 각 inner 요소에 대해 애니메이션 설정
let sections = gsap.utils.toArray('.outro > div');

// 초기 상태 설정
sections.forEach((section) => {
    gsap.set(section, { opacity: 0 }); // 모든 요소를 숨김
});

// 첫 번째 요소 애니메이션
gsap.to(sections[0], {
    opacity: 1,
    scrollTrigger: {
        trigger: sections[0],
        start: "top bottom", // 첫 번째 요소가 브라우저 바닥에 도달할 때 시작
        end: "bottom+=1200 bottom", // 첫 번째 요소가 완전히 사라지기 전에 더 오래 유지
        scrub: true,
        onEnter: () => {
            gsap.to(sections[0], { opacity: 1 });
        },
        onLeave: () => {
            gsap.to(sections[0], { opacity: 0 });
        },
        markers: false
    }
});

// 두 번째 요소 애니메이션
gsap.to(sections[1], {
    opacity: 1,
    scrollTrigger: {
        trigger: sections[0],
        start: "bottom+=1300 bottom", // 첫 번째 요소가 브라우저 바닥에 도달할 때 시작
        end: "bottom bottom", // 두 번째 요소가 보일 때까지 더 많은 스크롤 필요
        scrub: true,
        onEnter: () => {
            gsap.to(sections[1], { opacity: 1 });
        },
        onLeaveBack: () => {
            gsap.to(sections[1], { opacity: 0 });
        },
        markers: false
    }
});


// outro last txt
let outroText = $('.last-txt h1');
let windowHeight = $(window).height();

$(window).scroll(function () {
    let scrollTop = $(this).scrollTop();
    let elementOffset = outroText.offset().top;
    let distance = (elementOffset - scrollTop) - windowHeight / 2;

    let opacity = Math.min(Math.max(1 - distance / 400, 0), 1);
    outroText.css({
        'color': `rgba(255, 255, 255, ${opacity})`,
        'transform': `translateY(${100 - opacity * 100}px)`
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