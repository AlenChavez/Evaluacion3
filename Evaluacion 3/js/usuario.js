var g_id_tipo_gestion ="";

//Función para agregar tipo de gestión
function agregarUsuario(){
//Obtenemos el tipo de gestión que ingresa el usuario
var id_usuario  = document.getElementById("id_usuario").value;
var dv          = document.getElementById("dv").value;
var nombres     = document.getElementById("nombre_usuario").value;
var apellidos   = document.getElementById("apellido_usuario").value;
var email       = document.getElementById("email_usuario").value;
var username    = document.getElementById("username_usuario").value;
var password    = document.getElementById("password_usuario").value;
var celular     = document.getElementById("celular_usuario").value;

if (!id_usuario || !dv || !nombres || !apellidos || !email || !username ||!password || !celular ) {
  alertarechazar("Todos los campos son obligatorios.");
  return;
}


agregarCliente();


var fecha_hora = obtenerFechaHora()
//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos
const raw = JSON.stringify({
  "id_usuario" : id_usuario,
  "dv"         : dv,
  "nombres"    : nombres,
  "apellidos"  : apellidos,
  "email"      : email,
  "celular"    : celular,
  "username"   : username,
  "password"   :password,
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
fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      alertaconfimacion("Se ha agregado correctamente C:");
      setTimeout(() => location.href ="listar.html",3000 );
    } else if(response.status == 404) {
      alertarechazar("No se ha podido agregar correctamente :C");
      setTimeout(() => location.href ="listar.html",3000 )
    }
    else if(response.status == 400) {
      alertarechazar("No se ha podido agregar correctamente :C");
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
`<tr>
<td>${element.id_usuario }</td>
<td>${element.dv }</td>
<td>${element.nombres}</td>
<td>${element.apellidos }</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.username}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_usuario }' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_usuario }' class='btn btn-danger'>Eliminar</a> 
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
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_tipo_gestion, requestOptions)
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
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var id_usuario = element.id_usuario;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el usuario? <b>" + id_usuario + "</b>";


}
function completarFormulario(element,index,arr){
  var id_usuario = element.id_usuario;
  var dv         = element.dv
  document.getElementById('id_usuario').value = id_usuario;
  document.getElementById('dv').value = dv
}

function actualizarUsuario(){
  //Obtenemos el tipo de gestión que ingresa el usuario
var id_usuario  = document.getElementById("id_usuario").value;
var dv          = document.getElementById("dv").value;
var nombres     = document.getElementById("nombre_usuario").value;
var apellidos   = document.getElementById("apellido_usuario").value;
var email       = document.getElementById("email_usuario").value;
var username    = document.getElementById("username_usuario").value;
var password    = document.getElementById("password_usuario").value;
var celular     = document.getElementById("celular_usuario").value;
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "id_usuario" : id_usuario,
    "dv"         : dv,
    "nombres"    : nombres,
    "apellidos"  : apellidos,
    "email"      : email,
    "celular"    : celular,
    "username"   : username,
    "password"   :password,
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_tipo_gestion, requestOptions)
    .then((response) => {
      if(response.status == 200) {
        alertaconfimacion("Se ha actualizado correcatamente C:");
        setTimeout(() => location.href ="listar.html",3000 );
      } else if(response.status == 404) {
        alertarechazar("No se ha podido actualizar :C");
        setTimeout(() => location.href ="listar.html",3000 )
      }
      else if(response.status == 400) {
        alertarechazar("No se ha podido actualizar :C");
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  function eliminarUsuario(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_tipo_gestion, requestOptions)
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
      var rechazarAccion = document.createElement("div");
      rechazarAccion.className = "alert alert-danger";
      rechazarAccion.role = "alert";
      rechazarAccion.innerHTML = mensaje;
    
      
      var contenedorAlertas = document.getElementById("contenedor-alertas-rechazar");
      if (contenedorAlertas) {
        contenedorAlertas.appendChild(rechazarAccion);
    
        
        setTimeout(function() {
          rechazarAccion.remove();
        }, 3000);
      } else {
        console.error("No se encontró el contenedor de alertas");
      }
    }