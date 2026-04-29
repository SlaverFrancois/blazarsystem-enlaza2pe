function renderAnuncios(lista) {
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

  actualizarCTA(lista.length); // 🔥 AQUÍ
}

/*DISEÑO 1 (especialista sin tarjeta)*/
function diseño1(a) {
  return `
  
    <div class="blog-entry d-flex blog-entry-search-item">
      <a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="img-link me-4">
        <img src="${a.imagenes?.[0] || 'img/default/diseno1-3.jpg'}" class="img-fluid">
      </a>
      <div>
        <span class="date">${a.rubro} &bullet; ${a.subcategory}</span>
        <h2><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.titulo}</a></h2>
        <span class="d-inline-block mt-1"><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.representante}</a></span>
        <p>${a.descripcion}</p>
        <p><a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="btn btn-sm btn-outline-primary">VER MÁS DETALLES</a></p>
      </div>
    </div>`;
}


/*DISEÑO 2 (tarjeta con imagen)*/ 
function diseño2(a) {
  return `
	  <div class="col-md-6 col-lg-4">
		<div class="blog-entry">
		  <a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="img-link">
      <img src="${a.imagenes?.[0] || 'img/default/diseno2-5.jpg'}" class="img-fluid">
		  </a>
		  <span class="date">${a.rubro} &bullet; ${a.subcategory}</span>
		  <h2><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.titulo}</a></h2>
		  
			<div class="post-meta align-items-center text-left clearfix">
				<figure class="author-figure mb-0 me-3 float-start"><img src="${a.perfil || 'img/default/persona.jpg'}" class="img-fluid">
        </figure>
				<span class="d-inline-block mt-1"><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.representante}</a></span>
			</div>
						
		  <p>${a.descripcion}</p>
		  <p><a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="btn btn-sm btn-outline-primary">VER MÁS DETALLES</a></p>
		</div>
	  </div>`;
}

/*DISEÑO 3 (grid simple)*/ 
function diseño3(a) {
  return `
  <div class="col-md-4">
    <div class="blog-entry">
      <a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="img-link">
        <img src="${a.imagenes?.[0] || 'img/default/diseno1-3.jpg'}" class="img-fluid">
      </a>
      <span class="date">${a.rubro} &bullet; ${a.subcategory}</span>
      <h2><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.titulo}</a></h2>
      <p>${a.descripcion}</p>
      <p><a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="btn btn-sm btn-outline-primary">VER MÁS DETALLES</a></p>
    </div>
  </div>`;
}

/*DISEÑO 4 (sin imagen - clasificados)*/ 
function diseño4(a) {
  return `
	  <div class="col-md-6 col-lg-4">
		<span class="date">${a.rubro} &bullet; ${a.subcategory}</span>
		<h3><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.titulo}</a></h3>
		<div class="post-meta align-items-center text-left clearfix">
			<span class="d-inline-block mt-1"><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.representante}</a></span>
		</div>	
		<p>${a.descripcion}</p>
		<p><a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="btn btn-sm btn-outline-primary">VER MÁS DETALLES</a></p>
	  </div>`;
}

/*DISEÑO 5 (mixto horizontal)*/ 
function diseño5(a) {
  return `
  <div class="col-md-6 col-lg-4">
    <div class="blog-entry">
      <a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="img-link">
        <img src="${a.imagenes?.[0] || 'img/default/diseno2-5.jpg'}" class="img-fluid">
      </a>
      <span class="date">${a.rubro} &bullet; ${a.subcategory}</a></span>
      <h2><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.titulo}</a></h2>	  
			<div class="post-meta align-items-center text-left clearfix">
			<figure class="author-figure mb-0 me-3 float-start"><img src="${a.perfil || 'img/default/persona.jpg'}" class="img-fluid">
      </figure>
			<span class="d-inline-block mt-1"><a href="javascript:void(0)" onclick="abrirVista('${a.web}')">${a.representante}</a></span>
			</div>
      <p>${a.descripcion}</p>
			<p><a href="javascript:void(0)" onclick="abrirVista('${a.web}')" class="btn btn-sm btn-outline-primary">VER MÁS DETALLES</a></p>
	</div>
  </div>`;
}