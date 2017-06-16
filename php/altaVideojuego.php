<?php

// Va a devolver una respuesta JSON que no se debe cachear
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "koch";
$usuario   = "root";
$password  = "";

$sVideojuego=$_REQUEST['datos'];

$oVideojuego = json_decode($sVideojuego);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

$mensaje='INSERTADO CON EXITO';
$error = false;

$sql = "insert into videojuegos (idDesarrolladoraFK, Titulo, Plataforma, FechaSalida, Precio) values ($oVideojuego->idDesarrolladoraFK,'$oVideojuego->Titulo','$oVideojuego->Plataforma','$oVideojuego->FechaSalida','$oVideojuego->Precio')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>
