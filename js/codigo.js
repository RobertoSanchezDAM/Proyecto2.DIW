/* SCRIPT INICIAL */
"use strict";
var oCliente = new Cliente();
var oPaquete = new Paquete();
var oViaje = new Viaje();

const frmViajes = document.getElementById("frmViajes");
const frmPaquetes = document.getElementById("frmPaquetes");
const frmClientes = document.getElementById("frmClientes");

const frmBuscarViaje = document.getElementById("frmBuscarViaje");
const frmBuscarCliente = document.getElementById("frmBuscarCliente");
const frmBuscarPaquete = document.getElementById("frmBuscarPaquete");

const frmModificarViaje = document.getElementById("frmModificarViaje");
const frmModificarCliente = document.getElementById("frmModificarCliente");
const frmModificarPaquete = document.getElementById("frmModificarPaquete");

const frmListarPaquetesPorViaje = document.getElementById("frmListarPaquetesPorViaje");
const frmListarClientesPorPaquete = document.getElementById("frmListarClientesPorPaquete");
const frmBuscarClienteParaPaquetes = document.getElementById("frmBuscarClienteParaPaquetes");
const frmAñadirPaquetesACliente = document.getElementById("frmAñadirPaquetesACliente");

registradorEventos();

function registradorEventos() {
    // Opciones de menú
    document.querySelector("#mnuAñadirViaje").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAñadirPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAñadirCliente").addEventListener("click", mostrarFormulario);
    
    document.querySelector("#mnuBuscarViaje").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarPaquete").addEventListener("click", mostrarFormulario);
    
    document.querySelector("#mnuListadoViajes").addEventListener("click", procesarListarViaje);
    document.querySelector("#mnuListadoPaquetes").addEventListener("click", procesarListarPaquete);
    document.querySelector("#mnuListarClientes").addEventListener("click", procesarListarClientes);
    
    
    document.querySelector("#mnuAñadirPaquetesACliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListarPaquetesPorViaje").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListarPaquetesPorCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListarClientesPorPaquete").addEventListener("click", mostrarFormulario);

    // Botones
    frmPaquetes.btnAñadirPaquete.addEventListener("click", procesarAltaPaquete);
    frmClientes.btnAñadirCliente.addEventListener("click", procesarAltaCliente);
    frmViajes.btnAñadirViaje.addEventListener("click", procesarAltaViaje);

    frmBuscarViaje.btnBuscarViaje.addEventListener("click", procesarBuscarViaje);
    frmBuscarCliente.btnBuscarCliente.addEventListener("click", procesarBuscarCliente);
    frmBuscarPaquete.btnBuscarPaquete.addEventListener("click", procesarBuscarPaquete)

    frmListarPaquetesPorViaje.btnBuscarPaquetesPorViaje.addEventListener("click", procesarBuscarPaquetesPorViaje);
    frmListarClientesPorPaquete.btnBuscarClientePorPaquete.addEventListener("click", procesarBuscarClientePorPaquete)
    frmAñadirPaquetesACliente.btnBuscarCliente.addEventListener("click", procesarBuscarClienteNombre);
    frmAñadirPaquetesACliente.btnAñadirPaqueteACliente.addEventListener("click", procesarAñadirPaqueteACliente);
    frmBuscarClienteParaPaquetes.btnBuscarClienteParaPaquetes.addEventListener("click", procesarListarPaquetesDeCliente);

    document.querySelector("#btnAñadirCambiosViaje").addEventListener("click",procesarModificarViaje);
    document.querySelector("#btnAñadirCambiosCliente").addEventListener("click",procesarModificarCliente);
    document.querySelector("#btnAñadirCambiosPaquete").addEventListener("click",procesarModificarPaquete);
}

function mostrarFormulario(oEvento) {
    // Opción del menú pulsada (su id)
    let opcionMenu = oEvento.target.id;

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAñadirViaje":
            frmViajes.style.display = "block";
            break;
        case "mnuAñadirPaquete":
            frmPaquetes.style.display = "block";
            actualizarDesplegableViajes();
            break;
        case "mnuAñadirCliente":
            frmClientes.style.display = "block";
            break;
        case "mnuBuscarViaje":
            frmBuscarViaje.style.display = "block";
            break;
        case "mnuBuscarCliente":
            frmBuscarCliente.style.display = "block";
            break;
        case "mnuBuscarPaquete":
            frmBuscarPaquete.style.display = "block";
            break;
        case "mnuListarPaquetesPorViaje":
            frmListarPaquetesPorViaje.style.display = "block";
            actualizarDesplegableViaje();
            break;
        case "mnuAñadirPaquetesACliente":
            frmAñadirPaquetesACliente.style.display = "block";
            actualizarDesplegablePaquetes();
            break;
        case "mnuListarPaquetesPorCliente":
            frmBuscarClienteParaPaquetes.style.display = "block";
            break;
        case "mnuListarClientesPorPaquete":
            frmListarClientesPorPaquete.style.display = "block";
            actualizarDesplegablePaquetes();
            actualizarDesplegableClientesPorPaquetes();
            break;
    }
}

function ocultarFormularios() {
    frmViajes.reset();
    frmPaquetes.reset();
    frmClientes.reset();

    frmBuscarViaje.reset();
    frmBuscarPaquete.reset();
    frmBuscarCliente.reset();
    
    frmViajes.style.display = "none";
    frmPaquetes.style.display = "none";
    frmClientes.style.display = "none";

    frmBuscarViaje.style.display = "none";
    frmBuscarCliente.style.display = "none";
    frmBuscarPaquete.style.display = "none";

    frmModificarCliente.style.display = "none";
    frmModificarPaquete.style.display = "none";

    frmListarPaquetesPorViaje.style.display = "none";
    frmBuscarClienteParaPaquetes.style.display = "none";
    frmListarClientesPorPaquete.style.display = "none";
    frmAñadirPaquetesACliente.style.display = "none"
    resultadoBusqueda.style.display = "none";

}

async function procesarAltaPaquete() {
    if (validarFormularioAltaPaquete()) {
        let nombrepaquete = frmPaquetes.nombrePaquete.value.trim();
        let tipopaquete = frmPaquetes.tipoPaquete.value.trim();
        let tipoalojamiento = frmPaquetes.alojamiento.value.trim();
        let fechainicio = frmPaquetes.fechaInicio.value.trim();
        let fechafin = frmPaquetes.fechaFin.value.trim();
        let transporte = frmPaquetes.transporte.value.trim();

        let paquete = new Paquete(nombrepaquete, tipopaquete, tipoalojamiento, fechainicio, fechafin, transporte);
        console.log("Paquete: " + paquete.toString());

        let respuesta = await paquete.AltaPaquete();

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            frmPaquetes.reset();
            frmPaquetes.style.display = "none";
        }
    }
}

function validarFormularioAltaPaquete() {
    let nombrepaquete = frmPaquetes.nombrePaquete.value.trim();
    let tipopaquete = frmPaquetes.tipoPaquete.value;
    let alojamiento = frmPaquetes.alojamiento.value.trim();
    let fechainicio = frmPaquetes.fechaInicio.value;
    let fechafin = frmPaquetes.fechaFin.value;

    let transporteSeleccionado = [];
    document.querySelectorAll('input[name="transporte[]"]:checked').forEach((checkbox) => {
        transporteSeleccionado.push(checkbox.value);
    });
    let transporte = transporteSeleccionado.join(',');

    let errores = "";
    let valido = true;

    // Verificar que todos los campos obligatorios están llenos
    if (nombrepaquete.length == 0 || tipopaquete.length == 0 || alojamiento.length == 0 || fechainicio.length == 0 || fechafin.length == 0 || transporte.length == 0  ) {
        valido = false;
        errores += "Existen campos sin rellenar";
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}


async function procesarAltaCliente() {
    if (validarFormularioAltaCliente()) {
        let nombreCliente = frmClientes.txtnombre.value.trim();
        let dni = frmClientes.txtdni.value.trim();
        let cuerpoEmail = frmClientes.txtcuerpocorreo.value.trim();
        let extensionCorreo = frmClientes.txtextensioncorreo.value.trim();
        let email = cuerpoEmail + "@" + extensionCorreo;
        let extensionTelefono = frmClientes.txtextensiontelefono.value;
        let numeroTelefono = frmClientes.txttelefono.value;
        let telefono = extensionTelefono + "-" + numeroTelefono;
        let direccion = frmClientes.txtdireccion.value.trim();

        let cliente = new Cliente(nombreCliente, dni, email, telefono, direccion);
        console.log("cliente: " + cliente);

        let respuesta = await cliente.AltaCliente();


        alert(respuesta.mensaje);

        if (respuesta.ok) {
            frmClientes.reset();
            frmClientes.style.display = "none";
        }
    }
}

function validarFormularioAltaCliente() {

    let nombreCliente = frmClientes.txtnombre.value.trim();
    let dni = frmClientes.txtdni.value.trim();
    let cuerpoEmail = frmClientes.txtcuerpocorreo.value.trim();
    let extensionCorreo = frmClientes.txtextensioncorreo.value.trim();
    let email = cuerpoEmail + "@" + extensionCorreo
    let extensionTelefono = frmClientes.txtextensiontelefono.value.trim();
    let numeroTelefono = frmClientes.txttelefono.value.trim();
    let telefono = extensionTelefono + "-" + numeroTelefono;
    let direccion = frmClientes.txtdireccion.value.trim();

    let errores = "";
    let valido = true;

    if (nombreCliente.length == 0 || dni.length == 0 | email.length == 0 || telefono.length == 0 || direccion.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar"

    }

    // Existen errores
    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function procesarBuscarCliente() {
    if (validarBuscarCliente()) {
        let dni = frmBuscarCliente.txtdniBuscarCliente.value.trim();

        let respuesta = await oCliente.buscarCliente(dni);

        if (respuesta.ok) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            // Escribimos el resultado
            let tabla = "<table>";
            tabla += "<thead><tr><th>NOMBRE</th><th>DNI</th><th>EMAIL</th><th>TELÉFONO</th><th>DIRECCIÓN</th><th>ACCIÓN</th></tr></thead>";
            tabla += "<tbody><tr>";
            tabla += "<td>" + respuesta.datos.nombre + "</td>";
            tabla += "<td>" + respuesta.datos.dni + "</td>";
            tabla += "<td>" + respuesta.datos.email + "</td>";
            tabla += "<td>" + respuesta.datos.telefono + "</td>";
            tabla += "<td>" + respuesta.datos.direccion + "</td>";
            tabla += "<td><button type='button' class='btn-person' value='' id='btnBorrarCliente' data-Cliente='" + respuesta.datos.dni + "'><i class='bi bi-trash3'></i></button> </td>";
            tabla += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tabla;
            resultadoBusqueda.style.display = 'block';
            // Borramos el formulario
            frmBuscarCliente.reset();
            // Ocultamos el formulario
            frmBuscarCliente.style.display = "none";

            // Registramos evento para el boton borrar
            document.querySelector("#btnBorrarCliente").addEventListener("click", borrarCliente);
        } else {
            alert(respuesta.mensaje);
        }
    }
}

function validarBuscarCliente() {
    let dni = frmBuscarCliente.txtdniBuscarCliente.value.trim();
    let valido = true;
    let errores = "";

    if (dni.length != 9) {
        valido = false;
        errores += "El DNI introducido no es válido"
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function borrarCliente(oEvento) {
    // Seleccionamos el botón con `closest` para acceder a `data-Cliente`.
    // ya que de la forma boton = oEvento.target accedemos al icono, no al boton
    let boton = oEvento.target.closest("button");
    let dni = boton.dataset.cliente;

    let respuesta = await oCliente.borrarCliente(dni);

    alert(respuesta.mensaje);

    // En el caso que se haya borrado correctamente, borramos toda la tabla y ponemos el div display: none
    if (respuesta.ok) {
        document.querySelector("#resultadoBusqueda").innerHTML = "";
        resultadoBusqueda.style.display = 'none';
    }
}

async function procesarListarClientes() {

    let respuesta = await oCliente.listarClientes();

    let listado = "";

    if (!respuesta.ok) {
        listado = respuesta.mensaje;
    } else {
        listado += "<table id='listadoClientes'>";
        listado += "<thead><tr><th>NOMBRE</th><th>DNI</th><th>EMAIL</th><th>TELÉFONO</th><th>DIRECCIÓN</th><th>ACCIÓN</th></tr></thead>";
        listado += "<tbody>";

        for (let cliente of respuesta.datos) {
            listado += "<tr><td>" + cliente.nombre + "</td>";
            listado += "<td>" + cliente.dni + "</td>";
            listado += "<td>" + cliente.email + "</td>";
            listado += "<td>" + cliente.telefono + "</td>";
            listado += "<td>" + cliente.direccion + "</td>";
            listado += "<td><button type='button' class='btn-person' id='btnModificarCliente' data-cliente='" + JSON.stringify(cliente) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
        }
        listado += "</tbody></table>";

    }
    ocultarFormularios();
    resultadoBusqueda.innerHTML = listado;
    resultadoBusqueda.style.display = 'block';

    // Registramos evento para el boton Modificar
    document.querySelector("#listadoClientes").addEventListener("click", procesarBotonModificarCliente);

}

let modalModificarCliente; // Variable para almacenar la instancia del modal

function procesarBotonModificarCliente(oEvento) {
    let boton = null;

    // Verificamos si se ha hecho click al botón o al icono
    if (oEvento.target.nodeName === "I" || oEvento.target.nodeName === "BUTTON") {
        boton = oEvento.target.closest("button");

        // Mostrar el formulario de modificar cliente en el modal
        let cliente = JSON.parse(boton.dataset.cliente);
        frmModificarCliente.txtnombreModificarCliente.value = cliente.nombre;
        frmModificarCliente.txtdniModificarCliente.value = cliente.dni;

        // Separar email y teléfono en partes
        let emailParts = cliente.email.split('@');
        frmModificarCliente.txtcuerpocorreoModificarCliente.value = emailParts[0];
        frmModificarCliente.txtextensioncorreoModificarCliente.value = emailParts[1];

        let phoneParts = cliente.telefono.split('-');
        frmModificarCliente.txttelefonoModificarCliente.value = phoneParts[1];

        // Selecciona la extensión de teléfono en el <select>
        let selectExtension = frmModificarCliente.txtextensiontelefonoModificarCliente;
        for (let i = 0; i < selectExtension.options.length; i++) {
            if (selectExtension.options[i].value === phoneParts[0]) {
                selectExtension.selectedIndex = i;
                break;
            }
        }

        frmModificarCliente.txtdireccionModificarCliente.value = cliente.direccion;

        // Crear instancia de Bootstrap Modal y mostrarla solo si aún no está creada
        if (!modalModificarCliente) {
            modalModificarCliente = new bootstrap.Modal(document.getElementById('divModalModificarCliente'));
        }
        modalModificarCliente.show();
        frmModificarCliente.style.display = 'block';
    }
}

async function procesarModificarCliente() {
    // Recuperamos los datos del formulario frmModificarCliente
    let nombre = frmModificarCliente.txtnombreModificarCliente.value.trim();
    let dni = frmModificarCliente.txtdniModificarCliente.value.trim();
    let email = frmModificarCliente.txtcuerpocorreoModificarCliente.value.trim() + "@" + frmModificarCliente.txtextensioncorreoModificarCliente.value.trim();
    let telefono = frmModificarCliente.txtextensiontelefonoModificarCliente.value.trim() + "-" + frmModificarCliente.txttelefonoModificarCliente.value.trim();
    let direccion = frmModificarCliente.txtdireccionModificarCliente.value.trim();

    // Validamos los datos del formulario
    if (validarFormularioModificarCliente()) {

        let respuesta = await oCliente.modificarCliente(new Cliente(nombre, dni, email, telefono, direccion));

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Resetear formulario
            frmModificarCliente.reset();
            // Cerrar el modal
            modalModificarCliente.hide();
            // Actualizar la lista de clientes
            await procesarListarClientes();
        }
    }
}

function validarFormularioModificarCliente() {

    let nombreCliente = frmModificarCliente.txtnombreModificarCliente.value.trim();
    let dni = frmModificarCliente.txtdniModificarCliente.value.trim();
    let cuerpoEmail = frmModificarCliente.txtcuerpocorreoModificarCliente.value.trim();
    let extensionCorreo = frmModificarCliente.txtextensioncorreoModificarCliente.value.trim();
    let email = cuerpoEmail + "@" + extensionCorreo
    let extensionTelefono = frmModificarCliente.txtextensiontelefonoModificarCliente.value.trim();
    let numeroTelefono = frmModificarCliente.txttelefonoModificarCliente.value.trim();
    let telefono = extensionTelefono + "-" + numeroTelefono;
    let direccion = frmModificarCliente.txtdireccionModificarCliente.value.trim();

    let errores = "";
    let valido = true;

    if (nombreCliente.length == 0 || dni.length == 0 | email.length == 0 || telefono.length == 0 || direccion.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar"

    }

    // Existen errores
    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function procesarBuscarClienteNombre() {
    if (validarBuscarCliente) {
        let dni = frmAñadirPaquetesACliente.txtdniañadirpaquetesacliente.value.trim();

        let respuesta = await oCliente.buscarCliente(dni);

        if (respuesta.ok) {

            frmAñadirPaquetesACliente.txtnombreañadirpaquetesacliente.value = respuesta.datos.nombre;
        }
    }
}

async function actualizarDesplegablePaquetes() {
    let respuesta = await oPaquete.getPaquetes();

    let options = "";

    for (let Paquete of respuesta.datos) {
        options += "<option value='" + Paquete.id + "'>" + Paquete.nombrepaquete + "</option>";
    }

}


async function procesarAñadirPaqueteACliente() {
    let dni = frmAñadirPaquetesACliente.txtdniañadirpaquetesacliente.value.trim();
    let idPaquete = frmAñadirPaquetesACliente.lstPaquetes.value;


    if (dni.length > 0 && idPaquete >= 1) {
        console.log("dni: " + dni + " idpaquete: " + idPaquete);
        let respuesta = await oCliente.añadirPaqueteACliente(dni, idPaquete);

        
        if (respuesta.ok) {
            alert("Se ha añadido el paquete al cliente")
            frmAñadirPaquetesACliente.reset();
            frmAñadirPaquetesACliente.style.display = "none";
        } else {
            alert(respuesta.mensaje);
        }

    } else {
        alert("Debe seleccionar un Cliente y un Paquete");
    }
}

async function procesarListarPaquetesDeCliente() {
    let dni = frmBuscarClienteParaPaquetes.txtdniBuscarClienteParaPaquetes.value.trim();
    console.log(dni);

    let respuesta; // Definimos la variable aquí para que esté accesible en toda la función.

    if (dni.length > 0) {
        respuesta = await oCliente.listarPaquetesDeCliente(dni); // Asignar valor a la variable.
    } else {
        alert("Debe introducir un DNI válido");
        return; // Salir de la función si no hay un DNI válido.
    }

    let listado = "";

    if (!respuesta.ok) {
        listado = respuesta.mensaje;
    } else {
        listado += "<table id='listadoClientes'>";
        listado += "<thead><tr><th>NOMBRE</th><th>TIPOPAQUETE</th><th>TIPOALOJAMIENTO</th><th>FECHAINICIO</th><th>FECHAFIN</th><th>TRANSPORTE</th></tr></thead>";
        listado += "<tbody>";

        for (let paquete of respuesta.datos) {
            listado += "<tr><td>" + paquete.nombrepaquete + "</td>";
            listado += "<td>" + paquete.tipopaquete + "</td>";
            listado += "<td>" + paquete.tipoalojamiento + "</td>";
            listado += "<td>" + paquete.fechainicio + "</td>";
            listado += "<td>" + paquete.fechafin + "</td>";
            listado += "<td>" + paquete.transporte + "</td></tr>"
        }
        listado += "</tbody></table>";
    }

    ocultarFormularios();
    resultadoBusqueda.innerHTML = listado;
    resultadoBusqueda.style.display = 'block';
}



// PAQUETES
async function procesarAltaPaquete() {
    if (validarFormularioAltaPaquete()) {
        let nombrepaquete = frmPaquetes.nombrePaquete.value.trim();
        let tipopaquete = frmPaquetes.tipoPaquete.value.trim();
        let tipoalojamiento = frmPaquetes.alojamiento.value.trim();
        let fechainicio = frmPaquetes.fechaInicio.value.trim();
        let fechafin = frmPaquetes.fechaFin.value.trim();
        let idviaje = frmPaquetes.lstViajes.value;
        let transporte = document.querySelector('input[name="transporte"]:checked')?.value || "";

        let paquete = new Paquete(null, nombrepaquete, tipopaquete, tipoalojamiento, fechainicio, fechafin, transporte, idviaje);
        console.log("Paquete: " + paquete.toString());

        let respuesta = await paquete.AltaPaquete();

        alert(respuesta.mensaje);

        if(respuesta.ok) {
            frmPaquetes.reset();
            frmPaquetes.style.display = "none";
        }
    }
}

function validarFormularioAltaPaquete() {
    let nombrepaquete = frmPaquetes.nombrePaquete.value.trim();
    let tipopaquete = frmPaquetes.tipoPaquete.value;
    let alojamiento = frmPaquetes.alojamiento.value.trim();
    let fechainicio = frmPaquetes.fechaInicio.value;
    let fechafin = frmPaquetes.fechaFin.value;
    let idviaje = frmPaquetes.lstViajes.value;
    let transporte = document.querySelector('input[name="transporte"]:checked')?.value || "";

    let errores = "";
    let valido = true;

    // Verificar que todos los campos obligatorios están llenos
    if (nombrepaquete.length == 0 || tipopaquete.length == 0 || alojamiento.length == 0 || fechainicio.length == 0 || fechafin.length == 0 || transporte.length == 0 || idviaje.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar\n";
    }

    if (!fechainicio || !fechafin || new Date(fechainicio) > new Date(fechafin)) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        return false;
    }    

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function procesarListarPaquete() {
    let respuesta = await oPaquete.listarPaquetes();

    let listado = "";

    if (!respuesta.ok) {
        listado = respuesta.mensaje;
    } else {
        // Verifica si la propiedad 'datos' existe y es un arreglo
        if (Array.isArray(respuesta.datos)) {
            listado += "<table id='listadoPaquetes'>";
            listado += "<thead><tr><th>ID</th><th>NOMBRE</th><th>TIPO PAQUETE</th><th>TIPO ALOJAMIENTO</th><th>FECHA INICIO</th><th>FECHA FIN</th><th>TRANSPORTE</th><th>ID VIAJE</th><th>ACCIÓN</th></tr></thead>";
            listado += "<tbody>";

            for (let paquete of respuesta.datos) {
                listado += "<tr><td>" + paquete.id + "</td>";
                listado += "<td>" + paquete.nombrepaquete + "</td>";
                listado += "<td>" + paquete.tipopaquete + "</td>";
                listado += "<td>" + paquete.tipoalojamiento + "</td>";
                listado += "<td>" + paquete.fechainicio + "</td>";
                listado += "<td>" + paquete.fechafin+ "</td>";
                listado += "<td>" + paquete.transporte + "</td>";
                listado += "<td>" + paquete.viaje_id + "</td>";
                listado += "<td><button type='button' class='btn-person' id='btnModificarPaquete' data-paquete='" + JSON.stringify(paquete) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
            }
            listado += "</tbody></table>";
        } else {
            listado = "No se encontraron paquetes o los datos están mal formateados.";
        }
    }
    ocultarFormularios();
    resultadoBusqueda.innerHTML = listado;
    resultadoBusqueda.style.display = 'block';

    // Registramos evento para el botón Modificar
    document.querySelector("#listadoPaquetes").addEventListener("click", procesarBotonModificarPaquete);
}

let modalModificarPaquete = null;

function procesarBotonModificarPaquete(oEvento) {
    let boton = null;

    // Verificar si se ha hecho clic en el botón de modificar
    if (oEvento.target.nodeName === "I" || oEvento.target.nodeName === "BUTTON") {
        boton = oEvento.target.closest("button");

        let paquete = JSON.parse(boton.dataset.paquete); // Recuperamos los datos del paquete

        // Llenar los campos del formulario de modificación
        frmModificarPaquete.idModificarPaquete.value = paquete.id;
        frmModificarPaquete.nombreModificarPaquete.value = paquete.nombrepaquete;
        frmModificarPaquete.tipoModificarPaquete.value = paquete.tipopaquete;
        frmModificarPaquete.alojamientoModificarPaquete.value = paquete.tipoalojamiento;
        frmModificarPaquete.fechaInicioModificarPaquete.value = paquete.fechainicio;
        frmModificarPaquete.fechaFinModificarPaquete.value = paquete.fechafin;

        document.getElementById("transporteAereo").checked = paquete.transporte === "aéreo";
        document.getElementById("transporteTerrestre").checked = paquete.transporte === "terrestre";
        document.getElementById("transporteMaritimo").checked = paquete.transporte === "marítimo";

        frmModificarPaquete.lstModificarViajes.value = paquete.viaje_id;

        // Mostrar el modal de modificación
        if (!modalModificarPaquete) {
            modalModificarPaquete = new bootstrap.Modal(document.getElementById('divModalModificarPaquete'));
        }
        modalModificarPaquete.show();
        frmModificarPaquete.style.display = 'block';

        actualizarDesplegableViajesModificado();
    }
}


async function procesarModificarPaquete() {
    // Recuperamos los datos del formulario frmModificarPaquete
    let id = frmModificarPaquete.idModificarPaquete.value.trim(); // Recuperar el ID
    let nombre = frmModificarPaquete.nombreModificarPaquete.value.trim();
    let tipo = frmModificarPaquete.tipoModificarPaquete.value.trim();
    let alojamiento = frmModificarPaquete.alojamientoModificarPaquete.value.trim();
    let fechaInicio = frmModificarPaquete.fechaInicioModificarPaquete.value.trim();
    let fechaFin = frmModificarPaquete.fechaFinModificarPaquete.value.trim();
    let transporte = document.querySelector('input[name="transporteModificado"]:checked')?.value || "";
    let viaje_id = frmModificarPaquete.lstModificarViajes.value;

    if (validarFormularioModificarPaquete()) {
        let respuesta = await oPaquete.modificarPaquete(new Paquete(id, nombre, tipo, alojamiento, fechaInicio, fechaFin, transporte, viaje_id));
        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Resetear formulario
            frmModificarPaquete.reset();
            // Cerrar el modal
            modalModificarPaquete.hide();
            // Actualizar la lista de paquetes
            await procesarListarPaquete();
        }
    }
}

function validarFormularioModificarPaquete() {
    let id = frmModificarPaquete.idModificarPaquete.value.trim();
    let nombre = frmModificarPaquete.nombreModificarPaquete.value.trim();
    let tipo = frmModificarPaquete.tipoModificarPaquete.value.trim();
    let alojamiento = frmModificarPaquete.alojamientoModificarPaquete.value.trim();
    let fechainicio = frmModificarPaquete.fechaInicioModificarPaquete.value.trim();
    let fechafin = frmModificarPaquete.fechaFinModificarPaquete.value.trim();
    let viaje_id = frmModificarPaquete.lstModificarViajes.value.trim();
    let transporte = document.querySelector('input[name="transporteModificado"]:checked')?.value || "";
    
    let errores = "";
    let valido = true;

    if (nombre.length == 0 || tipo.length == 0 || alojamiento.length == 0 || fechainicio.length == 0 || fechafin.length == 0 || transporte.length == 0 || viaje_id.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar\n";
    }

    if (!fechainicio || !fechafin || new Date(fechainicio) > new Date(fechafin)) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        return false;
    }    

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function actualizarDesplegableViajes(){
    const respuesta = await oPaquete.getViajes();

    if(respuesta.ok){
        let optionsViajes = "";
        for(let viaje of respuesta.datos){
            optionsViajes += `<option value="${viaje.id}">${viaje.origen} - ${viaje.destino}</option>`;
        }

        frmPaquetes.lstViajes.innerHTML  = optionsViajes;
    } else{
        alert("Error al recuperar los platos");
    }
}


async function actualizarDesplegableViajesModificado() {
    const respuesta = await oPaquete.getViajes();

    if (respuesta.ok) {
        let optionsViajes = "";
        if (Array.isArray(respuesta.datos) && respuesta.datos.length > 0) {
            for (let viaje of respuesta.datos) {
                optionsViajes += `<option value="${viaje.id}">${viaje.origen} - ${viaje.destino}</option>`;
            }
            frmModificarPaquete.lstModificarViajes.innerHTML = optionsViajes;
        } else {
            alert("No se encontraron viajes disponibles.");
        }
    } else {
        alert("Error al recuperar los viajes. Por favor, inténtalo de nuevo.");
    }
}

async function procesarBuscarPaquete() {
    if (validarBuscarPaquete()) {
        let id = frmBuscarPaquete.txtidBuscarPaquete.value.trim();

        let respuesta = await oPaquete.buscarPaquete(id);

        let listado = "";

        if (respuesta.ok) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            listado += "<table id='listadoPaquetes'>";
            listado += "<thead><tr><th>ID</th><th>NOMBRE</th><th>TIPO PAQUETE</th><th>TIPO ALOJAMIENTO</th><th>FECHA INICIO</th><th>FECHA FIN</th><th>TRANSPORTE</th><th>ID VIAJE</th><th>ACCIÓN</th></tr></thead>";
            listado += "<tbody>";
            listado += "<tr><td>" + respuesta.datos.id + "</td>";
            listado += "<td>" + respuesta.datos.nombrepaquete + "</td>";
            listado += "<td>" + respuesta.datos.tipopaquete + "</td>";
            listado += "<td>" + respuesta.datos.tipoalojamiento + "</td>";
            listado += "<td>" + respuesta.datos.fechainicio + "</td>";
            listado += "<td>" + respuesta.datos.fechafin + "</td>";
            listado += "<td>" + respuesta.datos.transporte + "</td>";
            listado += "<td>" + respuesta.datos.viaje_id + "</td>";
            listado += "<td><button type='button' class='btn-person' value='' id='btnBorrarPaquete' data-paquete='" + respuesta.datos.id + "'><i class='bi bi-trash3'></i></button> </td>";
            listado += "</tbody></table>";

            resultadoBusqueda.innerHTML = listado;
            resultadoBusqueda.style.display = 'block';
            
            frmBuscarPaquete.reset();
            frmBuscarPaquete.style.display = "none";

            // Ahora agregar el evento de borrado
            let botonBorrar = document.querySelector("#btnBorrarPaquete");
            if (botonBorrar) {
                botonBorrar.addEventListener("click", borrarPaquete);
            }
        } else {
            alert(respuesta.mensaje);
        }
    }
}

function validarBuscarPaquete() {
    let id = frmBuscarPaquete.txtidBuscarPaquete.value.trim();
    let valido = true;
    let errores = "";

    if (id < 1) {
        valido = false;
        errores += "El ID introducido no es válido"
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function borrarPaquete(oEvento) {
    // Seleccionamos el botón con `closest` para acceder a `data-paquete`.
    let boton = oEvento.target.closest("button");
    let id = boton.dataset.paquete;

    let respuesta = await oPaquete.borrarPaquete(id);

    alert(respuesta.mensaje);

    // Si se ha borrado correctamente, ocultamos el resultado
    if (respuesta.ok) {
        document.querySelector("#resultadoBusqueda").innerHTML = "";
        resultadoBusqueda.style.display = 'none';
    }
}

async function actualizarDesplegablePaquetes() {
    const respuesta = await oPaquete.getPaquetes();

    if (respuesta && respuesta.ok && Array.isArray(respuesta.datos)) {
        let optionsPaquetes = "";
        for (let paquete of respuesta.datos) {
            optionsPaquetes += `<option value="${paquete.id}">${paquete.nombrepaquete}</option>`;
        }

        frmListarClientesPorPaquete.lstPaquetesClientes.innerHTML = optionsPaquetes;
        frmAñadirPaquetesACliente.lstPaquetes.innerHTML = optionsPaquetes;
    } else {
        alert("Error al recuperar los paquetes o formato inesperado en los datos.");
    }
}

async function actualizarDesplegableClientesPorPaquetes() {
    const respuesta = await oPaquete.getPaquetes();

    if (respuesta && respuesta.ok && Array.isArray(respuesta.datos)) {
        let optionsPaquetes = "";
        for (let paquete of respuesta.datos) {
            optionsPaquetes += `<option value="${paquete.id}">${paquete.nombrepaquete}</option>`;
        }

        frmListarClientesPorPaquete.lstPaquetesClientes.innerHTML = optionsPaquetes;
    } else {
        alert("Error al recuperar los paquetes o formato inesperado en los datos.");
    }
}

async function procesarBuscarClientePorPaquete() {
    let id = frmListarClientesPorPaquete.lstPaquetesClientes.value.trim();
    
    const respuesta = await oPaquete.buscarPaqueteCliente(id);

    if (respuesta && respuesta.ok && Array.isArray(respuesta.datos)) {
        let optionsClientes = "";
        for (let cliente of respuesta.datos) {
            optionsClientes += `<option value="${cliente.dni_cliente}">${cliente.dni_cliente} - ${cliente.nombre}</option>`;
        }

        frmListarClientesPorPaquete.lstClientePorPaquete.innerHTML = optionsClientes;
    } else {
        alert("No existe clientes para ese paquete");
    }
}

// VIAJES
async function procesarAltaViaje() {
    if (validarFormularioAltaViaje()) { // Verifica que el formulario esté correcto
        let origen = frmViajes.txtOrigen.value.trim(); // Obtiene el valor del campo 'origen'
        let destino = frmViajes.txtDestino.value.trim(); 
        let fechaInicio = frmViajes.fechaInicio.value.trim();
        let fechaFin = frmViajes.fechaFin.value.trim();

        let viaje = new Viaje(null, origen, destino, fechaInicio, fechaFin);
        console.log("Viaje: " + viaje.toString());

        let respuesta = await viaje.AltaViaje();

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            frmViajes.reset();
            frmViajes.style.display = "none";
        }
    }
}

function validarFormularioAltaViaje() {
    let origen = frmViajes.txtOrigen.value.trim();
    let destino = frmViajes.txtDestino.value.trim();
    let fechainicio = frmViajes.fechaInicio.value;
    let fechafin = frmViajes.fechaFin.value;

    let errores = "";
    let valido = true;

    // Verificar que todos los campos obligatorios están llenos
    if (origen.length == 0 || destino.length == 0 || fechainicio.length == 0 || fechafin.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar\n";
    }

    if (!fechainicio || !fechafin || new Date(fechainicio) > new Date(fechafin)) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        return false;
    }  

    if (!valido) {
        alert(errores);
    }

    return valido;
}


async function procesarListarViaje() {
    let respuesta = await oViaje.listarViajes();

    let listado = "";

    if (!respuesta.ok) {
        listado = respuesta.mensaje;
    } else {
        // Verifica si la propiedad 'datos' existe y es un arreglo
        if (Array.isArray(respuesta.datos)) {
            listado += "<table id='listadoViajes'>";
            listado += "<thead><tr><th>ID</th><th>ORIGEN</th><th>DESTINO</th><th>FECHA INICIO</th><th>FECHA FIN</th><th>ACCIÓN</th></tr></thead>";
            listado += "<tbody>";

            for (let viaje of respuesta.datos) {
                listado += "<tr><td>" + viaje.id + "</td>";
                listado += "<td>" + viaje.origen + "</td>";
                listado += "<td>" + viaje.destino + "</td>";
                listado += "<td>" + viaje.fechainicio + "</td>";
                listado += "<td>" + viaje.fechafin + "</td>";
                listado += "<td><button type='button' class='btn-person' id='btnModificarPaquete' data-viaje='" + JSON.stringify(viaje) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
            }
            listado += "</tbody></table>";
        } else {
            listado = "No se encontraron paquetes o los datos están mal formateados.";
        }
    }
    ocultarFormularios();
    resultadoBusqueda.innerHTML = listado;
    resultadoBusqueda.style.display = 'block';

    // Registramos evento para el botón Modificar
    document.querySelector("#listadoViajes").addEventListener("click", procesarBotonModificarViaje);
}

async function procesarBuscarViaje() {
    if (validarBuscarViaje()) {
        let id = frmBuscarViaje.txtidBuscarViaje.value.trim();

        let respuesta = await oViaje.buscarViaje(id);

        let listado = "";

        if (respuesta.ok) {
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            listado += "<table id='listadoViajes'>";
            listado += "<thead><tr><th>ID</th><th>ORIGEN</th><th>DESTINO</th><th>FECHA INICIO</th><th>FECHA FIN</th><th>ACCIÓN</th></thead>";
            listado += "<tbody>";
            listado += "<tr><td>" + respuesta.datos.id + "</td>";
            listado += "<td>" + respuesta.datos.origen + "</td>";
            listado += "<td>" + respuesta.datos.destino + "</td>";
            listado += "<td>" + respuesta.datos.fechainicio + "</td>";
            listado += "<td>" + respuesta.datos.fechafin + "</td>";
            listado += "<td><button type='button' class='btn-person' value='' id='btnBorrarViaje' data-viaje='" + respuesta.datos.id + "'><i class='bi bi-trash3'></i></button> </td>";
            listado += "</tbody></table>";

            resultadoBusqueda.innerHTML = listado;
            resultadoBusqueda.style.display = 'block';
            // Borramos el formulario
            frmBuscarViaje.reset();
            // Ocultamos el formulario
            frmBuscarViaje.style.display = "none";

            // Ahora agregar el evento de borrado
            let botonBorrar = document.querySelector("#btnBorrarViaje");
            if (botonBorrar) {
                botonBorrar.addEventListener("click", borrarViaje);
            }
        } else {
            alert(respuesta.mensaje);
        }
    }
}

function validarBuscarViaje() {
    let id = frmBuscarViaje.txtidBuscarViaje.value.trim();
    let valido = true;
    let errores = "";

    if (id < 1) {
        valido = false;
        errores += "El ID introducido no es válido"
    }

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function borrarViaje(oEvento) {
    // Seleccionamos el botón con `closest` para acceder a `data-viaje`.
    let boton = oEvento.target.closest("button");
    let id = boton.dataset.viaje;

    let respuesta = await oViaje.borrarViaje(id);

    alert(respuesta.mensaje);

    // Si se ha borrado correctamente, ocultamos el resultado
    if (respuesta.ok) {
        document.querySelector("#resultadoBusqueda").innerHTML = "";
        resultadoBusqueda.style.display = 'none';
    }
}

let modalModificarViaje = null;

function procesarBotonModificarViaje(oEvento) {
    let boton = null;

    // Verificar si se ha hecho clic en el botón de modificar
    if (oEvento.target.nodeName === "I" || oEvento.target.nodeName === "BUTTON") {
        boton = oEvento.target.closest("button");

        let viaje = JSON.parse(boton.dataset.viaje); // Recuperamos los datos del paquete

        // Llenar los campos del formulario de modificación
        frmModificarViaje.idModificarViaje.value = viaje.id;
        frmModificarViaje.txtOrigenMod.value = viaje.origen;
        frmModificarViaje.txtDestinoMod.value = viaje.destino;
        frmModificarViaje.fechaInicioMod.value = viaje.fechainicio;
        frmModificarViaje.fechaFinMod.value = viaje.fechafin;

        // Mostrar el modal de modificación
        if (!modalModificarViaje) {
            modalModificarViaje = new bootstrap.Modal(document.getElementById('divModalModificarViaje'));
        }
        modalModificarViaje.show();
        frmModificarViaje.style.display = 'block';
    }
}


async function procesarModificarViaje() {
    // Recuperamos los datos del formulario frmModificarPaquete
    let id = frmModificarViaje.idModificarViaje.value.trim(); // Recuperar el ID
    let origen = frmModificarViaje.txtOrigenMod.value.trim();
    let destino = frmModificarViaje.txtDestinoMod.value.trim();
    let fechaInicio = frmModificarViaje.fechaInicioMod.value.trim();
    let fechaFin = frmModificarViaje.fechaFinMod.value.trim();

    if (validarFormularioModificarViaje()) {
        let respuesta = await oViaje.modificarViaje(new Viaje(id, origen, destino, fechaInicio, fechaFin));
        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Resetear formulario
            frmModificarViaje.reset();
            // Cerrar el modal
            modalModificarViaje.hide();
            // Actualizar la lista de paquetes
            await procesarListarViaje();
        }
    }
}

function validarFormularioModificarViaje() {
    let origen = frmModificarViaje.txtOrigenMod.value.trim();
    let destino = frmModificarViaje.txtDestinoMod.value.trim();
    let fechaInicio = frmModificarViaje.fechaInicioMod.value.trim();
    let fechaFin = frmModificarViaje.fechaFinMod.value.trim();
    
    let errores = "";
    let valido = true;

    if (origen.length == 0 || destino.length == 0 || fechaInicio.length == 0 || fechaFin.length == 0) {
        valido = false;
        errores += "Existen campos sin rellenar\n";
    }

    if (!fechaInicio || !fechaFin || new Date(fechaInicio) > new Date(fechaFin)) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        return false;
    }    

    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function actualizarDesplegableViaje() {
    const respuesta = await oPaquete.getViajes();

    if (respuesta && respuesta.ok && Array.isArray(respuesta.datos)) {
        let optionsViaje = "";
        for (let viaje of respuesta.datos) {
            optionsViaje += `<option value="${viaje.id}">${viaje.origen} - ${viaje.destino}</option>`;
        }

        frmListarPaquetesPorViaje.lstPaquetesViaje.innerHTML = optionsViaje;
    } else {
        alert("Error al recuperar los paquetes o formato inesperado en los datos.");
    }
}

async function procesarBuscarPaquetesPorViaje() {
    let id = frmListarPaquetesPorViaje.lstPaquetesViaje.value.trim();

    const respuesta = await oViaje.buscarPaquetesViaje(id);

    if (respuesta && respuesta.ok && Array.isArray(respuesta.datos)) {
        let optionsPack = "";
        for (let paquete of respuesta.datos) {
            optionsPack += `<option value="${paquete.id}">${paquete.nombrepaquete}</option>`;
        }

        frmListarPaquetesPorViaje.lstPaquetesPorViaje.innerHTML = optionsPack;
    } else {
        alert("No existen paquetes para ese viaje");
    }
}
