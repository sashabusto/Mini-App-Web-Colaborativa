document.getElementById('form-login').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim().toLowerCase();
  const apellido = document.getElementById('apellido').value.trim().toLowerCase();
  const dni = document.getElementById('dni').value.trim();

  // Validaciones en frontend
  if (!nombre || !apellido || !dni) {
    alert('Por favor, completá todos los campos.');
    return;
  }

  if (!/^\d{7,10}$/.test(dni)) {
    alert('El DNI debe contener solo números y tener entre 7 y 10 dígitos.');
    return;
  }

  if (!/^[a-záéíóúñü\s]+$/i.test(nombre) || !/^[a-záéíóúñü\s]+$/i.test(apellido)) {
    alert('El nombre y apellido solo deben contener letras y espacios.');
    return;
  }

  try {
    const response = await fetch('../login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, dni })
    });

    const data = await response.json();

    if (data.autorizado) {
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('apellido', apellido);
      localStorage.setItem('dni', dni);
      window.location.href = '/visitas_edificio/index.html';
    } else {
      alert(data.error || 'No estás autorizado para ingresar.');
      window.location.href = 'login.html';
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Hubo un problema al conectar con el servidor.');
  }
});
