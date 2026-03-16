$(function () {
  // ========== GSAP 초기화 ==========
  gsap.registerPlugin(ScrollTrigger);

  let con01, con02, con03, con04, headerHeight;
  let isScrollingProgrammatically = false;

  function updateOffsets() {
    headerHeight = $('header').outerHeight();
    con01 = $('#con01').offset().top - headerHeight;
    con02 = $('#con02').offset().top - headerHeight;
    con03 = $('#con03').offset().top - headerHeight;
    con04 = $('#con04').offset().top - headerHeight;
  }

  $(window).on('resize', updateOffsets);
  updateOffsets();

  // ========== 모바일 햄버거 메뉴 ==========

  // 햄버거 버튼 (왼쪽)
  var $hamburger = $(`
    <div class="hamburger" aria-label="메뉴">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `).prependTo('.wrap');

  // 돋보기 버튼 (오른쪽)
  var $searchBtn = $(`
    <div class="mobile-search-btn" aria-label="검색">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  `).appendTo('.wrap');

  // 풀스크린 메뉴 패널
  var $mobileNav = $(`
    <nav class="mobile-nav">
      <span class="mobile-menu-link" data-section="0">SHOP</span>
      <span class="mobile-menu-link" data-section="1">STORY</span>
      <span class="mobile-menu-link" data-section="2">FURNITURE</span>
      <span class="mobile-menu-link" data-section="3">COMMUNITY</span>
      <div class="mobile-util">
        <a href="#">LOGIN</a>
        <a href="#">JOIN</a>
        <a href="#">WISH</a>
        <a href="#">CART</a>
        <a href="#">MY PAGE</a>
      </div>
      <div class="mobile-social">
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
        <a href="#"><i class="fa-brands fa-facebook"></i></a>
        <a href="#"><i class="fa-brands fa-youtube"></i></a>
      </div>
    </nav>
  `).appendTo('body');

  function openMenu() {
    $hamburger.addClass('open');
    $mobileNav.addClass('open');
    $('body').css('overflow', 'hidden');
  }

  function closeMenu() {
    $hamburger.removeClass('open');
    $mobileNav.removeClass('open');
    $('body').css('overflow', '');
  }

  $hamburger.on('click', function () {
    $mobileNav.hasClass('open') ? closeMenu() : openMenu();
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  $(window).on('resize', function () {
    if ($(window).width() > 768) closeMenu();
  });

  // ========== 모바일 메뉴 → 섹션 이동 ==========
  $mobileNav.find('.mobile-menu-link').on('click', function () {
    var sectionIndex = parseInt($(this).data('section'));
    closeMenu();
    // 메뉴 닫히는 애니메이션(0.45s) 후 스크롤
    setTimeout(function () {
      var hh = $('header').outerHeight();
      var target = $('section').eq(sectionIndex).offset().top - hh;
      isScrollingProgrammatically = true;
      $('html, body').animate(
        { scrollTop: target },
        {
          duration: 700,
          easing: 'easeInOutCubic',
          complete: function () {
            isScrollingProgrammatically = false;
          },
        },
      );
    }, 460);
  });

  // ========== GSAP ScrollTrigger 애니메이션 ==========

  gsap.from('.section-header h2', {
    scrollTrigger: {
      trigger: '#con02',
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.section-header p', {
    scrollTrigger: {
      trigger: '#con02',
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
  });

  gsap.set('.category-item', { opacity: 0, y: 100 });

  gsap.to('.category-item', {
    scrollTrigger: {
      trigger: '#con02',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.25,
    ease: 'power3.out',
  });

  gsap.from('#con03 .section-title', {
    scrollTrigger: {
      trigger: '#con03',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.furniture-content', {
    scrollTrigger: {
      trigger: '#con03',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: 'power3.out',
  });

  gsap.from('#con04 .section-title', {
    scrollTrigger: {
      trigger: '#con04',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: 'back.out(1.7)',
  });

  gsap.from('#con04 .em', {
    scrollTrigger: {
      trigger: '#con04',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out',
  });

  gsap.to('#con01 .panel li', {
    scrollTrigger: {
      trigger: '#con01',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: '30%',
    ease: 'none',
  });

  // ========== 스크롤 이벤트 ==========
  $(window).on('scroll', function () {
    if (isScrollingProgrammatically) return;

    let scroll = $(this).scrollTop();

    if (scroll >= con02) {
      $('header').addClass('on');
      $('.wrap').addClass('scrolled');
    } else {
      $('header').removeClass('on');
      $('.wrap').removeClass('scrolled');
    }

    $('#con02, #con03').removeClass('on');

    if (scroll >= con01 && scroll < con02) {
      $('#navi li').removeClass('on').eq(0).addClass('on');
    } else if (scroll >= con02 && scroll < con03) {
      $('#navi li').removeClass('on').eq(1).addClass('on');
      $('#con02').addClass('on');
    } else if (scroll >= con03 && scroll < con04) {
      $('#navi li').removeClass('on').eq(2).addClass('on');
      $('#con03').addClass('on');
    } else if (scroll >= con04) {
      $('#navi li').removeClass('on').eq(3).addClass('on');
    }
  });

  // ========== 데스크탑 네비게이션 클릭 ==========
  function scrollToSection(index, callback) {
    let hh = $('header').outerHeight();
    let target = $('section').eq(index).offset().top - hh;
    $('html, body').animate(
      { scrollTop: target },
      {
        duration: 800,
        easing: 'easeInOutCubic',
        complete: function () {
          if (callback) callback();
        },
      },
    );
  }

  $('.wrap .left li').on('click', function (e) {
    e.preventDefault();
    let i = $(this).index();
    isScrollingProgrammatically = true;
    $('#navi li').removeClass('on').eq(i).addClass('on');
    scrollToSection(i, function () {
      isScrollingProgrammatically = false;
    });
  });

  $('.wrap .right .co').on('click', function (e) {
    e.preventDefault();
    let lastIndex = $('section').length - 1;
    isScrollingProgrammatically = true;
    $('#navi li').removeClass('on').eq(lastIndex).addClass('on');
    scrollToSection(lastIndex, function () {
      isScrollingProgrammatically = false;
    });
  });

  $('#navi li').on('click', function () {
    let i = $(this).index();
    isScrollingProgrammatically = true;
    $('#navi li').removeClass('on').eq(i).addClass('on');
    scrollToSection(i, function () {
      isScrollingProgrammatically = false;
    });
    if (i === 1) {
      $('#con02').addClass('on');
    } else {
      $('#con02').removeClass('on');
    }
  });

  $('.scroll-indicator').on('click', function (e) {
    e.preventDefault();
    isScrollingProgrammatically = true;
    scrollToSection(1, function () {
      isScrollingProgrammatically = false;
    });
  });

  // ========== 가구 메뉴 인터랙션 ==========
  $('.furniture-menu p').on('click', function () {
    let i = $(this).index();
    $('.furniture-menu p').removeClass('on');
    $(this).addClass('on');
    $('.furniture-visuals .furniture-panel').removeClass('active');
    $('.furniture-visuals .furniture-panel').eq(i).addClass('active');
    $('.bottom .furniture-panel').removeClass('active');
    $('.bottom .furniture-panel').eq(i).addClass('active');
  });

  // ========== Swiper 초기화 ==========
  var swiper = new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    initialSlide: 3,
    coverflowEffect: {
      rotate: 25,
      stretch: 0,
      depth: 100,
      modifier: 1.5,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    loop: false,
    on: {
      slideChange: function () {
        gsap.from(this.slides[this.activeIndex], {
          scale: 0.9,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    },
  });

  // ========== 자동 배경 이미지 슬라이드 ==========
  let currentSlide = 0;
  let $panel = $('#con01 .panel li');
  let total = $panel.length;

  $panel.css({ opacity: 0, display: 'block' });
  $panel.eq(0).css('opacity', 1);

  function crossfade() {
    let nextSlide = (currentSlide + 1) % total;
    gsap.to($panel.eq(currentSlide), {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    });
    gsap.to($panel.eq(nextSlide), {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    });
    currentSlide = nextSlide;
  }

  setInterval(crossfade, 3000);

  // ========== 마우스 커서 효과 ==========
  let cursorFollower = $('<div class="cursor-follower"></div>');
  $('body').append(cursorFollower);

  $(document).on('mousemove', function (e) {
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  $('a, .category-item, .swiper-slide')
    .on('mouseenter', function () {
      gsap.to(cursorFollower, { scale: 2, duration: 0.3, ease: 'power2.out' });
    })
    .on('mouseleave', function () {
      gsap.to(cursorFollower, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });

  // ========== 스크롤 진행 표시 ==========
  let progressBar = $('<div class="scroll-progress"></div>');
  $('body').append(progressBar);

  $(window).on('scroll', function () {
    let scrollTop = $(window).scrollTop();
    let docHeight = $(document).height();
    let winHeight = $(window).height();
    let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    gsap.to(progressBar, {
      width: scrollPercent + '%',
      duration: 0.3,
      ease: 'none',
    });
  });

  // ========== 로딩 애니메이션 ==========
  $(window).on('load', function () {
    gsap.to('.visual-content', {
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
    });
  });

  // ========== easing 함수 ==========
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  };

  // ========== 카테고리 3D 틸트 효과 ==========
  $('.category-item').each(function () {
    let $item = $(this);
    let $imageWrap = $item.find('.category-image-wrap');

    $item.on('mousemove', function (e) {
      let rect = this.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let centerX = rect.width / 2;
      let centerY = rect.height / 2;
      gsap.to($imageWrap, {
        rotationX: (y - centerY) / 10,
        rotationY: (centerX - x) / 10,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    $item.on('mouseleave', function () {
      gsap.to($imageWrap, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });

  // ========== View More 버튼 애니메이션 ==========
  $('.view-more-btn').each(function () {
    let $btn = $(this);
    $btn.on('mouseenter', function () {
      gsap.to($btn, { x: 10, duration: 0.3, ease: 'power2.out' });
    });
    $btn.on('mouseleave', function () {
      gsap.to($btn, { x: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // ========== 추가 CSS 동적 삽입 ==========
  $('<style>')
    .text(
      `
    .cursor-follower {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(180, 152, 92, 0.3);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: background 0.3s ease;
      mix-blend-mode: difference;
    }
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #b4985c, #d4af37);
      z-index: 10000;
      box-shadow: 0 0 10px rgba(180, 152, 92, 0.5);
    }
    @media (min-width: 769px) {
      .hamburger,
      .mobile-search-btn,
      .mobile-nav {
        display: none !important;
      }
    }
  `,
    )
    .appendTo('head');

  // ========== 반응형 커서 처리 ==========
  function handleResponsive() {
    $(window).width() <= 768
      ? $('.cursor-follower').hide()
      : $('.cursor-follower').show();
  }

  handleResponsive();
  $(window).on('resize', handleResponsive);

  // ========== 이미지 즉시 표시 ==========
  $('img').css('opacity', 1);

  $('img')
    .not('.footer-logo img, #con01 .panel li')
    .each(function () {
      let $img = $(this);
      if (this.complete) {
        $img.css('opacity', 1);
      } else {
        $img.css('opacity', 0.3);
        $img.on('load', function () {
          gsap.to($img, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        });
      }
    });

  // ========== 푸터 애니메이션 ==========
  gsap.set('.social-icon', { opacity: 1, scale: 1 });

  gsap.from('.footer-logo', {
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  });

  gsap.from('.footer-info .info-item', {
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out',
  });

  gsap.from('.social-icon', {
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)',
  });

  gsap.from('.footer-bottom', {
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out',
  });

  console.log('🎨 RAMMXE Furniture - Enhanced with GSAP animations');
});
