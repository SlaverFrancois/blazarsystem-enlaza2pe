let anuncios = [];

fetch("json/anuncios.json")
  .then(res => res.json())
  .then(data => {
    anuncios = data;

    // extraer palabras clave
    const palabras = new Set();

    data.forEach(a => {
      palabras.add(a.rubro);
      palabras.add(a.category);
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

function filtrarAnuncios(texto) {
  const resultados = anuncios.filter(a => {
    return (
      a.rubro.toLowerCase().includes(texto.toLowerCase()) ||
      a.category.toLowerCase().includes(texto.toLowerCase()) ||
      a.especiality.toLowerCase().includes(texto.toLowerCase()) ||
      a.skills.some(s => s.toLowerCase().includes(texto.toLowerCase()))
    );
  });

  renderAnuncios(resultados);
}