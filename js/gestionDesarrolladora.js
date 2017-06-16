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
        click: procesoAltaPaciente
    },{
        text: "Modificar",
        click: procesoModPaciente
    },{
        text: "Borrar",
        click: procesoBajaPaciente
    }]
});

function procesoAltaPaciente(){
        var sNif = frmAltaPaciente.txtNIF.value.trim();
        var sNombre = frmAltaPaciente.txtNombre.value.trim();
        var sApellidos = frmAltaPaciente.txtApellidos.value.trim();
        var sTelefono = frmAltaPaciente.txtTelefono.value.trim();
        var dtFecha = frmAltaPaciente.txtFecha.value.trim();
        var sDireccion = frmAltaPaciente.txtDireccion.value.trim();
        var sLocalidad = frmAltaPaciente.txtLocalidad.value.trim();
        var sProvincia = frmAltaPaciente.txtProvincia.value.trim();
        var sSexo = frmAltaPaciente.txtSexo.value.trim();

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
        var sNif = frmAltaPaciente.txtNIF.value.trim();
        var sModelo = frmAltaPaciente.txtNombre.value.trim();
        var sApellidos = frmAltaPaciente.txtApellidos.value.trim();
        var sTelefono = frmAltaPaciente.txtTelefono.value.trim();
        var dtFecha = frmAltaPaciente.txtFecha.value.trim();
        var sDireccion = frmAltaPaciente.txtDireccion.value.trim();
        var sLocalidad = frmAltaPaciente.txtLocalidad.value.trim();
        var sProvincia = frmAltaPaciente.txtProvincia.value.trim();
        var sSexo = frmAltaPaciente.txtSexo.value.trim();

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
        var sId = frmAltaPaciente.txtID.value.trim();

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
