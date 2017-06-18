$(document).ready(function(){

	document.getElementById("mnuAltaVideojuego").addEventListener("click", cargaAltaVideojuego);

	document.getElementById("mnuModVideojuego").addEventListener("click", cargaModVideojuego);

	document.getElementById("mnuListadoVideojuego").addEventListener("click", cargaListadoVideojuego);

	document.getElementById("mnuAltaTienda").addEventListener("click", cargaAltaTienda);

	document.getElementById("mnuModTienda").addEventListener("click", cargaModTienda);

	document.getElementById("mnuListadoTienda").addEventListener("click", cargaListadoTienda);

	document.getElementById("mnuAltaDesarrolladora").addEventListener("click", cargaAltaDesarrolladora);

	document.getElementById("mnuModDesarrolladora").addEventListener("click", cargaModDesarrolladora);

	document.getElementById("mnuListadoDesarrolladora").addEventListener("click", cargaListadoDesarrolladora);

	document.getElementById("mnuAltaExistencia").addEventListener("click", cargaAltaExistencia);

	document.getElementById("mnuListadoExistencia").addEventListener("click", cargaListadoExistencias);

	document.getElementById("mnuVenta").addEventListener("click", cargaAltaVenta);

	document.getElementById("mnuCompra").addEventListener("click", cargaAltaCompra);

	document.getElementById("mnuListadoOperacion").addEventListener("click", cargaListadoOperaciones);

	$("#divMensajes").dialog( {
		autoOpen:false,
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

function cargaModVideojuego(){

	if( $("#frmModVideojuego").size() == 0) {
		$("#formularios").load("formularios/modVideojuego.html",
    function(){
						$("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});
						$.getScript("js/modVideojuego.js")
              }
					);
	}
  else {

		$("#divfrmModVideojuego").dialog("open");

	}
}

function cargaListadoVideojuego(){

	if( $("#frmListadoVideojuego").size() == 0) {
		$("#formularios").load("formularios/listadoVideojuego.html",
    function(){
						$.getScript("js/listadoVideojuegos.js")
              }
					);
	}
  else {

		$("#divfrmListadoVideojuego").dialog("open");

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

function cargaModTienda(){

  if( $("#frmModTienda").size() == 0) {
    $("#formularios").load("formularios/modTienda.html",
    function(){
            $.getScript("js/modTienda.js")
              }
          );
  }
  else {

    $("#divfrmModTienda").dialog("open");

  }
}

function cargaListadoTienda(){

	if( $("#frmListadoTienda").size() == 0) {
		$("#formularios").load("formularios/listadoTiendas.html",
    function(){
						$.getScript("js/listadoTiendas.js")
              }
					);
	}
  else {

		$("#divfrmListadoTienda").dialog("open");

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

function cargaModDesarrolladora(){

  if( $("#frmModDesarrolladora").size() == 0) {
    $("#formularios").load("formularios/modDesarrolladora.html",
    function(){
            $.getScript("js/modDesarrolladora.js")
              }
          );
  }
  else {

    $("#divfrmModDesarrolladora").dialog("open");

  }
}

function cargaListadoDesarrolladora(){

	if( $("#frmListadoDesarrolladora").size() == 0) {
		$("#formularios").load("formularios/listadoDesarrolladoras.html",
    function(){
						$.getScript("js/listadoDesarrolladoras.js")
              }
					);
	}
  else {

		$("#divfrmListadoDesarrolladora").dialog("open");

	}
}

function cargaListadoOperaciones(){

	if( $("#frmListadoOperacion").size() == 0) {
		$("#formularios").load("formularios/listadoOperaciones.html",
    function(){
						$.getScript("js/listadoOperaciones.js")
              }
					);
	}
  else {

		$("#divfrmListadoOperacion").dialog("open");

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

function cargaListadoExistencias(){

	if( $("#frmListadoExistencia").size() == 0) {
		$("#formularios").load("formularios/listadoExistencias.html",
    function(){
						$.getScript("js/listadoExistencias.js")
              }
					);
	}
  else {

		$("#divfrmListadoExistencia").dialog("open");

	}
}
