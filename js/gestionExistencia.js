$("#divfrmGestionExistencia").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmGestionExistencia")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Añadir",
        click: procesoAltaExistencia
    },/*{
        text: "Modificar",
        click: procesoModVideojuego
    },*/{
        text: "Cancelar",
        click: function() {
                 $(this).dialog("close");
             }
    }]
});

cargaTiendas();
cargaVideojuegos();

// Cargar listbox de tiendas
function cargaTiendas(){
	var oArrayTiendas = null;

		$.get('php/getTiendas.php',null,tratarCargaTiendas,'json');
}

function tratarCargaTiendas(oArrayTiendas, sStatus, oXHR){

		rellenaComboTienda(oArrayTiendas);

}

function rellenaComboTienda(oArrayTiendas){
		$("#lstTienda").empty();

		$.each(oArrayTiendas, function( i , elemento){

			$('<option value="' + elemento.idTiendas + '" >' +  elemento.Nombre + '</option>').appendTo("#lstTiendaEx");

		});

}

// Cargar listbox de videojuegos
function cargaVideojuegos(){
	var oArrayVideojuegos = null;

	// Existe en almacenamiento local
	if(localStorage["videojuegos"] != null){
		oArrayVideojuegos = JSON.parse(localStorage["videojuegos"]);

		rellenaCombo(oArrayVideojuegos);


	} else {

		$.get('php/getVideojuegos.php',null,tratarCargaVideojuegos,'json');
	}
}

function tratarCargaVideojuegos(oArrayVideojuegos, sStatus, oXHR){

		rellenaCombo(oArrayVideojuegos);

		// Guardar en localStorage
		localStorage["videojuegos"] = JSON.stringify(oArrayVideojuegos);
}

function rellenaCombo(oArrayVideojuegos){
		$("#lstVideojuegoEx").empty();

		$.each(oArrayVideojuegos, function( i , elemento){

			$('<option value="' + elemento.idVideojuegos + '" >' +  elemento.Titulo + '</option>').appendTo("#lstVideojuegoEx");

		});

}

function procesoAltaExistencia(){

	if (validarAltaExistencia()){

		llamadaAjaxAltaExistencia();
	}

}

// Validacion
function validarAltaExistencia(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[1-9][0-9]{1,}$/;
  if(expreTitulo.test(frmGestionExistencia.txtStock.value) == false){
    bValido = false;
    sError+= "Campo Stock requiere de un mínimo de 1. ";
  }

	if(bValido == false){
		$("#divMensajes").dialog("open");
$("#divMensajes").dialog("option","title","Error");
$("#pMensaje").text(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxAltaExistencia(){


	//Creo un objeto literal Cita
	var oExistencia = {
           idTiendaFK : frmGestionExistencia.lstTiendaEx.value,
           idVideojuegoFK : frmGestionExistencia.lstVideojuegoEx.value,
				   Stock : frmGestionExistencia.txtStock.value
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oExistencia);

	// Script de envio
	var sURL = encodeURI("php/altaExistencia.php");

	AjaxExistencia(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxExistencia(sURL,sParametroPOST){
	oAjaxAltaExistencia = objetoXHR();

	oAjaxAltaExistencia.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxAltaExistencia.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxAltaExistencia.onreadystatechange = respuestaAltaExistencia;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

	oAjaxAltaExistencia.send(sParametroPOST);

}

function respuestaAltaExistencia(){

	if(oAjaxAltaExistencia.readyState == 4 && oAjaxAltaExistencia.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaExistencia.responseText);

    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divfrmBajaMedico').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }
	}
}

function objetoXHR() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            var versionesIE = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
            for (var i = 0; i < versionesIE.length; i++) {
                try {
                    return new ActiveXObject(versionesIE[i]);
                } catch (errorControlado) {} //Capturamos el error,
            }
        }
        throw new Error("No se pudo crear el objeto XMLHttpRequest");
}
