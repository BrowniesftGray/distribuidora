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


$sql = "SELECT * FROM videojuegos";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$respuesta="<?xml version='1.0' encoding='UTF-8'?><videojuegos>";
while($fila=mysql_fetch_assoc($resultados)){
    $respuesta.="<videojuego>";
        $respuesta.="<idVideojuego>".$fila['idVideojuegos']."</idVideojuego>";
        $respuesta.="<idDesarrolladora>".$fila['idDesarrolladoraFK']."</idDesarrolladora>";
        $respuesta.="<titulo>".$fila['Titulo']."</titulo>";
        $respuesta.="<plataforma>".$fila['Plataforma']."</plataforma>";
        $respuesta.="<fecha>".$fila['FechaSalida']."</fecha>";
        $respuesta.="<precio>".$fila['Precio']."</precio>";
    $respuesta.="</videojuego>";
}
$respuesta.="</videojuegos>";
echo $respuesta;

mysql_close($conexion);

?>
