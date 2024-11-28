<?php
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

require_once('config.php');
$conexion = obtenerConexion();

$id = $_POST["id"];

// SQL
$sql = "SELECT c.dni_cliente, cl.nombre 
        FROM Cliente_Paquete c 
        JOIN Cliente cl ON c.dni_cliente = cl.dni 
        WHERE c.id_paquete = '$id';";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);