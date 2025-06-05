function buscarVisitas() {
  const persona = document.getElementById("filtro-persona").value;
  const fecha = document.getElementById("filtro-fecha").value;

  let url = "/visitas_edificio/buscar.php?";
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
        "<p>Error al realizar la búsqueda. Revisa la consola.</p>";
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
    `;
    contenedor.appendChild(div);
  });
}


function formatearFecha(fecha, hora) {
  if (!fecha || !hora) return 'N/A';
  const fechaHora = new Date(`${fecha}T${hora}`);
  return fechaHora.toLocaleString('es-AR');
}
