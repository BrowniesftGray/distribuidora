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

    //Objeto body
  var eBody = document.getElementById("divfrmListadoExistencia");

  //Elementos table y tbdoy
  var eTabla = document.createElement("table");
  var eTbody = document.createElement("tbody");

  //La fila y cabecera inicial
  for (var i = 0; i < 1; i++) {
    //Elemento tr
    var eFila = document.createElement("tr");

    for (var j = 0; j < 1; j++) {
      //Elemento th y nodo de texto con la info
      var eTitulo = document.createElement("th");
      var sTexto = document.createTextNode("idExistencia");
      var eTitulo1 = document.createElement("th");
      var sTexto1 = document.createTextNode("Nombre");
      var eTitulo2 = document.createElement("th");
      var sTexto2 = document.createTextNode("Titulo");
      var eTitulo3 = document.createElement("th");
      var sTexto3 = document.createTextNode("Stock");
      eTitulo.appendChild(sTexto);
      eFila.appendChild(eTitulo);
      eTitulo1.appendChild(sTexto1);
      eFila.appendChild(eTitulo1);
      eTitulo2.appendChild(sTexto2);
      eFila.appendChild(eTitulo2);
      eTitulo3.appendChild(sTexto3);
      eFila.appendChild(eTitulo3);
    }

    //Añadimos la primera fila al tbody
    eTbody.appendChild(eFila);
  }

  //Filas restantes y celdas de cada una
  $(oXML).find('existencia').each(function(){

    var $desarrolladora = $(this);
    var id = $desarrolladora.find('idExistencia').text();
    var nombre = $desarrolladora.find('nombre').text();
    var pais = $desarrolladora.find('titulo').text();
    var direccion = $desarrolladora.find('stock').text();
    //Elemento tr

    var eFila = document.createElement("tr");

    var eTitulo = document.createElement("td");
    var sTexto = document.createTextNode(id);
    var eTitulo1 = document.createElement("td");
    var sTexto1 = document.createTextNode(nombre);
    var eTitulo2 = document.createElement("td");
    var sTexto2 = document.createTextNode(pais);
    var eTitulo3 = document.createElement("td");
    var sTexto3 = document.createTextNode(direccion);
    eTitulo.appendChild(sTexto);
    eFila.appendChild(eTitulo);
    eTitulo1.appendChild(sTexto1);
    eFila.appendChild(eTitulo1);
    eTitulo2.appendChild(sTexto2);
    eFila.appendChild(eTitulo2);
    eTitulo3.appendChild(sTexto3);
    eFila.appendChild(eTitulo3);
    eTbody.appendChild(eFila);
  });


  //Añadimos el tbody al final debajo del elemento table
  eTabla.appendChild(eTbody);

  //Añadimos la tabla al body
  eBody.appendChild(eTabla);

  //Añadimos los atributos necesarios a la tabla, como el borde.
  eTabla.setAttribute("class", "table table-striped table-bordered");
  eTabla.setAttribute("id", "listado");

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
