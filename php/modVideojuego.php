<?php

// Va a devolver una respuesta JSON que no se debe cachear
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "koch";
$usuario   = "root";
$password  = "";

$datos=$_REQUEST['datos'];

$oVideojuego = json_decode($datos);


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "UPDATE videojuegos SET idDesarrolladoraFK='$oVideojuego->idDesarrolladoraFK',Titulo='$oVideojuego->Titulo',Plataforma='$oVideojuego->Plataforma',FechaSalida='$oVideojuego->FechaSalida',Precio='$oVideojuego->Precio' WHERE idVideojuegos='$oVideojuego->idVideojuegos'";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Modificacion de videojuego realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>
