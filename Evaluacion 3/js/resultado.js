var g_id_tipo_gestion ="";

//Función para agregar tipo de gestión
function agregarResultado(){
//Obtenemos el tipo de gestión que ingresa el usuario
var nombre_resultado  = document.getElementById("txt_nombre").value;

if (!nombre_resultado) {
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
  "nombre_resultado": nombre_resultado,
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
fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
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
      setTimeout(() => location.href ="listar.html",3000 )
    }
    
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function listarResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_resultado').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);
  arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML +=
`<tr>
<td>${element.id_resultado }</td>
<td>${element.nombre_resultado }</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_resultado }' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_resultado }' class='btn btn-danger'>Eliminar</a> 
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
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_tipo_gestion, requestOptions)
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
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el resultado? <b>" + nombre_resultado + "</b>";


}
function completarFormulario(element,index,arr){
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('txt_nombre').value = nombre_resultado;

}

function actualizarResultado(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  var nombre_resultado = document.getElementById("txt_nombre").value;
  
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_tipo_gestion, requestOptions)
    .then((response) => {
      if(response.status == 200) {
        alertaconfimacion("Se ha actualizado correctamente C:");
        setTimeout(() => location.href ="listar.html",3000 );
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
  function eliminarResultado(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_tipo_gestion, requestOptions)
      .then((response) => {
        if(response.status == 200) {
          alertaconfimacion("Se a eliminado correctamente");
          setTimeout(() => location.href ="listar.html",3000 );
        } else if(response.status == 404) {
          alertarechazar("No se a podido eliminar");
          setTimeout(() => location.href ="listar.html",3000 )
        }
        else if(response.status == 400) {
          alertarechazar("No se a podido eliminar");
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
  