$("#divfrmModTienda").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmModTienda")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Modificar",
        click: procesoModTienda
    },/*{
        text: "Modificar",
        click: procesoModPaciente
    },*/{
        text: "Cancelar",
        click: function() {
                 $(this).dialog("close");
             }
    }]
});

cargaTiendas();

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
		$("#lstTiendaT").empty();

		$.each(oArrayTiendas, function( i , elemento){

			$('<option value="' + elemento.idTiendas + '" >' +  elemento.Nombre + '</option>').appendTo("#lstTiendaT");

		});

}

function procesoModTienda(){

	if (validarModTienda()){

		llamadaAjaxModTienda();
	}

}

// Validacion
function validarModTienda(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmModTienda.txtNombre.value) == false){
    bValido = false;
    alert(frmModTienda.txtNombre.value);
    sError+= "Campo Nombre requiere de 5 letras mínimo y tiene un máximo de 50. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmModTienda.txtPais.value) == false){
    bValido = false;
    sError+= "Campo pais requiere de un precio mínimo de 1. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmModTienda.txtProvincia.value) == false){
    bValido = false;
    sError+= "Campo Provincia requiere de un precio mínimo de 1. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{3,50}$/
  if(expreTitulo.test(frmModTienda.txtDireccion.value) == false){
    bValido = false;
    sError+= "Campo direccion requiere de un precio mínimo de 1. ";
  }

	if(bValido == false){
		alert(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxModTienda(){
  alert(frmModTienda.lstTiendaT.value);
	//Creo un objeto literal Tienda
	var oTienda = {
           idTiendas  : frmModTienda.lstTiendaT.value,
           Nombre     : frmModTienda.txtNombre.value,
           Pais       : frmModTienda.txtPais.value,
           Provincia  : frmModTienda.txtProvincia.value ,
				   Direccion  : frmModTienda.txtDireccion.value
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oTienda);

	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);

	// Script de envio
	var sURL = encodeURI("php/ModTienda.php");

	AjaxTienda(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxTienda(sURL,sParametroPOST){

	oAjaxModTienda = objetoXHR();

	oAjaxModTienda.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxModTienda.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxModTienda.onreadystatechange = respuestaModTienda;
//	oAjaxModProp.addEventListener("readystatechange",respuestaModProp,false);

	oAjaxModTienda.send(sParametroPOST);
}

function respuestaModTienda(){

	if(oAjaxModTienda.readyState == 4 && oAjaxModTienda.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxModTienda.responseText);

		if (oArrayRespuesta[0] == true){
			alert(oArrayRespuesta[1]);

		}
    else {
			alert(oArrayRespuesta[1]);
			$("#divfrmModTienda").dialog("close");

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
