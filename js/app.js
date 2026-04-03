// js/app.js

// --- 1. CUENTA REGRESIVA ---
// Fecha exacta de la fiesta de Bianca
const fechaFiesta = new Date("May 02, 2026 20:00:00").getTime();

const intervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaFiesta - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Inyectamos los resultados
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

    // Si la fecha ya pasó
    if (distancia < 0) {
        clearInterval(intervalo);
        document.getElementById("countdown").innerHTML = "<h2 class='metallic-text'>¡Llegó el gran día!</h2>";
    }
}, 1000);


// --- 2. REPRODUCTOR DE MÚSICA FLOTANTE ---
const audioFondo = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-btn-float');

audioFondo.volume = 0.5;

// Intento de autoplay con el primer clic en la pantalla
window.addEventListener('click', () => {
    if(audioFondo.paused) {
        audioFondo.play().catch(() => console.log("Autoplay bloqueado"));
    }
}, { once: true });

// Botón manual circular
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audioFondo.paused) {
        audioFondo.play();
        musicBtn.innerText = "⏸️"; // Cambia el icono a pausa
    } else {
        audioFondo.pause();
        musicBtn.innerText = "🎵"; // Cambia el icono a play
    }
});


// --- 3. INICIALIZAR CARRUSEL DE FOTOS (SWIPER) ---
if (typeof Swiper !== 'undefined') {
    var swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        loop: true, 
        cardsEffect: {
            perSlideOffset: 8, 
            perSlideRotate: 4, 
            slideShadows: false, 
        },
    });
}
