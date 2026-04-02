// js/app.js

$(document).ready(function () {
    
    // --- 1. LOADER E INICIALIZACIÓN ---
    let svgContainerLoader = document.querySelector('.loader');
    let animLoader = bodymovin.loadAnimation({
        wrapper: svgContainerLoader,
        animType: 'svg',
        loop: true,
        path: _pathProducto + "img/corazon.json"
    });

    $(window).on("load", function() {
        var preloader = $('.loader');
        var preloaderArea = $('.preloader-area');
        preloader.fadeOut(500);
        preloaderArea.delay(100).fadeOut(500);
        animLoader.destroy();
        
        setTimeout(function() {
            if(typeof AOS !== 'undefined') AOS.init();
        }, 100);
    });

    // --- 2. ANIMACIONES LOTTIE ---
    function initLottie(selector, jsonPath, autoPlay = true) {
        let container = document.querySelector(selector);
        if(!container) return null;
        let anim = bodymovin.loadAnimation({
            wrapper: container,
            animType: 'svg',
            loop: true,
            autoplay: autoPlay,
            path: _pathProducto + jsonPath
        });
        return anim;
    }

    let animMusicAnimIcon = initLottie('.music-anim-icon', 'img/music-player-icon.json', false);
    initLottie('.anim-col-ceremonia', 'img/img_ceremonia.json');
    initLottie('.anim-galeria', 'img/json_camara.json');
    initLottie('.anim-musica', 'img/img_musica.json');
    initLottie('.anim-vestuario', 'img/vestuario.json');
    initLottie('.anim-tips', 'img/tips.json');
    initLottie('.anim-col-fiesta', 'img/img_fiesta.json');
    initLottie('.anim-regalos', 'img/img_regalo.json');
    initLottie('.anim-instagram', 'img/img_instagram.json');

    // --- 3. REPRODUCTOR DE YOUTUBE ---
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        window.player = new YT.Player('player-musica-fondo', {
            height: '10', width: '10',
            playerVars: { playlist: 'KaM1bCuG4xo', loop: 1, start: 0, autoplay: 1 },
            events: {
                'onReady': function(event) {
                    event.target.setVolume(80);
                    event.target.playVideo();
                    setTimeout(function() {
                        $('#play-pause-music').attr('data-estado-music', 'play');
                        if (animMusicAnimIcon) animMusicAnimIcon.play();
                    }, 1000);
                }
            }
        });
    };

    $('body').on('click', '#play-pause-music', function(e) {
        e.preventDefault();
        var estadoMusic = $(this).attr('data-estado-music');
        if (estadoMusic == 'pause') {
            $(this).attr('data-estado-music', 'play');
            animMusicAnimIcon.play();
            if(window.player) window.player.playVideo();
        } else {
            $(this).attr('data-estado-music', 'pause');
            if(window.player) window.player.pauseVideo();
            animMusicAnimIcon.stop();
        }
    });

    // --- 4. CARRUSEL ---
    if($('.carrusel').length) {
        $('.carrusel').slick({
            lazyLoad: 'ondemand', autoplay: true, autoplaySpeed: 2000,
            centerMode: true, dots: true, centerPadding: '20px', slidesToShow: 3,
            arrows: false,
            responsive: [
                { breakpoint: 768, settings: { centerPadding: '40px', slidesToShow: 3 } },
                { breakpoint: 480, settings: { centerPadding: '40px', slidesToShow: 1 } }
            ]
        });
    }

    // --- 5. CUENTA REGRESIVA ---
    if(fechaCuentaRegresiva) {
        var countDownDate = new Date(fechaCuentaRegresiva).getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $("#dias .number").text(days);
            $("#horas .number").text(hours);
            $("#minutos .number").text(minutes);
            $("#segundos .number").text(seconds);

            if (distance < 0) {
                clearInterval(x);
                if(document.getElementById("reloj")) document.getElementById("reloj").innerHTML = '<p class="fin-cuenta">¡Llegó el gran día!</p>';
                $('.falta').text('');
            }
        }, 1000);
    }

    // --- 6. PARALLAX PORTADA ---
    var imageParallax = support_format_webp() 
        ? 'https://www.fixdate.io/recursos-variantes-modelos/138/moon-plate/variantes/negro/portadas/portada.webp' 
        : 'https://www.fixdate.io/recursos-variantes-modelos/138/moon-plate/variantes/negro/portadas/portada.jpg';
    
    $('.portada').parallax({
        imageSrc: imageParallax,
        zIndex: 0,
        mirrorContainer: '.portada'
    });

    // --- 7. SVG INJECT ---
    if(typeof SVGInject !== 'undefined') {
        SVGInject(document.querySelectorAll("img.injectable"), { makeIdsUnique: false, useCache: false });
    }

    // --- 8. COLORES INTERCALADOS ---
    const COLOR_1 = 'var(--color-fondo-secciones-1)';
    const COLOR_2 = 'var(--color-fondo-secciones-2)';
    const secciones = document.querySelectorAll('.seccion-principal');
    Array.from(secciones).forEach((seccion, index) => {
        seccion.style.backgroundColor = (index % 2 === 0) ? COLOR_1 : COLOR_2;
    });

});

// --- SETTINGS ADDEVENT ---
window.addeventasync = function() {
    addeventatc.settings({
        css: false,
        appleical: { show: true, text: "Apple Calendar" },
        google: { show: true, text: "Google <em>(online)</em>" },
        outlook: { show: true, text: "Outlook" },
        yahoo: { show: true, text: "Yahoo <em>(online)</em>" }
    });
};