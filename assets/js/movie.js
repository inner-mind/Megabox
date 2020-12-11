(function($){

    /* 트레일러 영상 플레이어를 활성화 */
    /* YouTube iframe API: https://developers.google.com/youtube/player_parameters */
    /* iframe_api.js 파일이 존재해야 합니다 */

    (function handleTrailer() {
        // 셀렉터 캐시
        var $selector = {
            body: $( "body" ),
            overlay: $( "#blackout" ),
            modal: $( "#trailerModal" ),
            showButton: $( "#showTrailer" ),
            hideButton: $( "#hideTrailer" ),
        };
        
        // 플레이어
        var player = {
            obj: null, // 플레이어 오브젝트
            query : {
                theme: "dark",
                color: "white",
                controls: 1, 
                autoplay: 1,
                enablejsapi: 1,
                modestbranding: 0, // YouTube 로고 감춤
                rel: 0,  // 관련 동영상 표시
                showinfo: 0, // 제목, 업로더 감춤
                iv_load_policy: 3 // 특수효과 감춤
            },
            visible: false
        };

        // 보이기, 숨기기 버튼 활성화
        $selector.showButton.on( "click", showPlayer );
        $selector.hideButton.on( "click", hidePlayer );

        //YouTube API를 이용하여 iframe 생성
        function setPlayer( id ) {
            player.obj = new YT.Player( "trailer_box", {
                width: 480,
                height: 282,
                videoId: id,
                playerVars: player.query
            });

            // 처음 플레이어 크기 설정
            resizePlayer();

            // 리사이즈나 화면 회전시 플레이어 크기 재설정
            $( window ).on( "resize orientationchange", function() {
                resizePlayer();
            });
        }

        function resizePlayer(){
            var viewport = {}, frame = {}, modal = {};

            viewport.width = $(window).width();
            viewport.height = $(window).height();

            frame.width = viewport.width;
            frame.height = frame.width / 1.6; // 화면 비율을 16:10으로 설정

            // 영상이 중앙에 오도록
            modal.top = ((viewport.height - frame.height) / 2) + "px";
            modal.left = "0px";

            // .modal 에게 위의 left값과 top 값의 포지션을 넘겨 줍니다
            $selector.modal.css(modal);

            // 화면 크기에 맞춰서 크기 재설정
            player.obj.setSize(frame.width, frame.height);
        }

        // iframe 보이기
        function showPlayer(){
            if(!player.obj){
                // player.obj가 null 값이 아니라면
                // 처음 클릭시 iframe을 생성
                setPlayer($selector.showButton.data("youtube")); //youtube 영상 id 넘기기
            }
            $selector.body.addClass("modal_on");
            $selector.overlay.show();
            player.visible = true;
        };

        // iframe 숨기기
        function hidePlayer(){
            player.obj.stopVideo(); // 영상이 백그라운드에서 계속 재생되는 것을 방지
            $selector.body.removeClass("modal_on");
            $selector.overlay.hide();
            player.visible = false;
        };
    })();

})(jQuery);     