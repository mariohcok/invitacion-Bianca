// js/app.js

// --- 1. CUENTA REGRESIVA ---
// Cambia aquí la fecha exacta de tu fiesta
const fechaFiesta = new Date("May 15, 2026 20:00:00").getTime();

const intervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaFiesta - ahora;

    // Cálculos matemáticos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Inyectamos los resultados en el HTML agregando un "0" si es menor a 10
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

    // Si la fecha ya pasó
    if (distancia < 0) {
        clearInterval(intervalo);
        document.getElementById("countdown").innerHTML = "<h2>¡A disfrutar de la fiesta!</h2>";
    }
}, 1000);


// --- 2. REPRODUCTOR DE MÚSICA (YouTube Iframe API) ---
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player-musica-fondo', {
        height: '0',
        width: '0',
        playerVars: {
            'autoplay': 1, // Intentamos que inicie sola
            'controls': 0,
            'playlist': 'KaM1bCuG4xo', // ID del video musical
            'loop': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(80);
    // Intentamos reproducir, si el navegador lo bloquea, el usuario usará el botón manual
    event.target.playVideo(); 
}

// Control del botón de música visible en pantalla
const musicBtn = document.getElementById('music-btn');

musicBtn.addEventListener('click', () => {
    if (player && typeof player.getPlayerState === 'function') {
        let state = player.getPlayerState();
        if (state === 1 || state === 3) { // Si está reproduciendo o cargando
            player.pauseVideo();
            musicBtn.innerText = "🔇 Reproducir Música";
        } else {
            player.playVideo();
            musicBtn.innerText = "🎵 Pausar Música";
        }
    } else {
        // Fallback por si la API tarda un segundo extra en cargar
        player.playVideo();
        musicBtn.innerText = "🎵 Pausar Música";
    }
});
