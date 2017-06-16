$("#divfrmListadoVideojuego").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmListadoVideojuego")[0].reset();
        //borrar la tabla si existe
        $("#listado").remove();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    resizable:true,
    buttons: [{
        text: "Pedir listado",
        click: procesoListado
    }, {
        text: "Aceptar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

/* VARIABLES PARA AJAX */
var oAjaxListado = null;

function procesoListado(){
        var sURL = encodeURI("php/listadoVideojuego.php?");

        llamadaAjaxListado(sURL);
}


function llamadaAjaxListado(sURL){

    oAjaxListado = objetoXHR();

    oAjaxListado.open("GET",sURL,true);

    oAjaxListado.onreadystatechange = respuestaListado;

    oAjaxListado.send(null);
}


function respuestaListado(){

  //borrar tabla si habia
  $("#listado").remove();

  var jqTabla = oAjaxListado();

  jqTabla.appendTo("#divfrmListadoVideojuego");

}
