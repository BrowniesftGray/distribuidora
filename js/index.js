$(document).ready(function(){

	$("#menu").menu();

	$("#mnuAltaVideojuego").click(cargaAltaVideojuego);


  $("#mnuAltaTienda").click(cargaAltaTienda);

  $("#mnuAltaDesarrolladora").click(cargaAltaDesarrolladora);

  $("#mnuAltaExistencia").click(cargaAltaExistencia);

	$("#mnuVenta").click(cargaAltaVenta);

	$("#mnuCompra").click(cargaAltaCompra);

	$("#divMensajes").dialog( {
		autoOpen:false,
		modal:true
	});

	$("#listado").dialog( {
		autoOpen:false,
		width:"auto",
		height: "auto",
		modal:true
	});

});

function cargaAltaVideojuego(){

	if( $("#frmGestionVideojuego").size() == 0) {
		$("#formularios").load("formularios/gestionVideojuego.html",
    function(){
						$("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});
						$.getScript("js/gestionVideojuego.js")
              }
					);
	}
  else {

		$("#divfrmGestionVideojuego").dialog("open");

	}
}

function cargaAltaCompra(){

  if( $("#frmCompra").size() == 0) {
    $("#formularios").load("formularios/compra.html",
    function(){
            $.getScript("js/gestionCompra.js")
              }
          );
  }
  else {

    $("#divfrmCompra").dialog("open");

  }
}

function cargaAltaVenta(){

  if( $("#frmVenta").size() == 0) {
    $("#formularios").load("formularios/venta.html",
    function(){
            $.getScript("js/gestionVenta.js")
              }
          );
  }
  else {

    $("#divfrmVenta").dialog("open");

  }
}

function cargaAltaTienda(){

  if( $("#frmGestionTienda").size() == 0) {
    $("#formularios").load("formularios/gestionTienda.html",
    function(){
            $.getScript("js/gestionTienda.js")
              }
          );
  }
  else {

    $("#divfrmGestionTienda").dialog("open");

  }
}

function cargaAltaDesarrolladora(){

  if( $("#frmGestionDesarrolladora").size() == 0) {
    $("#formularios").load("formularios/gestionDesarrolladora.html",
    function(){
            $.getScript("js/gestionDesarrolladora.js")
              }
          );
  }
  else {

    $("#divfrmGestionDesarrolladora").dialog("open");

  }
}

function cargaAltaExistencia(){

  if( $("#frmGestionExistencia").size() == 0) {
    $("#formularios").load("formularios/gestionExistencia.html",
    function(){
            $.getScript("js/gestionExistencia.js")
              }
          );
  }
  else {

    $("#divfrmGestionExistencia").dialog("open");

  }
}
