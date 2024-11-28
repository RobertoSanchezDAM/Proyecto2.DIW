<?php 
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos los datos enviados desde el formulario
$origen = $_POST['origen'];
$destino = $_POST['destino'];
$fechaInicio = $_POST['fechaInicio'];
$fechaFin = $_POST['fechaFin'];

// Insertamos los datos en la base de datos
$sql = "INSERT INTO Viaje (origen, destino, fechaInicio, fechaFin) 
        VALUES ('$origen', '$destino', '$fechaInicio', '$fechaFin')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    // Si hay un error, lo devuelve
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
} else {
    // Si no hay error, se inserta el nuevo viaje
    responder(null, true, "Se ha insertado un nuevo viaje", $conexion);
}
