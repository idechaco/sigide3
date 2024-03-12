var map = L.map('map', { zoomControl: false}).setView([-27.488834, -58.964769], 17);
//L.control.zoom({position: "topleft", classtext: 'mi-control-zoom'}).addTo(map);

let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 22,
    
}).addTo(map);


let tile_activa = "capa1"
function SeccionarCapaBase(capa) {
    $("."+tile_activa).removeClass("tile_activo")
    $("."+capa).addClass("tile_activo")
    tile_activa = capa

    map.removeLayer(tileLayer);
    // Crea una nueva capa de tiles con la URL proporcionada
    tileLayer = L.tileLayer($(".tile_"+capa).val(), {
        attribution: ''
    }).addTo(map);
}


//$(".box_login_access").hide();

function QuitarFondo() {
    $(".box_login_access").hide();
    
}

function AccesoUsuario() {
    $(".box_login_access").fadeIn();
    
}

function EnviarLogin() {
    $.post(urlapi+"apis/login.php", {
        usuario: $("#inp_usuario").val(),
        pass: $("#inp_pass").val()
    }, function(data) {
        let cadena = "";
        let rol ="";
        if (data.Registro == 1) {
            if (data.Login[0].id_rol == 1) {rol = "Admin"}
            if (data.Login[0].id_rol == 2) {rol = "User"}
            if (data.Login[0].id_rol == 3) {rol = "Auditor"}
            cadena += "<button class='btn_usuario btn_login' onclick='ConfigUsuario()'>"+data.Login[0].username
            cadena +="<span class='user_rol'>"+rol+"</span></button> "
            cadena += "<button class='btn_accion btn_login'>Cerrar</button>"
            $(".box_login").html(cadena)
            $(".box_login_access").fadeOut();
        }else {
            alertify.error('El Usuario o Contrañena son incorrectas ');
        }
       
       
    }, "json");
}



