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

$respuesta='<table id="listado" class="table table-striped" border="1">';
$respuesta.='<tr><th>id de Videojuego</th><th>id de Desarrolladora</th><th>Titulo</th><th>Plataforma</th><th>FechaSalida</th><th>Precio</th></tr>';
while($fila=mysql_fetch_assoc($resultados)){
    $respuesta.="<tr>";
        $respuesta.="<td>".$fila['idVideojuegos']."</td>";
        $respuesta.="<td>".$fila['idDesarrolladoraFK']."</td>";
        $respuesta.="<td>".$fila['Titulo']."</td>";
        $respuesta.="<td>".$fila['Plataforma']."</td>";
        $respuesta.="<td>".$fila['FechaSalida']."</td>";
        $respuesta.="<td>".$fila['Precio']."</td>";
    $respuesta.="</tr>";
}
$respuesta.="</table>";
echo $respuesta;

mysql_close($conexion);

?>
