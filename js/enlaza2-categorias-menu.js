fetch("json/categorias-menu.json")
  .then(response => response.json())
  .then(categorias => {
    const menu = document.getElementById("menu-categorias");

    categorias.forEach(grupo => {
      const li = document.createElement("li");

      const titulo = document.createElement("h6");
      titulo.textContent = grupo.group;

      const subUl = document.createElement("ul");

      grupo.items.forEach(item => {
        const subLi = document.createElement("li");
        subLi.textContent = item;
        subLi.style.cursor = "pointer";

        subLi.onclick = () => {
          console.log("Seleccionaste:", item);
        };

        subUl.appendChild(subLi);
      });

      li.appendChild(titulo);
      li.appendChild(subUl);
      menu.appendChild(li);
    });
  })
  .catch(error => console.error("Error cargando JSON:", error));