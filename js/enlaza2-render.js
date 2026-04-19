function renderAnuncios(lista) {
  // limpiar
  for (let i = 1; i <= 5; i++) {
    document.getElementById("tipo" + i).innerHTML = "";
  }

  lista.forEach(a => {
    switch (a.tipoanuncio) {
      case 1:
        document.getElementById("tipo1").innerHTML += diseño1(a);
        break;
      case 2:
        document.getElementById("tipo2").innerHTML += diseño2(a);
        break;
      case 3:
        document.getElementById("tipo3").innerHTML += diseño3(a);
        break;
      case 4:
        document.getElementById("tipo4").innerHTML += diseño4(a);
        break;
      case 5:
        document.getElementById("tipo5").innerHTML += diseño5(a);
        break;
    }
  });
}

/*DISEÑO 1 (especialista sin tarjeta)*/
/*FALTA CONFIGURAR EL LINK DE LA IMAGEN Q DEBE VENIR DEL JSON + EL HREF DE LA PAGINA A VISITAR*/
function diseño1(a) {
  return `
  
    <div class="blog-entry d-flex blog-entry-search-item">
      <a href="#" class="img-link me-4">
        <img src="images/img_1_sq.jpg" class="img-fluid">
      </a>
      <div>
        <span class="date">${a.rubro} &bullet; ${a.category}</span>
        <h2><a href="#">${a.titulo}</a></h2>
        <span class="d-inline-block mt-1"><a href="#">${a.representante}</a></span>
        <p>${a.descripcion}</p>
        <p><a href="#" class="btn btn-sm btn-outline-primary">Continuar leyendo</a></p>
      </div>
    </div>`;
}


/*DISEÑO 2 (tarjeta con imagen)*/
/*FALTA CONFIGURAR EL LINK DE LA IMAGEN Q DEBE VENIR DEL JSON + EL HREF DE LA PAGINA A VISITAR*/
function diseño2(a) {
  return `
	  <div class="col-md-6 col-lg-4">
		<div class="blog-entry">
		  <a href="#" class="img-link">
			<img src="images/img_1_horizontal.jpg" class="img-fluid">
		  </a>
		  <span class="date">${a.rubro} &bullet; ${a.category}</span>
		  <h2><a href="#">${a.titulo}</a></h2>
		  
			<div class="post-meta align-items-center text-left clearfix">
				<figure class="author-figure mb-0 me-3 float-start"><img src="images/person_3.jpg"
						alt="Image" class="img-fluid"></figure>
				<span class="d-inline-block mt-1"><a href="#">${a.representante}</a></span>
			</div>
						
		  <p>${a.descripcion}</p>
		  <p><a href="#" class="btn btn-sm btn-outline-primary">Continuar leyendo</a></p>
		</div>
	  </div>`;
}

/*DISEÑO 3 (grid simple)*/
/*FALTA CONFIGURAR EL LINK DE LA IMAGEN Q DEBE VENIR DEL JSON + EL HREF DE LA PAGINA A VISITAR*/
function diseño3(a) {
  return `
  <div class="col-md-4">
    <div class="blog-entry">
      <a href="#" class="img-link">
        <img src="images/img_1_sq.jpg" class="img-fluid">
      </a>
      <span class="date">${a.rubro} &bullet; ${a.category}</span>
      <h2><a href="#">${a.titulo}</a></h2>
      <p>${a.descripcion}</p>
      <p><a href="#" class="btn btn-sm btn-outline-primary">CONTINUAR LEYENDO</a></p>
    </div>
  </div>`;
}

/*DISEÑO 4 (sin imagen - clasificados)*/
/*FALTA CONFIGURAR EL LINK DE LA IMAGEN Q DEBE VENIR DEL JSON + EL HREF DE LA PAGINA A VISITAR*/
function diseño4(a) {
  return `
	  <div class="col-md-6 col-lg-4">
		<span class="date">${a.rubro} &bullet; ${a.category}</span>
		<h3><a href="#">${a.titulo}</a></h3>
		<div class="post-meta align-items-center text-left clearfix">
			<span class="d-inline-block mt-1"><a href="#">${a.representante}</a></span>
		</div>	
		<p>${a.descripcion}</p>
		<p><a href="#" class="btn btn-sm btn-outline-primary">Continuar leyendo</a></p>
	  </div>`;
}

/*DISEÑO 5 (mixto horizontal)*/
/*FALTA CONFIGURAR EL LINK DE LA IMAGEN Q DEBE VENIR DEL JSON + EL HREF DE LA PAGINA A VISITAR*/
function diseño5(a) {
  return `
  <div class="col-md-6 col-lg-4">
    <div class="blog-entry">
      <a href="#" class="img-link">
        <img src="images/img_1_horizontal.jpg" class="img-fluid">
      </a>
      <span class="date">${a.rubro} &bullet; ${a.category}</a></span>
      <h2><a href="#">${a.titulo}</a></h2>	  
			<div class="post-meta align-items-center text-left clearfix">
			<figure class="author-figure mb-0 me-3 float-start"><img src="images/person_3.jpg" class="img-fluid"></figure>
			<span class="d-inline-block mt-1"><a href="#">${a.representante}</a></span>
			</div>
      <p>${a.descripcion}</p>
			<p><a href="#" class="btn btn-sm btn-outline-primary">Continuar leyendo</a></p>
	</div>
  </div>`;
}