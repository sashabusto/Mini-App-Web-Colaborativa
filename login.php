<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "visitas_edificio");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener los datos del JSON recibido
$data = json_decode(file_get_contents("php://input"), true);

// Convertimos a minúscula por consistencia
$nombre = strtolower(trim($data['nombre']));
$apellido = strtolower(trim($data['apellido']));
$dni = trim($data['dni']);

// Buscar si el usuario está autorizado
$stmt = $conexion->prepare("SELECT * FROM personal_autorizado WHERE nombre = ? AND apellido = ? AND dni = ?");
$stmt->bind_param("sss", $nombre, $apellido, $dni);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    // Está autorizado → registrar sesión
    $stmt2 = $conexion->prepare("INSERT INTO registro_sesiones (nombre, apellido, dni) VALUES (?, ?, ?)");
    $stmt2->bind_param("sss", $nombre, $apellido, $dni);
    $stmt2->execute();

    echo json_encode(["autorizado" => true]);
} else {
    echo json_encode(["autorizado" => false]);
}
?>
