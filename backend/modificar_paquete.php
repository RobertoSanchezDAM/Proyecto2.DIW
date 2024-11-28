<?php
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos los datos
$paquete = json_decode($_POST['paquete']);

$sql = "UPDATE Paquete SET 
            nombrepaquete = '" . $paquete->nombrepaquete . "', 
            tipopaquete = '" . $paquete->tipopaquete . "', 
            tipoalojamiento = '" . $paquete->tipoalojamiento . "', 
            fechainicio = '" . $paquete->fechainicio . "', 
            fechafin = '" . $paquete->fechafin . "', 
            transporte = '" . $paquete->transporte . "',
            viaje_id = '" . $paquete->viaje_id . "'
        WHERE id = '" . $paquete->id . "'";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, true, "Se ha modificado el paquete", $conexion);
}
