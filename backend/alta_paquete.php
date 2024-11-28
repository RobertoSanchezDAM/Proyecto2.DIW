<?php 
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos los datos enviados desde el formulario
$nombre = $_POST['nombrepaquete'];
$tipopaquete = $_POST['tipopaquete'];
$tipoalojamiento = $_POST['tipoalojamiento'];
$fechainicio = $_POST['fechainicio'];
$fechafin = $_POST['fechafin'];
$transporte = $_POST['transporte'];
$idViaje = $_POST['viaje_id'];

// Insertamos los datos en la base de datos
$sql = "INSERT INTO Paquete (nombrepaquete, tipopaquete, tipoalojamiento, fechainicio, fechafin, transporte, viaje_id) 
        VALUES ('$nombre', '$tipopaquete', '$tipoalojamiento', '$fechainicio', '$fechafin', '$transporte', '$idViaje')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    // Si hay un error, lo devuelve
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
} else {
    // Si no hay error, se inserta el nuevo cliente
    responder(null, true, "Se ha insertado un nuevo paquete", $conexion);
}
