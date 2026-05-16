let anuncios = [];

fetch("json/anuncios.json")
  .then(res => res.json())
  .then(data => {
    anuncios = data;

    mostrarInicio();

    const palabras = new Set();// extraer palabras clave

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

      if (valor.trim() === "") {// SI ESTÁ VACÍO → OCULTAR (incluye la X del móvil)
        box.style.display = "none";
        box.innerHTML = "";
        document.getElementById("suggestions").innerHTML = "";
        return;
      }

      const sugerencias = lista.filter(p =>
        p.toLowerCase().includes(valor)
      );

      if (sugerencias.length === 0) {// si NO hay resultados
        mostrarNoExiste(valor);
      } else {
        mostrarSugerencias(sugerencias);
      }
    });
  });

function mostrarSugerencias(lista) {
  const box = document.getElementById("suggestions");
  box.innerHTML = "";
  if (lista.length === 0) {
    box.style.display = "none";
    return;
  }
  box.style.display = "block"; //   IMPORTANTE
  const max = lista.slice(0, 15);// LIMITAR A 20 SOLO VISUALMENTE 
  max.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<span class="blz-lupa">🔍︎</span> ${item}`;
    div.dataset.valor = item; //guardar valor limpio
    div.onclick = () => {
      document.getElementById("search").value = div.dataset.valor;
      filtrarAnuncios(div.dataset.valor);
      box.style.display = "none"; // cerrar al elegir
    };
    box.appendChild(div);
  });

  if (lista.length > 15) {// Indicar que hay más resultados
    const more = document.createElement("div");
    more.textContent = `+${lista.length - 15} más resultados...`;
    more.style.fontSize = "13px";
    more.style.color = "#666";
    more.style.textAlign = "center";
    more.style.padding = "8px";
    box.appendChild(more);
  }
}

function filtrarAnuncios(texto, modo = "general") {
  const titulo = document.getElementById("titulo-resultados");// ocultar título al buscar
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

  if (resultados.length === 0) {
    limpiarAviso();
    renderAnuncios([]); // opcional
    actualizarMensajeCTA(false);
    mostrarNoResults();
  } else {
    limpiarAviso();
    renderAnuncios(resultados);
    actualizarMensajeCTA(true);
    ocultarNoResults();
  }
}

function mostrarAvisoSinResultados(categoria) {/*Aviso y redireccion a formulario*/

  for (let i = 1; i <= 2; i++) {// limpiar otros diseños
    document.getElementById("tipo" + i).innerHTML = "";
  }
  const contenedor = document.getElementById("tipo2");//usar plantilla para mostrar anuncio

  contenedor.innerHTML = ` ... `; //reutilizacion
  actualizarCTA(0);
}

/*Anuncios destacados y anuncios con featured de valor 1*/
function mostrarInicio() {
  const titulo = document.getElementById("titulo-resultados");
  titulo.textContent = "📢Anuncios destacados";
  titulo.style.display = "block"; // mostrar

  let destacados = anuncios.filter(a => a.featured);//  1. destacados primero
  destacados = destacados.slice(0, 6); //  limitar (no saturar)
  
  if (destacados.length < 6) { //  si no hay suficientes, completar con otros
    const otros = anuncios
      .filter(a => !a.featured)
      .slice(0, 6 - destacados.length);
    destacados = destacados.concat(otros);
  }
  renderAnuncios(destacados);
  ocultarNoResults();
  actualizarCTA(destacados.length);
  actualizarMensajeCTA(destacados.length > 0);
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
    const anuncios = el.querySelectorAll(".blog-entry, .col-md-6, .col-md-4");//SOLO contar anuncios reales (no avisos)
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

document.addEventListener("click", function (e) {/*ocultar al hacer click*/
  const wrapper = document.querySelector(".blz-search-wrapper");
  const box = document.getElementById("suggestions");

  if (!wrapper.contains(e.target)) {
    box.style.display = "none";
  }
});

document.getElementById("search")?.addEventListener("focus", () => {
  const input = document.getElementById("search");

  if (input.value.trim() !== "") {
    document.getElementById("suggestions").style.display = "block";
  }
});

function irABuscador() {/*mini buscador*/
  const input = document.getElementById("search");
  if (!input) return;
  input.focus();//   1. activar teclado inmediatamente
  input.select();//   2. opcional: seleccionar texto (UX)
  input.scrollIntoView({//   3. luego hacer scroll suave
    behavior: "smooth",
    block: "center"
  });
}

let menuAbierto = false;

function abrirCategorias() {
  if (menuAbierto) return; //evita duplicados

  document.body.classList.add("offcanvas-menu");
  menuAbierto = true;

  history.pushState({ menu: true }, "");// agregar estado SOLO UNA VEZ
}

/* cerrar menú */
function cerrarCategorias() {
  if (!menuAbierto) return;
  document.body.classList.remove("offcanvas-menu");
  menuAbierto = false;
  if (history.state && history.state.menu) {//regresar en el historial SOLO si corresponde
    history.back();
  }
}

/* botón ATRÁS del navegador */
window.addEventListener("popstate", function (event) {

  if (menuAbierto) {
    document.body.classList.remove("offcanvas-menu");
    menuAbierto = false;
  }
});

/* OCULTAR MINI BUSCADOR CUANDO CTA ES VISIBLE */
document.addEventListener("DOMContentLoaded", () => {
  const cta = document.getElementById("cta-anuncio");
  const mini = document.getElementById("miniBuscador");
  if (!cta || !mini) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          mini.classList.add("oculto");
        } else {
          mini.classList.remove("oculto");
        }

      });
    },
    {
      threshold: 0.4
    }
  );
  observer.observe(cta);
});

/*Reutilizar div de CTA*/
function actualizarMensajeCTA(hayResultados) {
  const texto = document.getElementById("cta-texto");
  const cta = document.getElementById("cta-anuncio");

  if (!texto || !cta) return;

  if (hayResultados) {
    texto.innerHTML = `
      ¿Quieres anunciar un servicio?
      <a href="formulario.html" class="blz-cta-inline-link">
        👉Siií, quiero anunciar aquí!👈
      </a>
    `;
  } else {
    texto.innerHTML = `
      Sé el primero en ofrecer este servicio ¡gana clientes!
      <a href="formulario.html" class="blz-cta-inline-link">
        👉Siií, quiero anunciar aquí!👈
      </a>
    `;
  }
  cta.style.display = "block"; // siempre visible cuando aplica
}

/*En suggestions cuando no existe lo que escriben, sale este mensaje*/
function mostrarNoExiste(texto) {
  const box = document.getElementById("suggestions");
  box.innerHTML = `
    <div class="blz-no-result">
      <div class="blz-no-title">
        ❌ No encontramos "<strong>${texto}</strong>"
      </div>
      <div class="blz-no-cta">
        👉 Sé el primero en ofrecer este servicio
        <div class="blz-no-btn" id="btnNoExiste"> Completar aquí </div>        
      </div>
    </div>
  `;

  /* CLICK SOLO EN BOTON */
  document
    .getElementById("btnNoExiste")
    .addEventListener("click", () => {
      const input =
        document.getElementById("miniServicio");
      if (!input) return;
      /* OCULTAR SUGGESTIONS */
      box.style.display = "none";
      /* LIMPIAR BUSCADOR */
      document.getElementById("search").value = "";
      /* FOCUS */
      input.focus();
      input.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

     /* SACUDIDA */
    input.classList.add("blz-shake");
    setTimeout(() => {
      input.classList.remove("blz-shake");
    }, 2500);
});

  /* MOSTRAR BOX */
  box.style.display = "block";
}


/*NO RESULT*/

function mostrarNoResults() {
	const box =
		document.getElementById("blz-no-results");
	if (!box) return;
	box.style.display = "block";
}

function ocultarNoResults() {
	const box =
		document.getElementById("blz-no-results");
	if (!box) return;
	box.style.display = "none";
}

function irFormularioServicio() {
	const input =
		document.getElementById("miniServicio");
	if (!input) return;
	input.focus();
	input.scrollIntoView({
		behavior: "smooth",
		block: "center"
	});
	/* SACUDIDA */
  input.classList.add("blz-shake");
	setTimeout(() => {
		input.classList.remove("blz-shake");
	}, 2500);
}