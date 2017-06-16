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

    if(oAjaxListado.readyState == 4 && oAjaxListado.status ==200)	{
        //Recojo el documento XML en variable global
        var oXML = oAjaxListado.responseXML;
        procesaXML(oXML);
    }

}

function procesaXML(oXML){

    //borrar tabla si habia
    $("#listado").remove();

    var jqTabla = $('<table id="listado" border="1">');


    var oVideojuegos = oXML.getElementsByTagName("pacientes");
    $('<tr><th>idVideojuego</th><th>dni</th><th>Nombre</th><th>Apellidos</th><th>Fecha de Nacimiento</th><th>Dirección</th><th>Localidad</th><th>Provincia</th><th>Sexo</th></tr>').appendTo(jqTabla);
    for(var i=0;i<oVideojuegos.length;i++){
        $('<tr>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('idVideojuego')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('dni')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('nombre')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('apellidos')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('telefono')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('fechaDeNacimiento')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('direccion')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('localidad')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('provincia')[0].textContent+'</td>' +
            '<td>'+oVideojuegos[i].getElementsByTagName('sexo')[0].textContent+'</td>' +
           '</tr>').appendTo(jqTabla);
    }

    jqTabla.appendTo("#divfrmListadoVideojuego");

}
