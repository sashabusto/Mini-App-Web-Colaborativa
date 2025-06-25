<?php
$conexion = new mysqli("localhost", "root", "", "visitas_edificio");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$dni = $_POST['dni'];
$hora_salida = $_POST['hora_salida'];
$fecha_salida = date("Y-m-d");

$sql = "UPDATE visitas 
        SET fecha_salida = '$fecha_salida', hora_salida = '$hora_salida'
        WHERE DNI = '$dni' AND fecha_salida IS NULL
        ORDER BY id DESC
        LIMIT 1";

if ($conexion->query($sql) === TRUE) {
    header("Location: /visitas_edificio/index.html");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conexion->error;
}

$conexion->close();
?>
