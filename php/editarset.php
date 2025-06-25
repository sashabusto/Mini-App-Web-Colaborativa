<?php
header('Content-Type: application/json');
$conexion = new mysqli("localhost", "root", "", "visitas_edificio");
if ($conexion->connect_error) {
    echo json_encode(['exito' => false, 'error' => 'Error de conexión']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$ID = isset($data['ID']) ? intval($data['ID']) : 0;
$nombre = isset($data['Nombre']) ? trim($data['Nombre']) : '';
$apellido = isset($data['Apellido']) ? trim($data['Apellido']) : '';
$dni = isset($data['DNI']) ? trim($data['DNI']) : '';
$persona_visitada = isset($data['Persona_visitada']) ? trim($data['Persona_visitada']) : '';
$motivo = isset($data['Motivo']) ? trim($data['Motivo']) : '';
$fecha_ingreso = isset($data['fecha_ingreso']) ? $data['fecha_ingreso'] : '';
$hora_ingreso = isset($data['hora_ingreso']) ? $data['hora_ingreso'] : '';
$fecha_salida = isset($data['fecha_salida']) ? $data['fecha_salida'] : null;
$hora_salida = isset($data['hora_salida']) ? $data['hora_salida'] : null;

if ($ID <= 0 || !$nombre || !$apellido || !$dni) {
    echo json_encode(['exito' => false, 'error' => 'Datos incompletos o inválidos']);
    exit;
}

$stmt = $conexion->prepare("UPDATE visitas SET Nombre=?, Apellido=?, DNI=?, Persona_visitada=?, Motivo=?, fecha_ingreso=?, hora_ingreso=?, fecha_salida=?, hora_salida=? WHERE ID=?");
$stmt->bind_param("sssssssssi", $nombre, $apellido, $dni, $persona_visitada, $motivo, $fecha_ingreso, $hora_ingreso, $fecha_salida, $hora_salida, $ID);

if ($stmt->execute()) {
    echo json_encode(['exito' => true]);
} else {
    echo json_encode(['exito' => false, 'error' => 'Error al actualizar']);
}

$stmt->close();
$conexion->close();
