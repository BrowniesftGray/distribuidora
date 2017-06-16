$("#divfrmModVideojuego").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmModVideojuego")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Modificar",
        click: procesoModVideojuego
    },{
        text: "Cancelar",
        click: function() {
                 $(this).dialog("close");
             }
    }]
});

cargarPlataformas();
cargarDesarrolladoras();

// Cargar listbox de plataformas
function cargarPlataformas(){
	var oArrayPlataformas = null;

	// Existe en almacenamiento local
	if(localStorage["plataformas"] != null){
		oArrayPlataformas = JSON.parse(localStorage["plataformas"]);

		rellenaCombo(oArrayPlataformas);


	} else {

		$.get('php/getPlataformas.php',null,tratarCargaPlataformas,'json');
	}
}

function tratarCargaPlataformas(oArrayPlataformas, sStatus, oXHR){

		rellenaCombo(oArrayPlataformas);

		// Guardar en localStorage
		localStorage["plataformas"] = JSON.stringify(oArrayPlataformas);
}

function rellenaCombo(oArrayPlataformas){
		$("#lstPlataformaM").empty();

		$.each(oArrayPlataformas, function( i , elemento){

			$('<option value="' + elemento.plataforma + '" >' +  elemento.plataforma + '</option>').appendTo("#lstPlataformaM");

		});

}

// Cargar listbox de desarrolladoras
function cargarDesarrolladoras(){
	var oArrayDesarrolladoras = null;

	// Existe en almacenamiento local
	if(localStorage["desarrolladoras"] != null){
		oArrayDesarrolladoras = JSON.parse(localStorage["desarrolladoras"]);

		rellenaCombo2(oArrayDesarrolladoras);


	} else {

		$.get('php/getDesarrolladoras.php',null,tratarCargaDesarrolladoras,'json');
	}
}

function tratarCargaDesarrolladoras(oArrayDesarrolladoras, sStatus, oXHR){

		rellenaCombo2(oArrayDesarrolladoras);

		// Guardar en localStorage
		localStorage["desarrolladoras"] = JSON.stringify(oArrayDesarrolladoras);
}

function rellenaCombo2(oArrayDesarrolladoras){
		$("#lstDesarrolladoraM").empty();

		$.each(oArrayDesarrolladoras, function( i , elemento){

			$('<option value="' + elemento.idDesarrolladoras + '" >' +  elemento.Nombre + '</option>').appendTo("#lstDesarrolladoraM");

		});

}

function procesoModVideojuego(){

	if (validarModVideojuego()){

		llamadaAjaxModVideojuego();
	}

}

// Validacion
function validarModVideojuego(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[0-9a-zA-Z\s\ñ\Ñ]{5,50}$/;
  if(expreTitulo.test(frmModVideojuego.txtTitulo.value) == false){
    bValido = false;
    sError+= "Campo Título requiere de 5 letras mínimo y tiene un máximo de 50. ";
  }

  var expreTitulo = /^[1-9][0-9]{1,}$/;
  if(expreTitulo.test(frmModVideojuego.txtPrecio.value) == false){
    bValido = false;
    sError+= "Campo Precio requiere de un precio mínimo de 1. ";
  }
	if(frmModVideojuego.txtFechaSalida.value.length == 0){
		sError+= "Campos fecha debe estar relleno";
		bValido = false;
	}

	if(bValido == false){
		alert(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxModVideojuego(){

	//Creo un objeto literal Videojuego
	var oVideojuego = {
           idVideojuego : frmModVideojuego.lstIdVideojuegoM.value,
           idDesarrolladoraFK : frmModVideojuego.lstDesarrolladoraM.value,
           Titulo : frmModVideojuego.txtTitulo.value,
           Plataforma : frmModVideojuego.lstPlataformaM.value ,
				   FechaSalida : frmModVideojuego.txtFechaSalida.value,
				   Precio : frmModVideojuego.txtPrecio.value.trim()
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oVideojuego);

	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);

	// Script de envio
	var sURL = encodeURI("php/altaVideojuego.php");

	AjaxVideojuego(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxVideojuego(sURL,sParametroPOST){

	oAjaxModVideojuego = objetoXHR();

	oAjaxModVideojuego.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxModVideojuego.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxModVideojuego.onreadystatechange = respuestaModVideojuego;
//	oAjaxModProp.addEventListener("readystatechange",respuestaModProp,false);

	oAjaxModVideojuego.send(sParametroPOST);
}

function respuestaModVideojuego(){

	if(oAjaxModVideojuego.readyState == 4 && oAjaxModVideojuego.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxModVideojuego.responseText);

		if (oArrayRespuesta[0] == true){
			alert(oArrayRespuesta[1]);

		}
    else {
			alert(oArrayRespuesta[1]);
			$("#divfrmModVideojuego").dialog("close");

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
