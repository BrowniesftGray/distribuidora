$("#divfrmGestionDesarrolladora").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmGestionDesarrolladora")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
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
function llamadaAjaxAltaVideojuego(){

	//Creo un objeto literal Videojuego
	var oVideojuego = {
           idDesarrolladoraFK : frmGestionVideojuego.lstDesarrolladora.value,
           Titulo : frmGestionVideojuego.txtTitulo.value,
           Plataforma : frmGestionVideojuego.lstPlataforma.value ,
				   FechaSalida : frmGestionVideojuego.txtFechaSalida.value,
				   Precio : frmGestionVideojuego.txtPrecio.value.trim()
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

	oAjaxAltaVideojuego = objetoXHR();

	oAjaxAltaVideojuego.open("POST",sURL,true);

	// Para peticiones con metodo POST
    oAjaxAltaVideojuego.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	oAjaxAltaVideojuego.onreadystatechange = respuestaAltaVideojuego;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

	oAjaxAltaVideojuego.send(sParametroPOST);
}

function respuestaAltaVideojuego(){

	if(oAjaxAltaVideojuego.readyState == 4 && oAjaxAltaVideojuego.status ==200)	{
		var oArrayRespuesta = JSON.parse(oAjaxAltaVideojuego.responseText);

		if (oArrayRespuesta[0] == true){
			alert(oArrayRespuesta[1]);

		}
    else {
			alert(oArrayRespuesta[1]);
			$("#divfrmGestionVideojuego").dialog("close");

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
