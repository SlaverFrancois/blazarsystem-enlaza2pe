
document.getElementById("formAnuncio").addEventListener("submit", function(e) {
  e.preventDefault();

  // aquí puedes integrar tu fetch a Google Sheets si quieres

  // ocultar paso 1
  document.getElementById("step1").style.display = "none";

  // mostrar paso 2
  document.getElementById("step2").style.display = "block";

  // scroll hacia arriba del formulario
  document.getElementById("step2").scrollIntoView({ behavior: "smooth" });
});