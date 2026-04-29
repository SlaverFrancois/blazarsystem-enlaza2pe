let anuncios = [];

fetch("json/anuncios.json")
  .then(res => res.json())
  .then(data => {
    anuncios = data;

    /*inicio -- cargar al inicio*/  
    mostrarInicio();
    /*fin -- cargar al inicio*/

    // extraer palabras clave
    const palabras = new Set();

    data.forEach(a => {
      palabras.add(a.rubro);
      palabras.add(a.subcategory);
      palabras.add(a.especiality);
      a.skills.forEach(s => palabras.add(s));
    });

    const lista = Array.from(palabras);

    const input = document.getElementById("search");

    input.addEventListener("input", () => {
      const valor = input.value.toLowerCase();

      const sugerencias = lista.filter(p =>
        p.toLowerCase().includes(valor)
      );

      mostrarSugerencias(sugerencias);
    });
  });

function mostrarSugerencias(lista) {
  const box = document.getElementById("suggestions");
  box.innerHTML = "";

  lista.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;

    div.onclick = () => {
      document.getElementById("search").value = item;
      filtrarAnuncios(item);
      box.innerHTML = "";
    };

    box.appendChild(div);
  });
}
 
function filtrarAnuncios(texto, modo = "general") {

  // ocultar título al buscar
  const titulo = document.getElementById("titulo-resultados");
  titulo.style.display = "none";

  const t = texto.toLowerCase();

  const resultados = anuncios.filter(a => {
    if (modo === "subcategoria") {
      return a.subcategory.toLowerCase() === t;
    }

    return (
      a.rubro.toLowerCase().includes(t) ||
      a.subcategory.toLowerCase().includes(t) ||
      a.especiality.toLowerCase().includes(t) ||
      a.skills.some(s => s.toLowerCase().includes(t))
    );
  });

  if (resultados.length === 0 && modo === "subcategoria") {
    mostrarAvisoSinResultados(texto);
  } else {
    limpiarAviso();
    renderAnuncios(resultados);
  }
}


/*Aviso y redireccion a formulario*/
function mostrarAvisoSinResultados(categoria) { 

    // limpiar otros diseños
  for (let i = 1; i <= 5; i++) {
    document.getElementById("tipo" + i).innerHTML = "";
  }
  //usar plantilla para mostrar anuncio
  const contenedor = document.getElementById("tipo2");

  contenedor.innerHTML = `
  <div class="alert alert-warning text-center mt-4 aviso-sin-resultados">
      <h5>😅 Aún no hay anuncios en "${categoria}"</h5>
      <p>
        Actualmente estamos buscando anunciantes de ${categoria}.<br>
        Si conoces uno o eres tú, publica GRATIS aquí 👇
      </p>
      <a href="formulario.html" class="btn btn-primary">
        Publicar anuncio gratis
      </a>
    </div>
  `;
  actualizarCTA(0);
}


function mostrarInicio() {
  const titulo = document.getElementById("titulo-resultados");
  titulo.textContent = "Anuncios destacados";
  titulo.style.display = "block"; // mostrar

  //  1. destacados primero
  let destacados = anuncios.filter(a => a.featured);

  //  limitar (no saturar)
  destacados = destacados.slice(0, 6);

  //  si no hay suficientes, completar con otros
  if (destacados.length < 6) {
    const otros = anuncios
      .filter(a => !a.featured)
      .slice(0, 6 - destacados.length);

    destacados = destacados.concat(otros);
  }

  renderAnuncios(destacados);
  actualizarCTA(destacados.length);
} 

function limpiarAviso() {
  // opcional si manejas contenedor separado
}

function hayResultados() {
  const contenedores = ["tipo1", "tipo2", "tipo3", "tipo4", "tipo5"];

  return contenedores.some(id => {
    const el = document.getElementById(id);
    if (!el) return false;

    // 🔥 SOLO contar anuncios reales (no avisos)
    const anuncios = el.querySelectorAll(".blog-entry, .col-md-6, .col-md-4");

    return anuncios.length > 0;
  });
}

function actualizarCTA(cantidadResultados) {
  const cta = document.getElementById("cta-publicar");
  if (!cta) return;

  if (cantidadResultados > 0) {
    cta.style.display = "block";
  } else {
    cta.style.display = "none";
  }
}