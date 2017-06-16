$("#divfrmModDesarrolladora").dialog({
    autoOpen: true,  // Es el valor por defecto
    close: function () {
        $("#frmModDesarrolladora")[0].reset();
    },
    hide: "fold",
    show: "fold",
    height:"auto",
    width:"auto",
    modal: "yes",
    resizable:false,
    buttons: [{
        text: "Modificar",
        click: procesoModPaciente
    },{
        text: "Borrar",
        click: procesoBajaPaciente
    }]
});

cargarDesarrolladoras();

// Cargar listbox de desarrolladoras
function cargarDesarrolladoras(){
	var oArrayDesarrolladoras = null;

	// Existe en almacenamiento local
	if(localStorage["desarrolladoras"] != null){
		oArrayDesarrolladoras = JSON.parse(localStorage["desarrolladoras"]);

		rellenaCombo2(oArrayDesarrolladoras);


	} else {

		$.get('php/getDesarrolladoras.php',null,tratarCargaDesarrolladoras,'json');
	}
}

function tratarCargaDesarrolladoras(oArrayDesarrolladoras, sStatus, oXHR){

		rellenaCombo2(oArrayDesarrolladoras);

		// Guardar en localStorage
		localStorage["desarrolladoras"] = JSON.stringify(oArrayDesarrolladoras);
}

function rellenaCombo2(oArrayDesarrolladoras){
		$("#lstDesarrolladoraD").empty();

		$.each(oArrayDesarrolladoras, function( i , elemento){

			$('<option value="' + elemento.idDesarrolladoras + '" >' +  elemento.Nombre + '</option>').appendTo("#lstDesarrolladoraD");

		});

}
function procesoModPaciente(){
        var sNif = frmModPaciente.txtNIF.value.trim();
        var sNombre = frmModPaciente.txtNombre.value.trim();
        var sApellidos = frmModPaciente.txtApellidos.value.trim();
        var sTelefono = frmModPaciente.txtTelefono.value.trim();
        var dtFecha = frmModPaciente.txtFecha.value.trim();
        var sDireccion = frmModPaciente.txtDireccion.value.trim();
        var sLocalidad = frmModPaciente.txtLocalidad.value.trim();
        var sProvincia = frmModPaciente.txtProvincia.value.trim();
        var sSexo = frmModPaciente.txtSexo.value.trim();

        var oPaciente={
                        dni: sNif,
                        nombre: sNombre,
                        apellidos: sApellidos,
                        telefono: sTelefono,
                        fechaDeNacimiento: dtFecha,
                        direccion: sDireccion,
                        localidad: sLocalidad,
                        provincia: sProvincia,
                        sexo: sSexo
                      };

        var jPaciente=JSON.stringify(oPaciente);

        $.ajax({ url : "php/altaPaciente.php",
            data:{datos:jPaciente},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: tratarRespuestaPaciente,
            error :tratarErrorPaciente
        });
}

function procesoModPaciente(){
        var sNif = frmModPaciente.txtNIF.value.trim();
        var sModelo = frmModPaciente.txtNombre.value.trim();
        var sApellidos = frmModPaciente.txtApellidos.value.trim();
        var sTelefono = frmModPaciente.txtTelefono.value.trim();
        var dtFecha = frmModPaciente.txtFecha.value.trim();
        var sDireccion = frmModPaciente.txtDireccion.value.trim();
        var sLocalidad = frmModPaciente.txtLocalidad.value.trim();
        var sProvincia = frmModPaciente.txtProvincia.value.trim();
        var sSexo = frmModPaciente.txtSexo.value.trim();

        var oPaciente={
                        dni: sNif,
                        nombre: sNombre,
                        apellidos: sNif,
                        telefono: sTelefono,
                        fechaDeNacimiento: dtFecha,
                        direccion: sDireccion,
                        localidad: sLocalidad,
                        provincia: sProvincia,
                        sexo: sSexo
                      };

        var jPaciente=JSON.stringify(oPaciente);

        $.ajax({ url : "php/modPaciente.php",
            data:{datos:jPaciente},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: tratarRespuestaPaciente,
            error:tratarErrorPaciente
        });
}

function procesoBajaPaciente(){
        var sId = frmModPaciente.txtID.value.trim();

        var oPaciente={
                        idPaciente: sId
                      };

        var jPaciente=JSON.stringify(oPaciente);

        $.ajax({ url : "php/bajaPaciente.php",
            data:{datos:jPaciente},
            async: true, // Valor por defecto
            dataType :'json',
            method: "POST",
            cache: false, // ya por defecto es false para POST
            success: tratarRespuestaPaciente,
            error: tratarErrorPaciente
        });
}


function tratarRespuestaPaciente(oArrayRespuesta,sStatus,oXHR){
    $("#divMensajes").dialog("open");

    if (oArrayRespuesta[0] == true){
        $("#divMensajes").dialog("option","title","Error");
        $("#pMensaje").text(oArrayRespuesta[1]);
    } else {
        $('#divfrmBajaPaciente').dialog("close");
        $("#divMensajes").dialog("option","title","OK");
        $("#pMensaje").text(oArrayRespuesta[1]);
    }

}

function tratarErrorPaciente(oXHR,sStatus,sError){
    $("#divMensajes").dialog("open");
    $("#divMensajes").dialog("option","title",sStatus);
    $("#pMensaje").text(sError);

}
