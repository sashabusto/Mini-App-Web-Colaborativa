function buscarVisitas() {
  const persona = document.getElementById("filtro-persona").value;
  const fecha = document.getElementById("filtro-fecha").value;

  let url = "/visitas_edificio/php/buscar.php?";
  const params = new URLSearchParams();

  if (persona) params.append('persona', persona);
  if (fecha) params.append('fecha', fecha);

  url += params.toString();

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      return res.json();
    })
    .then(data => mostrarResultados(data))
    .catch(error => {
      console.error('Error en la búsqueda:', error);
      document.getElementById("resultados").innerHTML =
        "<p>Error al realizar la búsqueda. </p>";
    });
}

function formatearFecha(fecha, hora) {
  const f = fecha ? new Date(fecha + 'T' + (hora || '00:00:00')) : null;
  if (!f || isNaN(f)) return 'Fecha inválida';
  
  return f.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function mostrarResultados(visitas) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  if (!visitas || visitas.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron visitas.</p>";
    return;
  }
  console.log("Visitas recibidas:", visitas);

  visitas.forEach(visita => {
    const div = document.createElement("div");
    div.className = "tarjeta";
    div.innerHTML = `
      <strong>${visita.Nombre || 'N/A'} ${visita.Apellido || 'N/A'}</strong><br>
      DNI: ${visita.DNI || 'N/A'}<br>
      Visita a: ${visita.Persona_visitada || 'N/A'}<br>
      Motivo: ${visita.Motivo || 'N/A'}<br>
      Ingreso: ${formatearFecha(visita.fecha_ingreso, visita.hora_ingreso)}<br>
      Salida: ${visita.hora_salida ? formatearFecha(visita.fecha_salida, visita.hora_salida) : 'N/A'}<br>
      <div class="estado ${visita.hora_salida ? 'salida' : 'presente'}">
        ${visita.hora_salida ? 'Salió' : 'Presente'}
      </div>
      <div class="acciones">
        <button class="btn-editar" data-id="${visita.ID}">Editar</button>
        <button class="btn-eliminar" data-id="${visita.ID}">Eliminar</button>
      </div>
    `;
    console.log("Visita individual:", visita);

    contenedor.appendChild(div);
  });
  
//botones
 document.querySelectorAll('.btn-editar').forEach(boton => {
  boton.addEventListener('click', function () {
    const ID = this.getAttribute('data-id');
    console.log("📌 ID al hacer clic en editar:", ID); // <-- este log es CLAVE
    window.location.href = `../Pages/editar.html?ID=${ID}`;
  });
});

  document.querySelectorAll('.btn-eliminar').forEach(boton => {
    boton.addEventListener('click', function() {
      const ID = this.getAttribute('data-id');
      if (confirm("¿Querés eliminar este registro?")) {
        eliminarRegistro(ID);
      }
    });
  });
}

function eliminarRegistro(ID) {
  fetch('/visitas_edificio/php/eliminar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ID })
  })
  .then(res => {
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return res.json();
  })
  .then(data => {
    if (data.exito) {
      alert("Registro eliminado correctamente.");
      buscarVisitas(); 
    } else {
      alert(data.error || "No se pudo eliminar el registro.");
    }
  })
  .catch(err => {
    console.error('Error al eliminar:', err);
    alert("Error al eliminar el registro.");
  });
}
