<?php

// Va a devolver una respuesta JSON que no se debe cachear
header("Content-Type: text/xml");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "koch";
$usuario   = "root";
$password  = "";



// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "SELECT * FROM desarrolladoras";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$respuesta="<?xml version='1.0' encoding='UTF-8'?><desarrolladoras>";
while($fila=mysql_fetch_assoc($resultados)){
    $respuesta.="<desarrolladora>";
        $respuesta.="<idDesarrolladora>".$fila['idDesarrolladoras']."</idDesarrolladora>";
        $respuesta.="<nombre>".$fila['Nombre']."</nombre>";
        $respuesta.="<pais>".$fila['Pais']."</pais>";
        $respuesta.="<direccion>".$fila['Direccion']."</direccion>";
    $respuesta.="</desarrolladora>";
}
$respuesta.="</desarrolladoras>";
echo $respuesta;

mysql_close($conexion);

?>
