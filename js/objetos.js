"use strict";

class Cliente {

    constructor(nombre, dni, email, telefono, direccion) {
        this.nombre = nombre;
        this.dni = dni;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
    }
    toString() {
        return `Cliente:
        Nombre: ${this.nombre}
        DNI: ${this.dni}
        Email: ${this.email}
        Teléfono: ${this.telefono}
        Dirección: ${this.direccion}`;
    }

    async AltaCliente() {
        let datos = new FormData();

        datos.append("nombre", this.nombre);
        datos.append("dni", this.dni);
        datos.append("email", this.email);
        datos.append("telefono", this.telefono);
        datos.append("direccion", this.direccion);

        let respuesta = await peticionPOST("alta_cliente.php", datos);

        return respuesta;
    }

    async buscarCliente(dni) {
        let datos = new FormData();

        datos.append("dni", dni);

        let respuesta = await peticionPOST("buscar_cliente.php", datos);

        return respuesta;
    }

    async borrarCliente(dni) {
        let datos = new FormData();

        datos.append("dni", dni);

        let respuesta = await peticionPOST("borrar_cliente.php", datos);

        return respuesta;
    }

    async listarClientes() {
        let datos = new FormData();

        let respuesta = await peticionPOST("listar_clientes.php", datos);

        return respuesta;
    }

    async modificarCliente(oCliente) {
        let datos = new FormData();

        // datos.append("cliente", JSON.stringify(oCliente));
        datos.append("cliente", JSON.stringify({
            nombre: oCliente.nombre,
            email: oCliente.email,
            telefono: oCliente.telefono,
            direccion: oCliente.direccion,
            dni: oCliente.dni
        }));

        let respuesta = await peticionPOST("modificar_cliente.php", datos);

        return respuesta;
    }

    async añadirPaqueteACliente(dni, idPaquete) {
        let datos = new FormData();
        datos.append("dni_cliente", dni);
        datos.append("id_paquete", idPaquete);

        let respuesta = await peticionPOST("añadir_paquete_cliente.php", datos);
        
        return respuesta;
    }

    async listarPaquetesDeCliente(dni) {
        let datos = new FormData();
        datos.append("dni_cliente", dni);

        let respuesta = await peticionPOST("listar_paquetes_cliente.php", datos);

        return respuesta;
    }
}

//Clase paquete
class Paquete {

    constructor(id, nombrepaquete, tipopaquete, tipoalojamiento, fechainicio, fechafin, transporte, viaje_id) {
        this.id = id;
        this.nombrepaquete = nombrepaquete;
        this.tipopaquete = tipopaquete;
        this.tipoalojamiento = tipoalojamiento;
        this.fechainicio = fechainicio;
        this.fechafin = fechafin;
        this.transporte = transporte;
        this.viaje_id = viaje_id;
    }

    toString() {
        return `Paquete:
        Nombre del Paquete: ${this.nombrepaquete}
        Tipo de Paquete: ${this.tipopaquete}
        Tipo de Alojamiento: ${this.tipoalojamiento}
        Fecha Inicio: ${this.fechainicio}
        Fecha Fin: ${this.fechafin}
        Transporte: ${this.transporte}
        Viaje: ${this.viaje_id}`;
    }

    async AltaPaquete() {
        let datos = new FormData();

        datos.append("nombrepaquete", this.nombrepaquete);
        datos.append("tipopaquete", this.tipopaquete);
        datos.append("tipoalojamiento", this.tipoalojamiento);
        datos.append("fechainicio", this.fechainicio);
        datos.append("fechafin", this.fechafin);
        datos.append("transporte", this.transporte);
        datos.append("viaje_id", this.viaje_id);

        let respuesta = await peticionPOST("alta_paquete.php", datos);

        console.log("Respuesta del servidor:", respuesta); 
        return respuesta;
    }

    async listarPaquetes() {
        let datos = new FormData();

        let respuesta = await peticionPOST("listar_paquetes.php", datos);

        return respuesta;
    }

    async modificarPaquete(oPaquete) {
        let datos = new FormData();

        datos.append("paquete", JSON.stringify({
            id: oPaquete.id, // Incluye el ID en la petición
            nombrepaquete: oPaquete.nombrepaquete,
            tipopaquete: oPaquete.tipopaquete,
            tipoalojamiento: oPaquete.tipoalojamiento,
            fechainicio: oPaquete.fechainicio,
            fechafin: oPaquete.fechafin,
            transporte: oPaquete.transporte,
            viaje_id: oPaquete.viaje_id
        }));

        let respuesta = await peticionPOST("modificar_paquete.php", datos);

        return respuesta;
    }

    async getViajes() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_viajes.php", datos);

        return respuesta;
    }

    async getPaquetes() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_paquetes.php", datos);

        return respuesta;
    }

    async buscarPaquete(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("buscar_paquete.php", datos);

        return respuesta;
    }

    async buscarPaqueteCliente(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("buscar_cliente_paquete.php", datos);

        return respuesta;
    }

    async borrarPaquete(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("borrar_paquete.php", datos);

        return respuesta;
    }

}

class Viaje {
    constructor(id, origen, destino, fechaInicio, fechaFin) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    toString() {
        return `Viaje:
                Origen: ${this.origen}
                Destino: ${this.destino}
                Fecha Inicio: ${this.fechaInicio}
                Fecha Fin: ${this.fechaFin}`;
    }

    async AltaViaje() {
        let datos = new FormData();
        
        datos.append("origen", this.origen);
        datos.append("destino", this.destino);
        datos.append("fechaInicio", this.fechaInicio);
        datos.append("fechaFin", this.fechaFin);

        let respuesta = await peticionPOST("alta_viaje.php", datos);

        console.log("Respuesta del servidor:", respuesta); 
        return respuesta;
    }

    async listarViajes() {
        let datos = new FormData();

        let respuesta = await peticionPOST("listar_viajes.php", datos);

        return respuesta;
    }

    async buscarViaje(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("buscar_viaje.php", datos);

        return respuesta;
    }

    async borrarViaje(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("borrar_viaje.php", datos);

        return respuesta;
    }

    async modificarViaje(oViaje) {
        let datos = new FormData();

        datos.append("viaje", JSON.stringify({
            id: oViaje.id, // Incluye el ID en la petición
            origen: oViaje.origen,
            destino: oViaje.destino,            
            fechainicio: oViaje.fechaInicio,
            fechafin: oViaje.fechaFin,        
        }));

        let respuesta = await peticionPOST("modificar_viaje.php", datos);

        return respuesta;
    }

    async buscarPaquetesViaje(id) {
        let datos = new FormData();

        datos.append("id", id);

        let respuesta = await peticionPOST("buscar_paquete_viaje.php", datos);

        return respuesta;
    }
}