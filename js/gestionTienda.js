$("#divfrmGestionTienda").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmGestionTienda")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"750px",
    modal: "yes",
    resizable:true,
    buttons: [{
        text: "Añadir",
        click: procesoAltaTienda
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


function procesoAltaTienda(){

	if (validarAltaTienda()){

		llamadaAjaxAltaTienda();
	}

}

// Validacion
function validarAltaTienda(){

	var sError="";
	var bValido = true;

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{5,45}$/
  if(expreTitulo.test(frmGestionTienda.txtNombre.value) == false){
    bValido = false;
    sError+= "Campo Nombre requiere de 5 letras mínimo y tiene un máximo de 50. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{5,45}$/
  if(expreTitulo.test(frmGestionTienda.txtPais.value) == false){
    bValido = false;
    sError+= "Campo pais requiere de 5 letras mínimo y tiene un máximo de 45. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{5,45}$/
  if(expreTitulo.test(frmGestionTienda.txtProvincia.value) == false){
    bValido = false;
    sError+= "Campo Provincia requiere de 5 letras mínimo y tiene un máximo de 45. ";
  }

  var expreTitulo = /^[a-zA-z\s\ñ\Ñ]{5,45}$/
  if(expreTitulo.test(frmGestionTienda.txtDireccion.value) == false){
    bValido = false;
    sError+= "Campo direccion requiere de 5 letras mínimo y tiene un máximo de 45. ";
  }

	if(bValido == false){
		$("#divMensajes").dialog("open");
$("#divMensajes").dialog("option","title","Error");
$("#pMensaje").text(sError); // A sustituir por el uso de un dialogo de mensajes
	}

	return bValido;
}

// Llamada ajax y tratamiento respuesta
function llamadaAjaxAltaTienda(){
  // $.ajax(url, opciones)
	$.ajax({ url : "php/altaTienda.php",
			 data: $("#frmGestionTienda").serialize(),
			 async: true, // Valor por defecto
			 dataType :'json',
			 method: "POST",
			 cache: false, // ya por defecto es false para POST
			 success: respuestaAltaTienda,
			 error :respuestaAltaTienda
			 });
}

function respuestaAltaTienda(oArrayRespuesta){


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
