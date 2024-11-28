<?php
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

require_once("config.php");
$conexion = obtenerConexion(); 

// En este caso no existen datos de entrada que recoger

// Consultamos todos los clientes de la base de datos
$sql = "SELECT * FROM Viaje";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertamos la fila en un array
}

responder($datos, true, "Datos recuperados", $conexion);