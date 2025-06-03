<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "visitas_edificio");

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener datos del formulario (usando los name correctos)
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$dni = $_POST['dni'];
$motivo = $_POST['motivo'];
$persona_visitada = $_POST['persona_visita']; // ✅ corregido
$hora_ingreso = $_POST['hora_ingreso'];       // ✅ corregido

// Registrar la fecha actual automáticamente
$fecha_ingreso = date("Y-m-d");

// Insertar en la base de datos (¡nombres de columna deben coincidir con la tabla!)
$sql = "INSERT INTO visitas (Nombre, Apellido, DNI, Motivo, Persona_visitada, fecha_ingreso, hora_ingreso)
        VALUES ('$nombre', '$apellido', '$dni', '$motivo', '$persona_visitada', '$fecha_ingreso', '$hora_ingreso')";

if ($conexion->query($sql) === TRUE) {
    echo "Registro guardado con éxito.";
} else {
    echo "Error: " . $sql . "<br>" . $conexion->error;
}

$conexion->close();
?>
