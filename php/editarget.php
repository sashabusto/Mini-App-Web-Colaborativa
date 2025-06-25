<?php
header('Content-Type: application/json');
$conexion = new mysqli("localhost", "root", "", "visitas_edificio");
if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión']);
    exit;
}

$ID = isset($_GET['ID']) ? intval($_GET['ID']) : 0;
if ($ID <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'ID inválido']);
    exit;
}
$stmt = $conexion->prepare("SELECT * FROM visitas WHERE ID = ?");
$stmt->bind_param("i", $ID);
$stmt->execute();
$result = $stmt->get_result();
$visita = $result->fetch_assoc();
if (!$visita) {
    http_response_code(404);
    echo json_encode(['error' => 'Visita no encontrada']);
    exit;
}
echo json_encode($visita);
$stmt->close();
$conexion->close();
