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
      const box = document.getElementById("suggestions");

      // 🔥 SI ESTÁ VACÍO → OCULTAR (incluye la X del móvil)
      if (valor.trim() === "") {
        box.style.display = "none";
        box.innerHTML = "";
        document.getElementById("suggestions").innerHTML = "";
        return;
      }

      const sugerencias = lista.filter(p =>
        p.toLowerCase().includes(valor)
      );

      // 🔥 si NO hay resultados
      if (sugerencias.length === 0) {
        mostrarNoExiste(valor);
      } else {
        mostrarSugerencias(sugerencias);
      }
    });
  });

function mostrarNoExiste(texto) {
  const box = document.getElementById("suggestions");

  box.innerHTML = `
    <div class="blz-no-result">

      <div class="blz-no-title">
        ❌ No encontramos "<strong>${texto}</strong>"
      </div>

      <div class="blz-no-cta">
        👉 Sé el primero en ofrecer este servicio
      </div>

      <div class="blz-no-btn">
        Publicar mi servicio
      </div>

    </div>
  `;

  box.onclick = () => {
    window.location.href = "formulario.html";
  };
}

function mostrarSugerencias(lista) {
  const box = document.getElementById("suggestions");
  box.innerHTML = "";

  if (lista.length === 0) {
    box.style.display = "none";
    return;
  }

  box.style.display = "block"; // 🔥 IMPORTANTE

  lista.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;

    div.onclick = () => {
      document.getElementById("search").value = item;
      filtrarAnuncios(item);
      box.style.display = "none"; // 🔥 cerrar al elegir
    };

    box.appendChild(div);
  });
}

function filtrarAnuncios(texto, modo = "general") {

  // ocultar título al buscar
  const titulo = document.getElementById("titulo-resultados");
  titulo.style.display = "block";

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
  for (let i = 1; i <= 2; i++) {
    document.getElementById("tipo" + i).innerHTML = "";
  }
  //usar plantilla para mostrar anuncio
  const contenedor = document.getElementById("tipo2");

  contenedor.innerHTML = `
    <div class="blz-cta-box text-center mt-4 mb-4">
      <h5 class="blz-cta-title">
        Sé el primero en ofrecer este servicio
      </h5>
      <p class="blz-cta-text">
         y consigue clientes en tu zona.
      </p>
      <a href="formulario.html" class="blz-cta-btn">
        Publicar mi servicio
      </a>
    </div>
  `;
  actualizarCTA(0);
}


function mostrarInicio() {
  const titulo = document.getElementById("titulo-resultados");
  titulo.textContent = "📢Anuncios destacados";
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
  const contenedor = document.getElementById("tipo2");

  if (contenedor) {
    contenedor.innerHTML = "";
  }
}

function hayResultados() {
  const contenedores = ["tipo1", "tipo2"];

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

/*ocultar al hacer click*/

document.addEventListener("click", function (e) {
  const wrapper = document.querySelector(".blz-search-wrapper");
  const box = document.getElementById("suggestions");

  if (!wrapper.contains(e.target)) {
    box.style.display = "none";
  }
});

input.addEventListener("focus", () => {
  if (input.value.trim() !== "") {
    document.getElementById("suggestions").style.display = "block";
  }
});

/*mini buscador*/
/*
function irABuscador() {
  const input = document.getElementById("search");

  if (!input) return;

  // scroll suave hacia el buscador
  input.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  // esperar a que llegue y activar teclado
  setTimeout(() => {
    input.focus();
  }, 400);
}*/

function irABuscador() {
  const input = document.getElementById("search");
  if (!input) return;

  // 🔥 1. activar teclado inmediatamente
  input.focus();

  // 🔥 2. opcional: seleccionar texto (mejora UX)
  input.select();

  // 🔥 3. luego hacer scroll suave
  input.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}