function Cargando(ver, titulo="", box) {
    if (ver) {
        $("."+box).hide();
        $(".loading span").html(titulo)
        $(".loading").show()
    }else{
        $(".loading").hide()
        $("."+box).show();
    }
   
}


var TablaPestanias;
var TablaCategorias;
var TablaCapas;
var TablaRecursos;
//Estrae la informacion de las Pestañas, Categoria y Capas de la DB
function TraerTodos(op_capa, op_pestania, op_categoria, op_recurso) {
   Cargando(true, "Cargando capas publicadas", "box_capas_publicadas")
    $.ajax({
        url: urlapi+'apis/todos.php', // URL de la API
        method: 'GET', // Método de solicitud (puede ser POST también)
        dataType: 'json', // Tipo de datos esperado (JSON en este caso)
        success: function(data) { 
            if (op_recurso) { TablaRecursos = data.Recursos;}
            if (op_capa) { TablaCapas = data.Capas; ArbolBusquedaCapas();  }
            if (op_pestania) {TablaPestanias = data.Pestanias; CargarTablaPestanias();}
            if (op_categoria) { TablaCategorias = data.Categorias; CargarTablaCategorias();}
            Cargando(false, "", "box_capas_publicadas")
        },
        error: function(error) { console.error('Error al obtener los datos:', error); }
    });
}
TraerTodos(true, true, true, true);

//Estrae la informacion de las Pestañas, Categoria y Capas de la DB
function TraerCapaBase() {
    let cadena=""; let indice = 1; let ac=""; let margen=10;
    Cargando(true, "Cargando capas base", "box_capas_base")
    $.ajax({
        url: urlapi+'apis/capa_base.php', // URL de la API
        method: 'GET', // Método de solicitud (puede ser POST también)
        dataType: 'json', // Tipo de datos esperado (JSON en este caso)
        success: function(data) { 
            data.forEach((data) => {
                if (data.activo == 1) {ac="tile_activo"} else {ac=""}
                cadena +="<img src='./img/tiles/"+data.nombre+".jpg' class='img_tiles  capa"+indice+" "+ac+" ' onclick=\"SeccionarCapaBase('capa"+indice+"')\">"
                cadena +="<p style='margin-left: "+margen+"px;'>"+data.nombre+"</p>"
                cadena +="<input type='hidden' class='tile_capa"+indice+"' value='"+data.url+"'></input>"
                indice++; margen += 100
            })
            $(".grupo_imagenes").html(cadena);
            Cargando(false, "", "box_capas_base")
        },
        error: function(error) { console.error('Error al obtener los datos:', error); }
    });
}
TraerCapaBase();



//Se encarga de armar y cargar todas las categoria de la pestaña activa
function CargarTablaCategorias() {
    //Carga primero todas las categoria
    $.each(TablaCategorias, function (i, item) {
        if (item.id_pestania == parseInt($("#pestanias").val())) {
            AgregarNodosCategoria("XA"+item.parent_id, "XA"+item.id_categoria, item.nombre, "si" )
          
        }
    })

    //Asigna las Capa de esa Categoria    
    $.each(TablaCategorias, function (i, item) {
        if (item.id_pestania == parseInt($("#pestanias").val())) {
            CargarCapas(item.id_categoria);
        }
    })

     //Asigna los Recursos de esa Categoria    
     $.each(TablaCategorias, function (i, item) {
        if (item.id_pestania == parseInt($("#pestanias").val())) {
            CargarRecursos(item.id_categoria);
        }
    })


}


//Se encarga de inscrustar las capas que tiene las categorias
function CargarCapas(id_categoria) {
    $.each(TablaCapas, function (i, item) {
        if (item.id_pestania == parseInt($("#pestanias").val()) && item.id_categoria == id_categoria) {
            AgregarNodosCapa("XA"+item.id_categoria, "XA"+item.id_capa, item.titulo, "no", item.tipo_capa )
        }
    })
}

//Añade un registro de Capas
function AgregarNodosCapa(parent_id, id, nombre, opcion, tipo ) {
    $(".flecha"+parent_id).removeClass("sinhijos")
    var marginLeftValue = 0
    if (parent_id !="XA0"){ marginLeftValue += 15 }
    $("#"+parent_id).append("<div id='"+id+"' style='margin-left: "+marginLeftValue+"px' > ")
    $("#"+id).append("<img src='./img/16x/uncheck.png' style='margin-left: 2px' class='check_box"+id+" select cursor_x' onclick=\"Sele(\'"+id+"\')\" /> ")
    $("#"+id).append("<img src='./img/16x/tipo_"+tipo+".png' style='margin-left: 2px'/> ")
    $("#"+id).append("<span style='margin-left: 2px' class='gris' >"+nombre+"</span>")
    $("#"+parent_id).append("</div>")
    if (opcion == 'no') { $("#"+id).css("display", "none")}
}

//Se encarga de inscrustar las capas que tiene las categorias
function CargarRecursos(id_categoria) {
    $.each(TablaRecursos, function (i, item) {
        if (item.id_pestania == parseInt($("#pestanias").val()) && item.id_categoria == id_categoria) {
            AgregarNodosRecurso("XA"+item.id_categoria, "XA"+item.id_recurso, item.titulo, item.archivo, "no", item.tipo )
        }
    })
}


//Añade un registro de Capas
function AgregarNodosRecurso(parent_id, id, titulo, archivo, opcion, tipo ) {
    $(".flecha"+parent_id).removeClass("sinhijos")
    var marginLeftValue = 0
    if (parent_id !="XA0"){ marginLeftValue += 15 }
    $("#"+parent_id).append("<div id='"+id+"' style='margin-left: "+marginLeftValue+"px' > ")
    if (tipo == 'pdf') {
        $("#"+id).append("<img src='./img/16x/pdf.png' style='margin-left: 2px'/> ")
        $("#"+id).append("<span style='margin-left: 2px' onclick=\"VerPdf('"+archivo+"')\" class='cursor_x gris'>"+titulo+"</span>")
    }
    if (tipo == 'pagina') {
        $("#"+id).append("<img src='./img/16x/pagina.png' style='margin-left: 2px'/> ")
        $("#"+id).append("<span style='margin-left: 2px' onclick=\"IrUrl('"+archivo+"')\" class='cursor_x gris' >"+titulo+"</span>")
    }
    $("#"+parent_id).append("</div>")
    if (opcion == 'no') { $("#"+id).css("display", "none")}
}









//Añade un registro de Categorias
function AgregarNodosCategoria(parent_id, id, nombre, opcion ) {
    $(".flecha"+parent_id).removeClass("sinhijos")
    var marginLeftValue = 0
    if (parent_id !="XA0"){
        marginLeftValue += 20
    }
    $("#"+parent_id).append("<div id='"+id+"' style='margin-left: "+marginLeftValue+"px' class='fila'> ")
    $("#"+id).append("<img src='./img/16x/next.png' class='flecha"+id+" sinhijos' onclick=\"Girar('"+id+"' )\" />")
    $("#"+id).append("<img src='./img/16x/foldern.png' style='margin-left: 2px'/> ")
    $("#"+id).append("<span style='margin-left: 2px' class='resaltado'>"+nombre+"</span>")
    $("#"+parent_id).append("</div>")
    if (opcion == 'no') { 
        $("#"+id).css("display", "none")
     
    }
}

function ArbolBusquedaCapas() {
    $(".capa_busqueda").empty();
    $.each(TablaCapas, function (i, item) {
        if (item.tipo_capa != null) {
            AgregarNodosCapaBusqueda("XA"+item.id_capa, item.titulo, item.tipo_capa, '' )
        }
    })

    $.each(TablaRecursos, function (i, item) {
        AgregarNodosCapaBusqueda("XA"+item.id_recurso, item.titulo, item.tipo, item.archivo )
    })
}

//Añade un registro de Capas
function AgregarNodosCapaBusqueda(id, nombre, tipo, archivo) {
    var marginLeftValue = 0
    $(".busqueda_capa").append("<div id='"+id+"' style='margin-left: "+marginLeftValue+"px' > ")
       if (tipo == 'pdf') {
            $("#"+id).append("<img src='./img/16x/pdf.png' style='margin-left: 2px'/> ")
            $("#"+id).append("<span style='margin-left: 2px' onclick=\"VerPdf('"+archivo+"')\" class='cursor_x gris'>"+nombre+"</span>")
       }else if (tipo == 'pagina'){
            $("#"+id).append("<img src='./img/16x/pagina.png' style='margin-left: 2px'/> ")
            $("#"+id).append("<span style='margin-left: 2px' onclick=\"IrUrl('"+archivo+"')\" class='cursor_x gris' >"+nombre+"</span>")
        }else{
        $(".busqueda_capa").append("<img src='./img/16x/uncheck.png' style='margin-left: 2px' class='check_box"+id+" select cursor_x' onclick=\"Sele(\'"+id+"\')\" /> ")
        $(".busqueda_capa").append("<img src='./img/16x/tipo_"+tipo+".png' style='margin-left: 2px'/> ")
        $(".busqueda_capa").append("<span style='margin-left: 2px'  >"+nombre+"</span>")
       }
       
    $(".busqueda_capa").append("</div>")
}

function VerPdf(archivo) {
    window.open(urlapi+"pdf/"+archivo)
}

function IrUrl(url) {
    window.open(url, "_blank")
}



//Se encarga del checkeo de seleccion de las capas
function Sele(id) {
    if ($(".check_box"+id).hasClass("select")) {
        $(".check_box"+id).attr("src", "/img/16x/check.png");
        $(".check_box"+id).removeClass("select")
    }else{
        $(".check_box"+id).attr("src", "/img/16x/uncheck.png");
        $(".check_box"+id).addClass("select")
    }
}



function CargarTablaPestanias() {
    const selectNode = document.getElementById('pestanias');
    TablaPestanias.forEach((data) => {
        const optionNode = document.createElement('option');
        optionNode.value = data.id;
        optionNode.textContent = data.nombre;
        selectNode.appendChild(optionNode);
    });
}


function CambioPestania() {
    let id = parseInt($("#pestanias").val())
    $('.arboles').empty();
    CargarTablaCategorias();
}


//Hace girar la flecha y muestra el subitem de cada elemento
function Girar(id) {
    if ($("#"+id+" div").hasClass("visible")) {
        $(".flecha"+id).css("transform", "rotate(0deg)")
        $("#"+id+" div").removeClass("visible")
    }else {
        $(".flecha"+id).css("transform", "rotate(90deg)")
        $("#"+id+" div").addClass("visible")
    }
   
   $("#"+id+" div").toggle();
}

//Boton para mostrar/Ocultar las capas
let vista_capa= false
function vista_capas() {
    if (!vista_capa) {
        CerrarTodos();
        $(".capas_publicadas").show()
    }else{
        $(".capas_publicadas").hide()     
    }
    vista_capa = !vista_capa
   
}

let vista_capa_base= false
function vista_capas_base() {
    if (!vista_capa_base) {
       CerrarTodos();

        $(".capas_base").show()
    }else{
        $(".capas_base").hide()     
    }
    vista_capa_base = !vista_capa_base
   
}

function CerrarTodos() {
    $(".capas_base").hide(); vista_capa_base= false;
    $(".capas_publicadas").hide(); vista_capa= false
}

function CapasPorCatetoria(){
    RemoverBotonActivos()
    $(".capas_publicadas .box_titulo").html("Capas por categorias")
    $(".btn_categoria").addClass("btn_base_activo")
    $(".arboles").show()
    $(".busqueda_capa").hide()
    //$(".btn_capa_activa").hide()
}

function CapasActivas(){
    RemoverBotonActivos()
    $(".capas_publicadas .box_titulo").html("Capas activas")
    $(".btn_capa_activa").addClass("btn_base_activo")
    $(".arboles").hide()
    $(".busqueda_capa").hide()
}


function BusquedaDeCapas(){
    RemoverBotonActivos()
    $(".capas_publicadas .box_titulo").html("Busqueda de capas publicadas ")
    $(".btn_busqueda_capa").addClass("btn_base_activo")
    $(".arboles").hide()
    //$(".btn_capa_activa").hide()
    $(".busqueda_capa").show()
}

function CapasAtivas(){
    RemoverBotonActivos()
    $(".arboles").hide()
    $(".btn_capa_activa").addClass("btn_base_activo")
    $(".busqueda_capa").show()
}


function RemoverBotonActivos(){
    $(".btn_categoria").removeClass("btn_base_activo")
    $(".btn_capa_activa").removeClass("btn_base_activo")
    $(".btn_busqueda_capa").removeClass("btn_base_activo")
}

TablaCapasActivas = [
    {'id': 1, 'nombre': 'Capa1', 'orden': 1},
    {'id': 2, 'nombre': 'Capa2', 'orden': 2},
    {'id': 3, 'nombre': 'Capa3', 'orden': 3},
]

function CargarTablaActivas() {
    TablaCapasActivas.forEach((data) => {
        let cadena=""
        cadena +=" <div class='btn_base_activo' style='padding: 2px; margin-bottom: 5px;'>"
        cadena +=" <div >"+data.nombre+"</div>"
        cadena +=" <input type='range' max='100' min='0' value='20'>"
        cadena +="</div>"
        $(".capa_activa").append(cadena)
    })
}
CargarTablaActivas(9)





