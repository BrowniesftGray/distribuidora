$("#divfrmCompra").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmCompra")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Añadir",
        click: procesoAltaCompra
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
		$("#lstTiendaC").empty();

		$.each(oArrayTiendas, function( i , elemento){

			$('<option value="' + elemento.idTiendas + '" >' +  elemento.Nombre + '</option>').appendTo("#lstTiendaC");

		});

}

// Cargar listbox de videojuegos
function cargaVideojuegos(){
	var oArrayVideojuegos = null;

	// Existe en almacenamiento local
	if(localStorage["videojuegos"] != null){
		oArrayVideojuegos = JSON.parse(localStorage["videojuegos"]);

		rellenaCombo2(oArrayVideojuegos);


	} else {

		$.get('php/getVideojuegos.php',null,tratarCargaVideojuegos,'json');
	}
}

function tratarCargaVideojuegos(oArrayVideojuegos, sStatus, oXHR){

		rellenaCombo2(oArrayVideojuegos);

		// Guardar en localStorage
		localStorage["videojuegos"] = JSON.stringify(oArrayVideojuegos);
}

function rellenaCombo2(oArrayVideojuegos){
		$("#lstVideojuegoC").empty();

		$.each(oArrayVideojuegos, function( i , elemento){

			$('<option value="' + elemento.idVideojuegos + '" >' +  elemento.Titulo + '</option>').appendTo("#lstVideojuegoC");

		});

}

function procesoAltaCompra(){

	if (validarAltaCompra()){

		llamadaAjaxAltaCompra();
	}

}

// Validacion
function validarAltaCompra(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[0-9]{1,}$/;
  if(expreTitulo.test(frmCompra.txtUnidades.value) == false){
    bValido = false;
    sError+= "Campo Unidades requiere de un precio mínimo de 1. ";
  }

	if(bValido == false){
		alert(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxAltaCompra(){


	//Creo un objeto literal Cita
	var oCompra = {
           idTiendaFK : frmCompra.lstTiendaC.value,
           idVideojuegoFK : frmCompra.lstVideojuegoC.value,
				   Unidades : frmCompra.txtUnidades.value.trim()
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oCompra);

	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);

	// Script de envio
	var sURL = encodeURI("php/operacionCompra.php");

	AjaxCompra(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxCompra(sURL,sParametroPOST){

	oAjaxAltaCompra = objetoXHR();

	oAjaxAltaCompra.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxAltaCompra.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxAltaCompra.onreadystatechange = respuestaAltaCompra;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

	oAjaxAltaCompra.send(sParametroPOST);
}

function respuestaAltaCompra(){

	if(oAjaxAltaCompra.readyState == 4 && oAjaxAltaCompra.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaCompra.responseText);

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
