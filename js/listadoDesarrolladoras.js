$("#divfrmListadoDesarrolladora").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmListadoDesarrolladora")[0].reset();
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
        var sURL = encodeURI("php/listadoDesarrolladoras.php?");

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

    var jqTabla = $('<table id="listado" class="table table-striped table-bordered">');

    var oDesarrolladoras = oXML.getElementsByTagName("desarrolladora");
    $('<tr><th>idDesarrolladora</th><th>Nombre</th><th>Pais</th><th>Direccion</th></tr>').appendTo(jqTabla);
    for(var i=0;i<oDesarrolladoras.length;i++){
        $('<tr>' +
            '<td>'+oDesarrolladoras[i].getElementsByTagName('idDesarrolladora')[0].textContent+'</td>' +
            '<td>'+oDesarrolladoras[i].getElementsByTagName('nombre')[0].textContent+'</td>' +
            '<td>'+oDesarrolladoras[i].getElementsByTagName('pais')[0].textContent+'</td>' +
            '<td>'+oDesarrolladoras[i].getElementsByTagName('direccion')[0].textContent+'</td>' +
           '</tr>').appendTo(jqTabla);
    }

    jqTabla.appendTo("#divfrmListadoDesarrolladora");

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
