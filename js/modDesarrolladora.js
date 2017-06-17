$("#divfrmModDesarrolladora").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmModDesarrolladora")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Modificar",
        click: procesoModDesarrolladora
    },{
        text: "Cancelar",
        click: function() {
                 $(this).dialog("close");
             }
    }]
});

cargarDesarrolladoras();

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
		$("#lstDesarrolladoraD").empty();

		$.each(oArrayDesarrolladoras, function( i , elemento){

			$('<option value="' + elemento.idDesarrolladoras + '" >' +  elemento.Nombre + '</option>').appendTo("#lstDesarrolladoraD");

		});

}

function procesoModDesarrolladora(){

	if (validarModDesarrolladora()){

		llamadaAjaxModDesarrolladora();
	}

}

function validarModDesarrolladora(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[0-9a-zA-Z\s\ñ\Ñ]{5,50}$/;
  if(expreTitulo.test(frmModDesarrolladora.txtPais.value) == false){
    bValido = false;
    sError+= "Campo Título requiere de 5 letras mínimo y tiene un máximo de 50. ";
  }

  var expreTitulo = /^[0-9a-zA-Z\s\ñ\Ñ]{3,50}$/;
  if(expreTitulo.test(frmModDesarrolladora.txtNombre.value) == false){
    bValido = false;
    sError+= "Campo Precio requiere de un precio mínimo de 1. ";
  }

  var expreTitulo = /^[0-9a-zA-Z\s\ñ\Ñ]{5,50}$/;
  if(expreTitulo.test(frmModDesarrolladora.txtDireccion.value) == false){
    bValido = false;
    sError+= "Campo Precio requiere de un precio mínimo de 1. ";
  }

	if(bValido == false){
		alert(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxModDesarrolladora(){
	//Creo un objeto literal Desarrolladora
	var oDesarrolladora = {
           idDesarrolladoras : frmModDesarrolladora.lstDesarrolladoraD.value,
           Nombre : frmModDesarrolladora.txtNombre.value,
           Pais : frmModDesarrolladora.txtPais.value,
           Direccion : frmModDesarrolladora.txtDireccion.value
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oDesarrolladora);

	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);

	// Script de envio
	var sURL = encodeURI("php/ModDesarrolladora.php");

	AjaxDesarrolladora(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxDesarrolladora(sURL,sParametroPOST){

	oAjaxModDesarrolladora = objetoXHR();

	oAjaxModDesarrolladora.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxModDesarrolladora.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxModDesarrolladora.onreadystatechange = respuestaModDesarrolladora;
//	oAjaxModProp.addEventListener("readystatechange",respuestaModProp,false);

	oAjaxModDesarrolladora.send(sParametroPOST);
}

function respuestaModDesarrolladora(){

	if(oAjaxModDesarrolladora.readyState == 4 && oAjaxModDesarrolladora.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxModDesarrolladora.responseText);

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
