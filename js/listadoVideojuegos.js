$("#divfrmListadoVideojuego").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmListadoVideojuego")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Pedir listado",
        click: procesoListado
    }]
});


/* VARIABLES PARA AJAX */
var oAjaxListado = null;

function inicializa_xhr() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function procesoListado(){
  var sURL = encodeURI("php/listadoVideojuegos.php?");

  llamadaAjaxListado(sURL);
}


function llamadaAjaxListado(sURL){

    oAjaxListado = inicializa_xhr();

    oAjaxListado.open("GET",sURL,true);

    oAjaxListado.onreadystatechange = respuestaListado;

    oAjaxListado.send(null);
}


function respuestaListado(){
  $("#listado").remove();
  // TERCERO: procesar respuesta cuando llega
	if (oAjaxListado.readyState == 4 && oAjaxListado.status == 200){
     var jqTabla = oAjaxListado.responseText;
		   $("#divfrmListadoVideojuego").append(jqTabla);
	}

}
