//@ sourceURL=altaCita.js

$("#divfrmListadoOperacion").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmListadoOperacion")[0].reset();
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

cargaVideojuegos();

// Cargar listbox de videojuegos
function cargaVideojuegos(){
	var oArrayVideojuegos = null;

	// Existe en almacenamiento local
	if(localStorage["videojuegos"] != null){
		oArrayVideojuegos = JSON.parse(localStorage["videojuegos"]);

		rellenaCombo(oArrayVideojuegos);


	} else {

		$.get('php/getVideojuegos.php',null,tratarCargaVideojuegos,'json');
	}
}

function tratarCargaVideojuegos(oArrayVideojuegos, sStatus, oXHR){

		rellenaCombo(oArrayVideojuegos);

		// Guardar en localStorage
		localStorage["videojuegos"] = JSON.stringify(oArrayVideojuegos);
}

function rellenaCombo(oArrayVideojuegos){
		$("#sID2").empty();

		$.each(oArrayVideojuegos, function( i , elemento){

			$('<option value="' + elemento.idVideojuegos + '" >' +  elemento.Titulo + '</option>').appendTo("#sID2");

		});

}

/* VARIABLES PARA AJAX */
var oAjaxListado = null;

function procesoListado(){
  var sID = frmListadoOperacion.sID.value;
  var sParametrosGET = encodeURI("sID="+sID);
  var sURL = encodeURI("php/listadoOperaciones.php?");

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

    var oOperaciones = oXML.getElementsByTagName("operacion");
    $('<tr><th>idOperacion</th><th>Tienda</th><th>Juego</th><th>Unidades</th><th>Tipo de Operacion</th></tr>').appendTo(jqTabla);
    for(var i=0;i<oOperaciones.length;i++){
        $('<tr>' +
            '<td>'+oOperaciones[i].getElementsByTagName('idOperacion')[0].text()+'</td>' +
            '<td>'+oOperaciones[i].getElementsByTagName('nombre')[0].text()+'</td>' +
            '<td>'+oOperaciones[i].getElementsByTagName('titulo')[0].text()+'</td>' +
            '<td>'+oOperaciones[i].getElementsByTagName('unidades')[0].text()+'</td>' +
            '<td>'+oOperaciones[i].getElementsByTagName('tipo')[0].text()+'</td>' +
           '</tr>').appendTo(jqTabla);
    }

    jqTabla.appendTo("#divfrmListadoOperacion");

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
