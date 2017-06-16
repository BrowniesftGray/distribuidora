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

$oOperacion = json_decode($datos);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

$resultado = mysql_query("SELECT stock FROM existencias WHERE idTiendaFK='$oOperacion->idTiendaFK' AND idVideojuegoFK='$oOperacion->idVideojuegoFK'", $conexion);
$numero_filas = mysql_num_rows($resultado);

if ($numero_filas > 0) {
  while ($fila = mysql_fetch_array($resultado, MYSQL_ASSOC)) {
      $stockActual = $fila["stock"];
  }

    $mensaje='INSERTADO CON EXITO';
    $error = false;

    $sql = "insert into operaciones (idTiendaFK, idVideojuegoFK, Unidades, Tipo) values ('$oOperacion->idTiendaFK','$oOperacion->idVideojuegoFK','$oOperacion->Unidades','C')";

    $resultados = @mysql_query($sql, $conexion) or die(mysql_error());

    $StockFinal = $stockActual + $oOperacion->Unidades;
    $sql = "UPDATE existencias SET stock='$StockFinal' WHERE idTiendaFK='$oOperacion->idTiendaFK' AND idVideojuegoFK='$oOperacion->idVideojuegoFK'";

    $resultados = @mysql_query($sql, $conexion) or die(mysql_error());
}
else{
  $mensaje="No hay existencias del producto en la tienda seleccionada.";
  $error=true;
}
//Falta una sentencia SQL para comprobar que el número de stock es superior o igual a la cantidad de unidades vendidas.
//Idea: método que compruebe que hay más y si lo hay realice la venta correctamente.
//Idea: Hacer un select del stock al sacar el formulario y a la hora de la validación comprobarlo.


$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysql_close($conexion);

?>
