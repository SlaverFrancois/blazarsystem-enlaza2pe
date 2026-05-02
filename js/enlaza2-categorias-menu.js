fetch("json/categorias-menu.json")
  .then(response => response.json())
  .then(categorias => {
    const menu = document.getElementById("menu-categorias");

    categorias.forEach(grupo => {
      const li = document.createElement("li");

      const titulo = document.createElement("h6");
      titulo.textContent = grupo.categoria;

      const subUl = document.createElement("ul");

      grupo.subcategory.forEach(item => {
        const subLi = document.createElement("li");

        const link = document.createElement("a");
        link.textContent = item;
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
document.addEventListener("click", function (e) {
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
    document.querySelector(".js-menu-toggle")?.click();
  }
});