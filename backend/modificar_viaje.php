<?php
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos los datos
$viaje = json_decode($_POST['viaje']);

$sql = "UPDATE Viaje SET 
            origen = '" . $viaje->origen . "', 
            destino = '" . $viaje->destino . "', 
            fechainicio = '" . $viaje->fechainicio . "', 
            fechafin = '" . $viaje->fechafin . "'
        WHERE id = '" . $viaje->id . "'";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, true, "Se ha modificado el viaje", $conexion);
}
