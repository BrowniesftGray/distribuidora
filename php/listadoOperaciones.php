<?php

// Va a devolver una respuesta JSON que no se debe cachear
header("Content-Type: text/xml");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "koch";
$usuario   = "root";
$password  = "";

$sID=$_REQUEST['sID'];


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

//SELECT operaciones.idOperacion, tiendas.idTiendas, videojuegos.idVideojuegos, operaciones.Unidades, operaciones.Tipo FROM ((operaciones INNER JOIN videojuegos ON operaciones.idVideojuegoFK = videojuegos.idVideojuegos) INNER JOIN tiendas ON operaciones.idTiendaFK = tiendas.idTiendas) WHERE IdVideojuegoFK='$sID';
$sql = "SELECT operaciones.idOperacion, tiendas.Nombre, videojuegos.Titulo, operaciones.Unidades, operaciones.Tipo FROM ((operaciones INNER JOIN videojuegos ON operaciones.idVideojuegoFK = videojuegos.idVideojuegos) INNER JOIN tiendas ON operaciones.idTiendaFK = tiendas.idTiendas) WHERE IdVideojuegoFK=$sID";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$respuesta="<?xml version='1.0' encoding='UTF-8'?><operaciones>";
while($fila=mysql_fetch_assoc($resultados)){
    $respuesta.="<operacion>";
        $respuesta.="<idOperacion>".$fila['idOperacion']."</idOperacion>";
        $respuesta.="<nombre>".$fila['Nombre']."</nombre>";
        $respuesta.="<titulo>".$fila['Titulo']."</titulo>";

        if ($fila['Tipo'] == "C") {
          $respuesta.="<tipo>Compra</tipo>";
        }
        else{
          $respuesta.="<tipo>Venta</tipo>";
        }

        $respuesta.="<unidades>".$fila['Unidades']."</unidades>";
    $respuesta.="</operacion>";
}
$respuesta.="</operaciones>";

echo $respuesta;

mysql_close($conexion);

?>
