import { Socket } from "socket.io";
import { UsuariosLista } from "../businessTypes/usuarios-lista";
import { Usuario } from "../businessTypes/usuario";

export const usuariosDesconectados = new UsuariosLista();

export  const conectarCliente = (cliente : Socket) => {
  const usuario = new Usuario(cliente.id)
  usuariosDesconectados.agregar(usuario);
}

export const desconectar = (cliente :  Socket) => {
    cliente.on('disconnect', () => {
        usuariosDesconectados.borrarUsuario(cliente.id);
        console.log('Cliente desconentado');
    });
}

export const mensaje = (cliente: Socket, io : SocketIO.Server) => {
    cliente.on('mensaje', (payload : any)=>{
        console.log('Mensaje Recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

export const configurarUsuario = (cliente: Socket) => {
    cliente.on('configurar-usuario', (payload : any, callback : Function)=>{
        usuariosDesconectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre}, configurado`
        });
    });
}