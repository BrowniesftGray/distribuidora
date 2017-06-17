$("#divfrmVenta").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmVenta")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Añadir",
        click: procesoAltaVenta
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

	// Existe en almacenamiento local
	if(localStorage["tiendas"] != null){
		oArrayTiendas = JSON.parse(localStorage["tiendas"]);

		 rellenaComboTienda(oArrayTiendas);


	} else {

		$.get('php/getTiendas.php',null,tratarCargaTiendas,'json');
	}
}

function tratarCargaTiendas(oArrayTiendas, sStatus, oXHR){

		rellenaComboTienda(oArrayTiendas);

		// Guardar en localStorage
		localStorage["tiendas"] = JSON.stringify(oArrayTiendas);
}

function rellenaComboTienda(oArrayTiendas){
		$("#lstTiendaV").empty();

		$.each(oArrayTiendas, function( i , elemento){

			$('<option value="' + elemento.idTiendas + '" >' +  elemento.Nombre + '</option>').appendTo("#lstTiendaV");

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
		$("#lstVideojuegoV").empty();

		$.each(oArrayVideojuegos, function( i , elemento){

			$('<option value="' + elemento.idVideojuegos + '" >' +  elemento.Titulo + '</option>').appendTo("#lstVideojuegoV");

		});

}

function procesoAltaVenta(){

	if (validarAltaVenta()){

		llamadaAjaxAltaVenta();
	}

}

// Validacion
function validarAltaVenta(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[0-9]{1,}$/;
  if(expreTitulo.test(frmVenta.txtUnidades.value) == false){
    bValido = false;
    sError+= "Campo Unidades requiere de un precio mínimo de 1. ";
  }

	if(bValido == false){
		alert(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxAltaVenta(){


	//Creo un objeto literal Cita
	var oVenta = {
           idTiendaFK : frmVenta.lstTiendaV.value,
           idVideojuegoFK : frmVenta.lstVideojuegoV.value,
				   Unidades : frmVenta.txtUnidades.value.trim()
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oVenta);

	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);

	// Script de envio
	var sURL = encodeURI("php/operacionVenta.php");

	AjaxVenta(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxVenta(sURL,sParametroPOST){

	oAjaxAltaVenta = objetoXHR();

	oAjaxAltaVenta.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxAltaVenta.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxAltaVenta.onreadystatechange = respuestaAltaVenta;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

	oAjaxAltaVenta.send(sParametroPOST);
}

function respuestaAltaVenta(){

	if(oAjaxAltaVenta.readyState == 4 && oAjaxAltaVenta.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaVenta.responseText);

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
