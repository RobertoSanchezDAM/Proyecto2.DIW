<?
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos

require_once('config.php');
$conexion = obtenerConexion();

// Recogemos datos de entrada
$id = $_POST['id'];

// Montamos la consulta
$sql = "SELECT Viaje.* FROM Viaje WHERE Viaje.id = '$id'";

$resultado = mysqli_query($conexion, $sql);

// Pedimos la fila
$fila = mysqli_fetch_assoc($resultado);

if ($fila) {
    responder($fila, true,"Datos recuperados", $conexion);
} else {
    responder(null, false, "No existe el viaje", $conexion);
}
