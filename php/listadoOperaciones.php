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


$sql = "SELECT * FROM operaciones WHERE IdVideojuegoFK='$sID'";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$respuesta="<?xml version='1.0' encoding='UTF-8'?><operaciones>";
while($fila=mysql_fetch_assoc($resultados)){
    $respuesta.="<operacion>";
        $respuesta.="<idOperacion>".$fila['idOperacion']."</idOperacion>";
        $respuesta.="<idTienda>".$fila['idTiendaFK']."</idTienda>";
        $respuesta.="<idVideojuego>".$fila['idVideojuegoFK']."</idVideojuego>";

        if ($fila['Unidades'] == "C") {
          $respuesta.="<unidades>Compra</unidades>";
        }
        else{
          $respuesta.="<unidades>Venta</unidades>";
        }

        $respuesta.="<tipo>".$fila['Tipo']."</tipo>";
    $respuesta.="</operacion>";
}
$respuesta.="</operaciones>";
echo $respuesta;

mysql_close($conexion);

?>
