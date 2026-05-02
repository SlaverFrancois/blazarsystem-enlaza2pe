const palabras = [
  "Electricista",
  "Gasfitero",
  "Pintor",
  "Albañil",
  "Técnico",
  "Drywallero"
];

let i = 0;      // palabra
let j = 0;      // letra
let borrando = false;

const typing = document.getElementById("typing");

function escribir() {
  const palabra = palabras[i];

  if (!borrando) {
    typing.textContent = palabra.substring(0, j++);
    if (j > palabra.length) {
      borrando = true;
      setTimeout(escribir, 1200);
      return;
    }
  } else {
    typing.textContent = palabra.substring(0, j--);
    if (j === 0) {
      borrando = false;
      i = (i + 1) % palabras.length;
    }
  }

  setTimeout(escribir, borrando ? 50 : 100);
}

escribir();