document.addEventListener("DOMContentLoaded", () => {

  const btnPublicar =
    document.getElementById("btnPublicarMini");

  const step1 =
    document.getElementById("miniStep1");

  const textarea =
    document.getElementById("miniServicio");

  const inputDatos =
    document.getElementById("miniNombreTelefono");

  const countServicio =
    document.getElementById("countServicio");

  const countDatos =
    document.getElementById("countDatos");

  const stepFinal =
    document.getElementById("miniStep2");

  const startTime = Date.now();

  /* AUTO GROW */
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height =
      Math.min(textarea.scrollHeight, 92) + "px";
    const restante =
      350 - textarea.value.length;
    countServicio.innerText = restante;
    if (restante <= 40) {
      countServicio.parentElement
        .classList.add("blz-counter-warning");
    } else {
      countServicio.parentElement
        .classList.remove("blz-counter-warning");
    }
  });

 /* INPUT */

inputDatos.addEventListener("input", () => {
  const restante =  80 - inputDatos.value.length;
  countDatos.innerText = restante;
  if (restante <= 15) {
    countDatos.parentElement
      .classList.add("blz-counter-warning");
  } else {
    countDatos.parentElement
      .classList.remove("blz-counter-warning");
  }
});


  /* PUBLICAR */
  btnPublicar.addEventListener("click", async () => {

    const servicio =
      textarea.value.trim();

    const nombretelefono =
      inputDatos.value.trim();

    /*Validacion*/

    if (servicio === "") {
      alert("Ingresa tu servicio");
      return;
    }

    if (servicio.length < 5) {
      alert("Describe mejor tu servicio");
      return;
    }

    if (servicio.length > 350) {
      alert("Servicio demasiado largo");
      return;
    }

    if (nombretelefono === "") {
      alert("Ingresa tu nombre y WhatsApp");
      return;
    }

    if (nombretelefono.length < 5) {
      alert("Ingresa nombre y WhatsApp");
      return;
    }

    if (nombretelefono.length > 80) {
      alert("Datos demasiado largos");
      return;
    }

    const gonzalo =
      document.getElementById("gonzalo").value;

    if (gonzalo !== "") {
      return;
    }

    /* TIEMPO MINIMO */
    const segundos =
      (Date.now() - startTime) / 1000;

    if (segundos < 3) {
      alert("Espera unos segundos");
      return;
    }

    const data = {
      servicios: servicio,
      nombretelefono: nombretelefono,
      timestamp: Date.now()
    };

    try {

      btnPublicar.disabled = true;
      btnPublicar.innerText = "Enviando...";

      await fetch(
        "https://script.google.com/macros/s/AKfycbyElkanUrtIcnE5SvLA1qqt97Ag22Jo2BOrXceki1EG4dD0-PffrU2_Hh_Hb8wyqP1fPA/exec",
        {
          method: "POST",
          body: JSON.stringify(data)
        }
      );

      /* MOSTRAR FINAL */
      step1.style.display = "none";
      stepFinal.style.display = "block";

      /* LIMPIAR */

      textarea.value = "";
      inputDatos.value = "";
      countServicio.innerText = "0";
      countDatos.innerText = "0";
      textarea.style.height = "44px";

    } catch (error) {
      alert("Error al enviar");
    } finally {
      btnPublicar.disabled = false;
      btnPublicar.innerText = "Publicar";
    }
  });
});