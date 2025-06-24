document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM completamente cargado");

  const form = document.getElementById("form-editar");
  if (!form) {
    console.error("🚫 No se encontró el formulario con ID 'form-editar'");
    return;
  } else {
    console.log("✅ Formulario encontrado:", form);
  }

  // resto del código...

    
  const urlParams = new URLSearchParams(window.location.search);
  const ID = urlParams.get('ID');
  console.log("📥 ID recibido desde URL:", ID); 

  if (!ID) {
    alert("ID inválido");
    window.location.href = "buscar.html";
    return;
  }

  async function cargarDatos() {
    try {
      console.log("🔄 Realizando fetch a editarget.php con ID:", ID);
      const res = await fetch(`../php/editarget.php?ID=${ID}`);

      console.log("📡 Respuesta del servidor:", res);

      const contentType = res.headers.get("Content-Type");
      console.log("🧾 Content-Type:", contentType);

      if (!res.ok) throw new Error("Error al cargar datos");

      const visita = await res.json();
      console.log("📦 Datos recibidos:", visita);

      if (visita.error) {
        alert(visita.error);
        window.location.href = "buscar.html";
        return;
      }

      // Cargar datos en el formulario
      document.getElementById('ID').value = visita.ID;
      document.getElementById('Nombre').value = visita.Nombre || '';
      document.getElementById('Apellido').value = visita.Apellido || '';
      document.getElementById('DNI').value = visita.DNI || '';
      document.getElementById('Persona_visitada').value = visita.Persona_visitada || '';
      document.getElementById('Motivo').value = visita.Motivo || '';
      document.getElementById('fecha_ingreso').value = visita.fecha_ingreso || '';
      document.getElementById('hora_ingreso').value = visita.hora_ingreso || '';
      document.getElementById('fecha_salida').value = visita.fecha_salida || '';
      document.getElementById('hora_salida').value = visita.hora_salida || '';
    } catch (error) {
      console.error("🚨 Error al cargar los datos:", error);
      alert("No se pudo cargar la visita.");
      window.location.href = "buscar.html";
    }
  }

  document.getElementById('form-editar').addEventListener('submit', async function (e) {
    e.preventDefault();
    const datos = {
      ID: document.getElementById('ID').value,
      Nombre: document.getElementById('Nombre').value,
      Apellido: document.getElementById('Apellido').value,
      DNI: document.getElementById('DNI').value,
      Persona_visitada: document.getElementById('Persona_visitada').value,
      Motivo: document.getElementById('Motivo').value,
      fecha_ingreso: document.getElementById('fecha_ingreso').value,
      hora_ingreso: document.getElementById('hora_ingreso').value,
      fecha_salida: document.getElementById('fecha_salida').value,
      hora_salida: document.getElementById('hora_salida').value
    };

    try {
      const res = await fetch('../php/editarset.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      const data = await res.json();
      console.log("📬 Respuesta al guardar:", data);
      if (data.exito) {
        alert("Registro actualizado correctamente.");
        window.location.href = "buscar.html";
      } else {
        alert(data.error || "No se pudo actualizar el registro.");
      }
    } catch (error) {
      console.error("🚨 Error al guardar:", error);
      alert("Error al actualizar registro.");
    }
  });

  cargarDatos();
});
