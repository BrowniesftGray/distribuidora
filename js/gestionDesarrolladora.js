$("#divfrmGestionDesarrolladora").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmGestionDesarrolladora")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"750px",
    modal: "yes",
    resizable:true,
    buttons: [{
        text: "Añadir",
        click: procesoAltaDesarrolladora
    },{
        text: "Cancelar",
        click: function() {
                 $(this).dialog("close");
             }
    }]
});

function procesoAltaDesarrolladora(){

	if (validarAltaDesarrolladora()){

		llamadaAjaxAltaDesarrolladora();
	}

}

function validarAltaDesarrolladora(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[0-9a-zA-Z\s\ñ\Ñ]{5,45}$/;
  if(expreTitulo.test(frmGestionDesarrolladora.txtPais.value) == false){
    bValido = false;
    sError+= "Campo Título requiere de 5 letras mínimo y tiene un máximo de 50. ";
  }

  var expreTitulo = /^[0-9a-zA-Z\s\ñ\Ñ]{3,45}$/;
  if(expreTitulo.test(frmGestionDesarrolladora.txtNombre.value) == false){
    bValido = false;
    sError+= "Campo Precio requiere de un precio mínimo de 1. ";
  }

  var expreTitulo = /^[0-9a-zA-Z\s\ñ\Ñ]{5,45}$/;
  if(expreTitulo.test(frmGestionDesarrolladora.txtDireccion.value) == false){
    bValido = false;
    sError+= "Campo Precio requiere de un precio mínimo de 1. ";
  }

	if(bValido == false){
		alert(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxAltaDesarrolladora(){

	//Creo un objeto literal Desarrolladora
	var oDesarrolladora = {
            Nombre : frmGestionDesarrolladora.txtNombre.value,
            Pais : frmGestionDesarrolladora.txtPais.value,
            Direccion : frmGestionDesarrolladora.txtDireccion.value
				 };

	// Formateo de parametro POST
	var sParametroPOST = "datos=" + JSON.stringify(oDesarrolladora);

	// Codifico para envio
	sParametroPOST = encodeURI(sParametroPOST);

	// Script de envio
	var sURL = encodeURI("php/altaDesarrolladora.php");

	AjaxDesarrolladora(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function AjaxDesarrolladora(sURL,sParametroPOST){

	oAjaxAltaDesarrolladora = objetoXHR();

	oAjaxAltaDesarrolladora.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxAltaDesarrolladora.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxAltaDesarrolladora.onreadystatechange = respuestaAltaDesarrolladora;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

	oAjaxAltaDesarrolladora.send(sParametroPOST);
}

function respuestaAltaDesarrolladora(){

	if(oAjaxAltaDesarrolladora.readyState == 4 && oAjaxAltaDesarrolladora.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaDesarrolladora.responseText);

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
