<?php
$conexion = new mysqli("localhost", "root", "", "visitas_edificio");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$dni = $_POST['dni'];
$hora_salida = $_POST['hora_salida'];
$fecha_salida = date("Y-m-d");

// Actualizamos el último registro con ese DNI que tenga hora de salida NULL
$sql = "UPDATE visitas 
        SET fecha_salida = '$fecha_salida', hora_salida = '$hora_salida'
        WHERE DNI = '$dni' AND fecha_salida IS NULL
        ORDER BY id DESC
        LIMIT 1";

if ($conexion->query($sql) === TRUE) {
    echo "Salida registrada correctamente.";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
