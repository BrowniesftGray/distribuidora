//@ sourceURL=altaCita.js

$("#divfrmListadoExistencia").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmListadoExistencia")[0].reset();
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
		$("#sID").empty();

		$.each(oArrayTiendas, function( i , elemento){

			$('<option value="' + elemento.idTiendas + '" >' +  elemento.Nombre + '</option>').appendTo("#sID");

		});

}

/* VARIABLES PARA AJAX */
var oAjaxListado = null;

function procesoListado(){
  var sID = frmListadoExistencia.sID.value;
  var sParametrosGET = encodeURI("sID="+sID);
  var sURL = encodeURI("php/listadoExistencias.php?");

  llamadaAjaxListado(sURL, sParametrosGET);
}


function llamadaAjaxListado(sURL, sParametrosGET){

    oAjaxListado = objetoXHR();

    oAjaxListado.open("GET",sURL+sParametrosGET,true);

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

    var oExistencias = oXML.getElementsByTagName("existencia");
    $('<tr><th>idExistencia</th><th>Tienda</th><th>Juego</th><th>Stock</th></tr>').appendTo(jqTabla);
    for(var i=0;i<oExistencias.length;i++){
        $('<tr>' +
            '<td>'+oExistencias[i].getElementsByTagName('idExistencia')[0].textContent+'</td>' +
            '<td>'+oExistencias[i].getElementsByTagName('nombre')[0].textContent+'</td>' +
            '<td>'+oExistencias[i].getElementsByTagName('titulo')[0].textContent+'</td>' +
            '<td>'+oExistencias[i].getElementsByTagName('stock')[0].textContent+'</td>' +
           '</tr>').appendTo(jqTabla);
    }

    jqTabla.appendTo("#divfrmListadoExistencia");

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
