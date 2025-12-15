$(function () {
  // ========== GSAP 초기화 ==========
  gsap.registerPlugin(ScrollTrigger);

  // 변수 선언
  let con01, con02, con03, con04, headerHeight;
  let isScrollingProgrammatically = false;

  // 섹션 위치 업데이트 함수
  function updateOffsets() {
    headerHeight = $("header").outerHeight();
    con01 = $("#con01").offset().top - headerHeight;
    con02 = $("#con02").offset().top - headerHeight;
    con03 = $("#con03").offset().top - headerHeight;
    con04 = $("#con04").offset().top - headerHeight;
  }

  $(window).on("resize", updateOffsets);
  updateOffsets();

  // ========== GSAP ScrollTrigger 애니메이션 ==========

  // Con02 텍스트 애니메이션
  gsap.from(".section-header h2", {
    scrollTrigger: {
      trigger: "#con02",
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".section-header p", {
    scrollTrigger: {
      trigger: "#con02",
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  // Con02 카테고리 아이템 순차 애니메이션
  gsap.set(".category-item", { opacity: 0, y: 100 });

  gsap.to(".category-item", {
    scrollTrigger: {
      trigger: "#con02",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.25,
    ease: "power3.out",
  });

  // Con03 섹션 타이틀 애니메이션
  gsap.from("#con03 .section-title", {
    scrollTrigger: {
      trigger: "#con03",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power3.out",
  });

  // Con03 Furniture Content 애니메이션
  gsap.from(".furniture-content", {
    scrollTrigger: {
      trigger: "#con03",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power3.out",
  });

  // Con04 섹션 애니메이션
  gsap.from("#con04 .section-title", {
    scrollTrigger: {
      trigger: "#con04",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "back.out(1.7)",
  });

  gsap.from("#con04 .em", {
    scrollTrigger: {
      trigger: "#con04",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: "power3.out",
  });

  // Parallax 효과 - 비주얼 배경
  gsap.to("#con01 .panel li", {
    scrollTrigger: {
      trigger: "#con01",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    y: "30%",
    ease: "none",
  });

  // ========== 스크롤 이벤트 ==========
  $(window).on("scroll", function () {
    if (isScrollingProgrammatically) return;

    let scroll = $(this).scrollTop();

    // 헤더 고정 및 스타일 변경
    if (scroll >= con02) {
      $("header").addClass("on");
      $(".wrap").addClass("scrolled");
    } else {
      $("header").removeClass("on");
      $(".wrap").removeClass("scrolled");
    }

    // 네비게이션 활성화
    $("#con02, #con03").removeClass("on");

    if (scroll >= con01 && scroll < con02) {
      $("#navi li").removeClass("on").eq(0).addClass("on");
    } else if (scroll >= con02 && scroll < con03) {
      $("#navi li").removeClass("on").eq(1).addClass("on");
      $("#con02").addClass("on");
    } else if (scroll >= con03 && scroll < con04) {
      $("#navi li").removeClass("on").eq(2).addClass("on");
      $("#con03").addClass("on");
    } else if (scroll >= con04) {
      $("#navi li").removeClass("on").eq(3).addClass("on");
    }
  });

  // ========== 네비게이션 클릭 이벤트 ==========

  // 섹션으로 부드럽게 이동
  function scrollToSection(index, callback) {
    let headerHeight = $("header").outerHeight();
    let target = $("section").eq(index).offset().top - headerHeight;

    $("html, body").animate(
      { scrollTop: target },
      {
        duration: 800,
        easing: "easeInOutCubic",
        complete: function () {
          if (callback) callback();
        },
      }
    );
  }

  // 좌측 메뉴 클릭
  $(".wrap .left li").on("click", function (e) {
    e.preventDefault();
    let i = $(this).index();
    isScrollingProgrammatically = true;
    $("#navi li").removeClass("on").eq(i).addClass("on");
    scrollToSection(i, function () {
      isScrollingProgrammatically = false;
    });
  });

  // 우측 COMMUNITY 버튼 클릭
  $(".wrap .right .co").on("click", function (e) {
    e.preventDefault();
    let lastIndex = $("section").length - 1;
    isScrollingProgrammatically = true;
    $("#navi li").removeClass("on").eq(lastIndex).addClass("on");
    scrollToSection(lastIndex, function () {
      isScrollingProgrammatically = false;
    });
  });

  // 우측 네비게이션 클릭
  $("#navi li").on("click", function () {
    let i = $(this).index();
    isScrollingProgrammatically = true;
    $("#navi li").removeClass("on").eq(i).addClass("on");

    scrollToSection(i, function () {
      isScrollingProgrammatically = false;
    });

    if (i === 1) {
      $("#con02").addClass("on");
    } else {
      $("#con02").removeClass("on");
    }
  });

  // 스크롤 인디케이터 클릭
  $(".scroll-indicator").on("click", function (e) {
    e.preventDefault();
    isScrollingProgrammatically = true;
    scrollToSection(1, function () {
      isScrollingProgrammatically = false;
    });
  });

  // ========== 가구 메뉴 인터랙션 ==========
  $(".furniture-menu p").on("click", function () {
    let i = $(this).index();

    // 메뉴 활성화
    $(".furniture-menu p").removeClass("on");
    $(this).addClass("on");

    // 상단 이미지 전환
    $(".furniture-visuals .furniture-panel").removeClass("active");
    $(".furniture-visuals .furniture-panel").eq(i).addClass("active");

    // 하단 이미지 + 설명 전환
    $(".bottom .furniture-panel").removeClass("active");
    $(".bottom .furniture-panel").eq(i).addClass("active");
  });

  // ========== Swiper 초기화 ==========
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
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
      el: ".swiper-pagination",
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
        // 슬라이드 변경 시 약간의 스케일 애니메이션
        gsap.from(this.slides[this.activeIndex], {
          scale: 0.9,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    },
  });

  // ========== 자동 배경 이미지 슬라이드 ==========
  let i = 0;
  let $panel = $("#con01 .panel li");
  let total = $panel.length;

  function fade() {
    $panel.fadeOut(1000);
    $panel.eq(i).fadeIn(1000);
  }

  function start() {
    setInterval(function () {
      i = (i + 1) % total;
      fade();
    }, 5000); // 5초 간격으로 변경
  }

  start();

  // ========== 마우스 커서 효과 (선택사항) ==========
  let cursorFollower = $('<div class="cursor-follower"></div>');
  $("body").append(cursorFollower);

  $(document).on("mousemove", function (e) {
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  // 링크 호버 시 커서 확대
  $("a, .category-item, .swiper-slide")
    .on("mouseenter", function () {
      gsap.to(cursorFollower, {
        scale: 2,
        duration: 0.3,
        ease: "power2.out",
      });
    })
    .on("mouseleave", function () {
      gsap.to(cursorFollower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

  // ========== 스크롤 진행 표시 (선택사항) ==========
  let progressBar = $('<div class="scroll-progress"></div>');
  $("body").append(progressBar);

  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let docHeight = $(document).height();
    let winHeight = $(window).height();
    let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    gsap.to(progressBar, {
      width: scrollPercent + "%",
      duration: 0.3,
      ease: "none",
    });
  });

  // ========== 로딩 애니메이션 ==========
  $(window).on("load", function () {
    gsap.to(".visual-content", {
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    });
  });

  // ========== 부드러운 스크롤을 위한 easing 함수 추가 ==========
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  };

  // ========== 카테고리 아이템 3D 틸트 효과 ==========
  $(".category-item").each(function () {
    let $item = $(this);
    let $imageWrap = $item.find(".category-image-wrap");

    $item.on("mousemove", function (e) {
      let rect = this.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      let centerX = rect.width / 2;
      let centerY = rect.height / 2;

      let rotateX = (y - centerY) / 10;
      let rotateY = (centerX - x) / 10;

      gsap.to($imageWrap, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    });

    $item.on("mouseleave", function () {
      gsap.to($imageWrap, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  // ========== View More 버튼 애니메이션 ==========
  $(".view-more-btn").each(function () {
    let $btn = $(this);

    $btn.on("mouseenter", function () {
      gsap.to($btn, {
        x: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    $btn.on("mouseleave", function () {
      gsap.to($btn, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // ========== 추가 CSS 스타일 동적 삽입 ==========
  $("<style>")
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
    `
    )
    .appendTo("head");

  // ========== 반응형 대응 ==========
  function handleResponsive() {
    if ($(window).width() <= 768) {
      // 모바일에서는 커서 효과 제거
      $(".cursor-follower").hide();
    } else {
      $(".cursor-follower").show();
    }
  }

  handleResponsive();
  $(window).on("resize", handleResponsive);

  // ========== 이미지 Lazy Loading 효과 ==========
  $("img")
    .not(".footer-logo img")
    .each(function () {
      let $img = $(this);
      $img.css("opacity", 0);

      $img.on("load", function () {
        gsap.to($img, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });

  // 푸터 로고는 바로 보이게
  $(".footer-logo img").css("opacity", 1);

  // ========== 푸터 애니메이션 ==========
  // 초기 상태 설정
  gsap.set(".social-icon", { opacity: 1, scale: 1 });

  gsap.from(".footer-logo", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".footer-info .info-item", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.15,
    ease: "power3.out",
  });

  gsap.from(".social-icon", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    scale: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)",
  });

  gsap.from(".footer-bottom", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: "power3.out",
  });

  console.log("🎨 RAMMXE Furniture - Enhanced with GSAP animations");
});
