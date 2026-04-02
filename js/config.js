// js/config.js

// Variables de entorno para rutas e IDs
var _pathApp = "https://www.fixdate.io/";
var _pathProducto = "https://www.fixdate.io/modelo-invitacion/138/";
var tokenProducto = "";

// Idioma por defecto
var langJs = "es";
var langJsVariante = "es-AR";
var langDefault = 'es-AR';

// Configuración del evento
var fechaCuentaRegresiva = "05/12/2026 18:10:43";

// Mapas
var latitudFiesta = -34.6201481;
var longitudFiesta = -58.4046887;
var linkMapsFiesta = "";

// Detectar dispositivo
var device = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'mobile' : 'desktop';

// Validaciones y Soportes globales
function is_url(str) {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return regexp.test(str);
}

function support_format_webp() {
  var elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  } else {
    return false;
  }
}