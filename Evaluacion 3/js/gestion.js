var g_id_tipo_gestion ="";


function agregarGestion(){

var id_usuario      = document.getElementById("sel_id_usuario").value;
var id_cliente      = document.getElementById("sel_id_cliente").value;
var id_tipo_gestion = document.getElementById("sel_id_tipo_gestion").value;
var id_resultado    = document.getElementById("sel_id_resultado").value;
var comentarios     = document.getElementById("txt_comentarios").value;

if (!id_usuario || !id_cliente || !id_tipo_gestion|| !id_resultado || !comentarios ) {
  alertarechazar("Todos los campos son obligatorios.");
  return;
}


agregarCliente();

//obtiene la fecha y hora actual
var fecha_hora = obtenerFechaHora()
//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


//Carga útil de datos
const raw = JSON.stringify({
  "id_usuario": id_usuario,
  "id_cliente": id_cliente,
  "id_tipo_gestion": id_tipo_gestion,
  "id_resultado": id_resultado,
  "comentarios": comentarios,
  "fecha_registro": fecha_hora
});

//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/gestion", requestOptions)
  .then((response) => {
      //Por hacer: Usar componentes de bootstrap para gestionar éxito o error
      if(response.status == 200) {
        alertaconfimacion("Se ha agregado correctamente C:");
        setTimeout(() => location.href ="listar.html",3000 );
      } else if(response.status == 404) {
        alertarechazar("No se ha podido agregar correctamente :C");
        setTimeout(() => location.href ="listar.html",3000 )
      }
      else if(response.status == 400) {
        alertarechazar("No se ha podido agregar correctamente :C");
        setTimeout(() => location.href ="listar.html",3000 )
      }
      
    })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}


function listarGestion(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
    "query": "select ges.id_gestion as id_gestion,cli.id_cliente, ges.comentarios as comentarios,CONCAT(cli.nombres, ' ',cli.apellidos) as nombre_cliente,CONCAT(usu.nombres,' ' ,usu.apellidos) as nombre_usuario,tge.nombre_tipo_gestion as nombre_tipo_gestion,res.nombre_resultado as nombre_resultado,ges.fecha_registro as fecha_registro from gestion ges,usuario usu,cliente cli,tipo_gestion tge,resultado res where ges.id_usuario = usu.id_usuario and ges.id_cliente = cli.id_cliente and ges.id_tipo_gestion = tge.id_tipo_gestion and ges.id_resultado = res.id_resultado "});
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/dynamic", requestOptions)
    .then(response => response.json())
    .then((json) => {
        json.forEach(completarFila);
        $('#tbl_gestion').DataTable();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function completarFila(element,index,arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);
  arr[index] = document.querySelector("#tbl_gestion tbody").innerHTML +=
`<tr>
<td>${element.id_gestion}</td>
<td>${element.nombre_usuario}</td>
<td>${element.nombre_cliente}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${element.nombre_resultado}</td>
<td>${element.comentarios}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_gestion}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_gestion}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosActualizar(p_id_tipo_gestion);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosEliminar(p_id_tipo_gestion);

}
function obtenerDatosEliminar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var id_gestion = element.id_gestion;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar la gestión? <b>" + id_gestion + "</b>";


}
function completarFormulario(element,index,arr) {

  var id_usuario = element.id_usuario;
  var id_cliente = element.id_cliente;
  var id_tipo_gestion = element.id_tipo_gestion;
  var id_resultado = element.id_resultado;
  var comentarios = element.comentarios;

  document.getElementById('sel_id_usuario').value = id_usuario;
  document.getElementById('sel_id_cliente').value = id_cliente;
  document.getElementById('sel_id_tipo_gestion').value = id_tipo_gestion;
  document.getElementById('sel_id_resultado').value = id_resultado;
  document.getElementById('txt_comentarios').value = comentarios;

}
function actualizarGestion(){

  var id_usuario = document.getElementById('sel_id_usuario').value;
  var id_cliente = document.getElementById('sel_id_cliente').value;
  var id_tipo_gestion = document.getElementById('sel_id_tipo_gestion').value;
  var id_resultado = document.getElementById('sel_id_resultado').value;
  var comentarios = document.getElementById('txt_comentarios').value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
 // "id_gestion": id_gestion,
  "id_usuario": id_usuario,
  "id_cliente": id_cliente,
  "id_tipo_gestion": id_tipo_gestion,
  "id_resultado": id_resultado,
  "comentarios": comentarios
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/gestion/"+ g_id_tipo_gestion, requestOptions)
    .then((response) => {
      if(response.status == 200) {
        alertaconfimacion("Se ha actualizado correcatamente C:");
        setTimeout(() => location.href ="listar.html",3000 )
      } else if(response.status == 404) {
        alertarechazar("No se ha podido actualizar :C");
        setTimeout(() => location.href ="listar.html",3000 )
      }
      else if(response.status == 400) {
        alertarechazar("No se ha podido actualizar :C");
        setTimeout(() => location.href ="listar.html",3000 )
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  function eliminarGestion(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/gestion/"+ g_id_tipo_gestion, requestOptions)
      .then((response) => {
        if(response.status == 200) {
          alertaconfimacion("Se ha eliminado correctamente");
          setTimeout(() => location.href ="listar.html",3000 );
        } else if(response.status == 404) {
          alertarechazar("No se ha podido eliminar");
          setTimeout(() => location.href ="listar.html",3000 )
        }
        else if(response.status == 400) {
          alertarechazar("No se ha podido eliminar");
          setTimeout(() => location.href ="listar.html",3000 )
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }

    function cargarSelectResultado(){
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          json.forEach(completarOptionResultado);
        
        } )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
    function completarOptionResultado(element,index,arr){
      arr[index] = document.querySelector("#sel_id_resultado").innerHTML +=
    `<option value='${element.id_resultado}'> ${element.nombre_resultado} </option>`
    }

    function cargarSelectCliente(){
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          json.forEach(completarOptionCliente);
        
        } )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
    function completarOptionCliente(element,index,arr){
      arr[index] = document.querySelector("#sel_id_cliente").innerHTML +=
    `<option value='${element.id_cliente}'> ${element.apellidos} ${element.nombres} </option>`
    }
    function cargarSelectUsuario(){
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          json.forEach(completarOptionUsuario);
        
        } )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
    function completarOptionUsuario(element,index,arr){
      arr[index] = document.querySelector("#sel_id_usuario").innerHTML +=
    `<option value='${element.id_usuario}'> ${element.apellidos} ${element.nombres} </option>`
    }

    function cargarSelectTipoGestion(){
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
          json.forEach(completarOptionTipoGestion);
        
        } )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
    function completarOptionTipoGestion(element,index,arr){
      arr[index] = document.querySelector("#sel_id_tipo_gestion").innerHTML +=
    `<option value='${element.id_tipo_gestion}'> ${element.nombre_tipo_gestion} </option>`
    }

    function cargarListasDesplegables(){
      cargarSelectResultado();
      cargarSelectCliente();
      cargarSelectUsuario();
      cargarSelectTipoGestion();
    }
    function obtenerFechaHora(){
      var fecha_hora_Actual = new Date();//obtiene la fecha y hora actual del sistema
      var fecha_hora_formateada = fecha_hora_Actual.toLocaleString('es-ES',{
        hour12 :false,
        year:'numeric', 
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fecha_hora_formateada;
    }
    //despues de obtener la fecha arriba, se formatea para que sea legible en la pagina (eliminar "T" y "Z").
    function formatearFechaHora(fecha_registro){
      var fecha_hora_Actual = new Date(fecha_registro);//te genera un objeto de la clase fecha para ese parametro
      var fecha_hora_formateada = fecha_hora_Actual.toLocaleString('es-ES',{
        hour12 :false,
        year:'numeric', 
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        timeZone: 'UTC'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fecha_hora_formateada;
    }

    function alertaconfimacion(mensaje) {
      // Crear el elemento de la alerta
      var confirmarAccion = document.createElement("div");
      confirmarAccion.className = "alert alert-success";
      confirmarAccion.role = "alert";
      confirmarAccion.innerHTML = mensaje;
    
      // Insertar la alerta en el DOM
      var contenedorAlertas = document.getElementById("contenedor-alertas-confirmacion");
      if (contenedorAlertas) {
        contenedorAlertas.appendChild(confirmarAccion);
    
        // Eliminar la alerta después de 3 segundos
        setTimeout(function() {
          confirmarAccion.remove();
        }, 3000);
      } else {
        console.error("No se encontró el contenedor de alertas");
      }
    }

    function alertarechazar(mensaje) {
      // Crear el elemento de la alerta
      var rechazarAccion = document.createElement("div");
      rechazarAccion.className = "alert alert-danger";
      rechazarAccion.role = "alert";
      rechazarAccion.innerHTML = mensaje;
    
      // Insertar la alerta en el DOM
      var contenedorAlertas = document.getElementById("contenedor-alertas-rechazar");
      if (contenedorAlertas) {
        contenedorAlertas.appendChild(rechazarAccion);
    
        // Eliminar la alerta después de 3 segundos
        setTimeout(function() {
          rechazarAccion.remove();
        }, 3000);
      } else {
        console.error("No se encontró el contenedor de alertas");
      }
    }