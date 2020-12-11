(function($){
	//배너 이미지 슬라이드
    var mySwiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      autoplay: {
        delay: 5000,
      },
    });

    //영화차트 포스터 슬라이드
    var mySwiper = new Swiper('.swiper-container2', {
        slidesPerView: 4,
        spaceBetween: 24,
        // mousewheel: {
        //     invert: true,
        // },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        // autoplay: {
        //     delay: 6000,
        // },
        breakpoints: {
        600: {
            slidesPerView: 1.4,
            spaceBetween: 24
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24
        },
        960: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
    });

    //영화차트 탭 메뉴
    var movBtn = $(".movie_title > ul > li");
    var movCont = $(".movie_chart > div");

    movCont.hide().eq(0).show(); /* 모든 movCont를 숨기고 첫번째것만 표시 */

    movBtn.click(function(e){
        e.preventDefault();
        var target = $(this);
        var index = target.index();
        // alert(index);
        movBtn.removeClass("active"); /* 기존에 있던 active 클래스를 모두 없애고 */
        target.addClass("active"); /* 내가 방금 클릭한 target에다가 active 클래스를 씌우기 */
        movCont.css("display", "none"); /* 기존에 보이던 영화 리스트를 모두 숨기고 */
        movCont.eq(index).css("display", "block"); /* 방금 클릭한 target에 해당하는 영화 리스트를 보이기 */
    });

    //공지사항 탭 메뉴
    var tabMenu = $(".notice");
    //컨텐츠 내용 숨기기
    tabMenu.find("ul > li > ul").hide();
    tabMenu.find("li.active > ul").show();
    function tabList(e){
        e.preventDefault();
        var target = $(this);
        target.next().show().parent("li").addClass("active").siblings("li").removeClass("active").find("ul").hide();
        //버튼을 클릭하면 형제ul을 보여주고
        //부모의 li 태그에 active 클래스 추가하고
        //형제의 li 태그에 active 클래스 제거하고
        //제거한 자식의 ul태그를 숨김
    }
    tabMenu.find("ul > li > a").click(tabList).focus(tabList);
}) (jQuery);