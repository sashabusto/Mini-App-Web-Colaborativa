<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

try {
    $conexion = new mysqli("localhost", "root", "", "visitas_edificio");

    if ($conexion->connect_error) {
        throw new Exception("Error de conexión: " . $conexion->connect_error);
    }

    $persona = isset($_GET['persona']) ? $_GET['persona'] : '';
    $fecha = isset($_GET['fecha']) ? $_GET['fecha'] : '';

    $sql = "SELECT ID AS ID, DNI, Nombre, Apellido, Persona_visitada, Motivo, fecha_ingreso, hora_ingreso, fecha_salida, hora_salida FROM visitas WHERE 1=1";
    $params = [];
    $types = "";

    if (!empty($persona)) {
        $sql .= " AND (CAST(DNI AS CHAR) LIKE ? OR Apellido LIKE ?)";
        $searchTerm = "%$persona%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $types .= "ss";
    }

    if (!empty($fecha)) {
        $sql .= " AND fecha_ingreso = ?";
        $params[] = $fecha;
        $types .= "s";
    }

    $stmt = $conexion->prepare($sql);

    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $visitas = [];
    while ($fila = $result->fetch_assoc()) {
        $visitas[] = $fila;
    }

    echo json_encode($visitas);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    if (isset($conexion)) {
        $conexion->close();
    }
}
