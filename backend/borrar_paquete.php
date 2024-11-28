<?php
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

require_once("config.php");
$conexion = obtenerconexion();

// Recoger datos
$id = $_POST["id"];

// Consulta SQL para el borrado del cliente
$sql = "DELETE FROM Paquete WHERE id = '$id'";

$resultado = mysqli_query($conexion, $sql);

responder(null, true, "Datos eliminados", $conexion);