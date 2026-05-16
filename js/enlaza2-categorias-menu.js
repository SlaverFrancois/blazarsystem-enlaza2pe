fetch("json/categorias-menu.json")
  .then(response => response.json())
  .then(categorias => {
    const menu = document.getElementById("menu-categorias");

    categorias.forEach(grupo => {
      const li = document.createElement("li");

      /*const titulo = document.createElement("h6");
      titulo.textContent = grupo.categoria;*/

      const titulo = document.createElement("h6");
      const config = configCategorias[grupo.categoria] || {};
      titulo.textContent = grupo.categoria;
      //color dinámico
      if (config.color) {
        titulo.style.borderLeftColor = config.color;
      }

      const subUl = document.createElement("ul");

      grupo.subcategory.forEach(item => {
        const subLi = document.createElement("li");

        const link = document.createElement("a");
        //link.textContent = item;
        const config = configCategorias[grupo.categoria] || {};

        const icono = item //armar nombre de archivo icon 
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // quitar tildes
          .replaceAll("ñ", "n")
          .replaceAll(" ", "-")
          .replaceAll("/", "");
        //link.textContent = emoji + " " + item;
        //FALLBACK AUTOMÁTICO:
        link.innerHTML = `
        <div class="blz-item-wrap">
          <div class="blz-item-icon">
            <img src="icons/${icono}.png" alt="${item}" onerror="this.src='icons/default.png'">
          </div>
          <span>${item}</span>
        </div>
      `;

        if (config.soft) {
          link.style.background = config.soft;
        }

        if (config.color) {
          link.style.borderLeft = `4px solid ${config.color}`;
        }

        link.href = "javascript:void(0)";
        link.setAttribute("data-subcategoria", item);

        subLi.appendChild(link);
        subUl.appendChild(subLi);
      });

      li.appendChild(titulo);
      li.appendChild(subUl);
      menu.appendChild(li);
    });
  })
  .catch(error => console.error("Error cargando JSON:", error));

/*LISTENER GLOBAL - FUNCION DE SELECCIONAR CATEGORIA Y MOSTRAR RESULTADOS*/
/*document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.dataset.subcategoria) {
    const item = target.dataset.subcategoria;

    // 🔥 mostrar título claro
    const titulo = document.getElementById("titulo-resultados");
    titulo.textContent = "Resultados para: " + item;
    titulo.style.display = "block";

    //document.getElementById("search").value = item;

    filtrarAnuncios(item, "subcategoria");

    // ✅ dejar input limpio y listo para buscar otra cosa
    const input = document.getElementById("search");
    input.value = "";
    input.blur(); // opcional: quita foco (mejor UX en mobile)


    // cerrar menú mobile automáticamente
    //document.querySelector(".js-menu-toggle")?.click(); //abrir menú después de filtrar
  }
});*/

document.addEventListener("click", function (e) {

  const target = e.target.closest("[data-subcategoria]");

  if (target) {

    const item = target.dataset.subcategoria;

    // 🔥 mostrar título claro
    const titulo = document.getElementById("titulo-resultados");
    titulo.textContent = "Resultados para: " + item;
    titulo.style.display = "block";

    filtrarAnuncios(item, "subcategoria");

    // limpiar buscador
    const input = document.getElementById("search");
    input.value = "";
    input.blur();

    // 🔥 cerrar menú
    cerrarCategorias();

  }

});

/*carrusel horizontal de categorias*/

fetch("json/categorias-menu.json")
  .then(res => res.json())
  .then(categorias => {

    const carrusel = document.getElementById("carrusel-categorias");

    categorias.forEach(grupo => {
      grupo.subcategory.forEach(item => {

        const chip = document.createElement("div");
        chip.className = "blz-chip";
        chip.textContent = item;
        chip.setAttribute("data-subcategoria", item);

        carrusel.appendChild(chip);

      });
    });

  });

/* 🔥 SCROLL CON BOTÓN > */
document.getElementById("btnScroll").addEventListener("click", () => {
  const carrusel = document.getElementById("carrusel-categorias");
  carrusel.scrollBy({ left: 150, behavior: "smooth" });
});


/*Colores de categorias*/

const configCategorias = {

  "Servicios del Hogar y construcción": {
    color: "#0d6efd",
    soft: "#eaf3ff"
  },

  "Comercio y Alimentos": {
    color: "#fd7e14",
    soft: "#fff1e8"
  },

  "Belleza y Bienestar": {
    color: "#e83e8c",
    soft: "#fff0f6"
  },

  "Técnicos y Reparaciones": {
    color: "#6f42c1",
    soft: "#f3edff"
  },

  "Inmobiliaria y Clasificados": {
    color: "#20c997",
    soft: "#e8fbf4"
  },

  "Retail y Productos": {
    color: "#ffc107",
    soft: "#fff8e1"
  },

  "Salud y Cuidado": {
    color: "#dc3545",
    soft: "#fdecec"
  },

  "Profesionales": {
    color: "#343a40",
    soft: "#f1f3f5"
  },

  "Educación": {
    color: "#17a2b8",
    soft: "#e8fafd"
  },

  "Eventos y Entretenimiento": {
    color: "#6610f2",
    soft: "#f1eaff"
  },

  "Mascotas": {
    color: "#198754",
    soft: "#e9f8f0"
  }

};
 