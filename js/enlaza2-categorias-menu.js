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
        //subLi.textContent = item;

        /*inicio nuevo*/
        subLi.textContent = item;
        subLi.setAttribute("data-subcategoria", item);
        /*fin nuevo*/

        subLi.style.cursor = "pointer";

        /*
        subLi.onclick = () => {
          console.log("Seleccionaste:", item);
        };*/

        subUl.appendChild(subLi);
      });

      li.appendChild(titulo);
      li.appendChild(subUl);
      menu.appendChild(li);
    });
  })
  .catch(error => console.error("Error cargando JSON:", error));


  /*LISTENER GLOBAL - FUNCION DE SELECCIONAR CATEGORIA Y MOSTRAR RESULTADOS*/
  document.addEventListener("click", function(e) {
  const target = e.target;

  if (target.dataset.subcategoria) {
    const item = target.dataset.subcategoria;

    document.getElementById("search").value = item;

    filtrarAnuncios(item, "subcategoria");

    // cerrar menú mobile automáticamente
    document.querySelector(".js-menu-toggle")?.click();
  }
});