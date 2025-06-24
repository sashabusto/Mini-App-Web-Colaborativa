<?php
header('Content-Type: application/json');
$conexion = new mysqli("localhost", "root", "", "visitas_edificio");
if ($conexion->connect_error) {
    echo json_encode(['exito' => false, 'error' => 'Error de conexión']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);
$ID = isset($data['ID']) ? intval($data['ID']) : 0;
if ($ID <= 0) {
    echo json_encode(['exito' => false, 'error' => 'ID inválido']);
    exit;
}
$stmt = $conexion->prepare("DELETE FROM visitas WHERE ID = ?");
$stmt->bind_param("i", $ID);
if ($stmt->execute()) {
    echo json_encode(['exito' => true]);
} else {
    echo json_encode(['exito' => false, 'error' => 'Error al eliminar']);
}
$stmt->close();
$conexion->close();
?>
