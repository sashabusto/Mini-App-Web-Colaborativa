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
      document.getElementById("btn-exportar").style.display = "none";
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
  const tablaPDF = document.getElementById("tabla-para-pdf");
  contenedor.innerHTML = "";
  tablaPDF.innerHTML = "";

  if (!visitas || visitas.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron visitas.</p>";
    document.getElementById("btn-exportar").style.display = "none";
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
        <button class="btn-editar" data-id="${visita.ID}">Editar</button>
        <button class="btn-eliminar" data-id="${visita.ID}">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  // Construir tabla invisible para PDF
  let tablaHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid #000; padding: 5px;">Nombre</th>
          <th style="border: 1px solid #000; padding: 5px;">Apellido</th>
          <th style="border: 1px solid #000; padding: 5px;">DNI</th>
          <th style="border: 1px solid #000; padding: 5px;">Visitado</th>
          <th style="border: 1px solid #000; padding: 5px;">Motivo</th>
          <th style="border: 1px solid #000; padding: 5px;">Ingreso</th>
          <th style="border: 1px solid #000; padding: 5px;">Salida</th>
          <th style="border: 1px solid #000; padding: 5px;">Estado</th>
        </tr>
      </thead>
      <tbody>
  `;

  visitas.forEach(visita => {
    tablaHTML += `
      <tr>
        <td style="border: 1px solid #000; padding: 5px;">${visita.Nombre || 'N/A'}</td>
        <td style="border: 1px solid #000; padding: 5px;">${visita.Apellido || 'N/A'}</td>
        <td style="border: 1px solid #000; padding: 5px;">${visita.DNI || 'N/A'}</td>
        <td style="border: 1px solid #000; padding: 5px;">${visita.Persona_visitada || 'N/A'}</td>
        <td style="border: 1px solid #000; padding: 5px;">${visita.Motivo || 'N/A'}</td>
        <td style="border: 1px solid #000; padding: 5px;">${formatearFecha(visita.fecha_ingreso, visita.hora_ingreso)}</td>
        <td style="border: 1px solid #000; padding: 5px;">${visita.hora_salida ? formatearFecha(visita.fecha_salida, visita.hora_salida) : 'N/A'}</td>
        <td style="border: 1px solid #000; padding: 5px;">${visita.hora_salida ? 'Salió' : 'Presente'}</td>
      </tr>
    `;
  });

  tablaHTML += "</tbody></table>";
  tablaPDF.innerHTML = tablaHTML;

  // Mostrar botón de exportar
  document.getElementById("btn-exportar").style.display = "inline-block";

  // Activar botones de editar/eliminar
  document.querySelectorAll('.btn-editar').forEach(boton => {
    boton.addEventListener('click', function () {
      const ID = this.getAttribute('data-id');
      window.location.href = `../Pages/editar.html?ID=${ID}`;
    });
  });

  document.querySelectorAll('.btn-eliminar').forEach(boton => {
    boton.addEventListener('click', function () {
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

// ✅ Función de exportación PDF con solución para display:none
function exportarPDF() {
  const tabla = document.getElementById("tabla-para-pdf");

  // Mostrar temporalmente la tabla para que html2pdf la capture
  tabla.style.display = "block";

  const opciones = {
    margin: 0.5,
    filename: 'historial_visitas.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

  html2pdf().set(opciones).from(tabla).save()
    .finally(() => {
      // Ocultar la tabla nuevamente
      tabla.style.display = "none";
    });
}
