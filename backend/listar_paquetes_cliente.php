<?php 

include_once("config.php");
$conexion = obtenerConexion();

// Recogemos el dni
$dni = $_POST['dni_cliente'];

// Inicializar el array para evitar errores
$datos = [];

// Consulta
$sql = "SELECT *
        FROM Paquete AS pa
        INNER JOIN Cliente_Paquete AS cp
        ON pa.id = cp.id_paquete
        WHERE cp.dni_cliente = '$dni';";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

if ($fila) {
    responder($fila, true,"Datos recuperados", $conexion);
} else {
    responder(null, false, "No existe el cliente", $conexion);
}