import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario[]=[];
    constructor() {}

    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id: string, nombre : string ) {
        for(let usuario of this.lista) {
            if(usuario.id == id) {
                usuario.nombre = nombre;
                break;
            }

        }
        console.log("actualizando un usuario");
        console.log(this.lista);
    }

    public getLista() : Usuario[] {
        return this.lista;
    }

    public getUsuario(id: string)  {
        return this.lista.find(usuario => usuario.id == id);
    }

    public getUsuarioBySala(sala : string) {
        return this.lista.filter(usuario => usuario.sala == sala);
    }

    public borrarUsuario(id : string) {
       let temUser = this.getUsuario(id);
       this.lista = this.lista.filter(usuario =>{
           return usuario.id !== usuario.id;
       });
    }

}