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

$oDesarrolladora = json_decode($datos, true);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "insert into desarrolladoras (Nombre, Pais, Direccion) values ('$oDesarrolladora->Nombre','$oDesarrolladora->Pais','$oDesarrolladora->Direccion')";

$resultados = @mysql_query($sql, $conexion) or die(mysql_error());

$mensaje='Alta de Desarrolladora realizada';
$error = false;

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>
