function buscarVisitas() {
  const persona = document.getElementById("filtro-persona").value;
  const fecha = document.getElementById("filtro-fecha").value;

  let url = "../php/buscar.php?";
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

function mostrarResultados(visitas) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  if (!visitas || visitas.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron visitas.</p>";
    return;
  }

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
        <button class="btn-editar" data-id="${visita.id}">Editar</button>
        <button class="btn-eliminar" data-id="${visita.id}">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
//botones
  document.querySelectorAll('.btn-editar').forEach(boton => {
    boton.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      window.location.href = `../Pages/editar.html?id=${id}`;
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(boton => {
    boton.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      if (confirm("¿Querés eliminar este registro?")) {
        eliminarRegistro(id);
      }
    });
  });
}

function eliminarRegistro(id) {
  fetch('/visitas_edificio/php/eliminar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
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
