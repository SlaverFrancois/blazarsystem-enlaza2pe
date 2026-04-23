let urlActual = "";

function abrirVista(url) {
  urlActual = url;

  const visor = document.getElementById("visor-full");
  const iframe = document.getElementById("visor-iframe");

  iframe.src = url;
  visor.style.display = "block";
}

function cerrarVista() {
  const visor = document.getElementById("visor-full");
  const iframe = document.getElementById("visor-iframe");

  visor.style.display = "none";
  iframe.src = "";
}

function ampliarVista() {
  window.location.href = urlActual;
}