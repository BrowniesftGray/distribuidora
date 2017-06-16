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
        text: "Borrar",
        click: procesoBajaPaciente
    }]
});
