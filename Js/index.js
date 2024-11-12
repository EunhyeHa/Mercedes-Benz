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
    // 화면 너비가 430px 이하일 경우 동작 중지
    if ($(window).width() <= 430) {
        $('.menu').css('display', 'none');
        $('.charging-section').css('opacity', '1');
        $('.images img').css('opacity', '1');
        return;
    }

    $('.menu a').removeClass('active'); 
    $('.menu a').first().addClass('active');

    let images = $('.images img');
    let firstImage = images.first();
    let chargingSections = $('.charging-section');
    let firstTxt = $('#recommen1');
    let menu = $('.menu');
    let recommenSection = $('.recommen');
    let recommenTop = recommenSection.offset().top;
    let recommenBottom = recommenTop + recommenSection.outerHeight(); 

    // 메뉴 처음엔 숨김
    menu.css('opacity', '0');

    $(window).scroll(function () {
        let scrollTop = $(this).scrollTop();
        let windowHeight = $(window).height();
        let lastImage = $('.images img').last();
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
                    $('.menu a').removeClass('active');
                    $('.menu a').eq(index).addClass('active');

                    $('.charging-section').removeClass('visible');
                    $('#recommen' + (index + 1)).addClass('visible');

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

    let selectedModel = $(this).find('span').text().toLowerCase(); // 선택된 모델 이름
    modelsimages.removeClass('active');

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
        end: "bottom top",
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
        start: "top bottom",
        end: "bottom+=1200 bottom",
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
        start: "bottom+=1300 bottom",
        end: "bottom bottom",
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

// mobile
document.querySelectorAll('.main-menu').forEach(button => {
    button.addEventListener('click', function() {
        const subMenu = this.nextElementSibling;
        subMenu.classList.toggle('active');
    });
});



// 모바일
// 햄버거 메뉴
document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.querySelector(".menu-bar a");
    const menuImage = document.getElementById("menuImage");
    const nav = document.querySelector(".menu-bar nav");

    menuLink.addEventListener("click", function(event) {
        event.preventDefault();

        // 이미지 경로 설정
        const defaultImage = "./assets/images/icon/menu_mo.png";
        const clickedImage = "./assets/images/icon/menu_mo_clicked.png";

        // 현재 이미지와 새로운 이미지 교체 및 nav 클래스 토글
        if (menuImage.src.includes("menu_mo.png")) {
            menuImage.src = clickedImage;
            nav.classList.add("menu-mo-clicked");  // nav 보이기
        } else {
            menuImage.src = defaultImage;
            nav.classList.remove("menu-mo-clicked");  // nav 숨기기
        }
    });

    // 서브 메뉴 토글 기능
    document.querySelectorAll('.menu-mo > li > a').forEach((menuItem) => {
        menuItem.addEventListener('click', function(event) {
            event.preventDefault();

            const subMenu = this.nextElementSibling;

            // 서브 메뉴가 열리면 다른 서브 메뉴는 닫기
            document.querySelectorAll('.sub-mo').forEach((sub) => {
                if (sub !== subMenu) {
                    sub.classList.remove('open');  // 다른 서브 메뉴 닫기
                }
            });

            // 서브 메뉴 토글
            subMenu.classList.toggle('open'); // 클릭한 서브 메뉴 열기/닫기
        });
    });
});