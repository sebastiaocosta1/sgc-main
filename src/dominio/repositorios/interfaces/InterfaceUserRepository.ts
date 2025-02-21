import { Usuario } from "../../entidades/UsuarioEntity";

export default interface InterfaceUserRepository {
    criaUsuario(user: Usuario): void;
    listaUsuarios(): Array<Usuario> | Promise<Usuario[]>;
    listaUsuario(id: number): Promise<Usuario>;
    atualizaUsuarios(id:number, user: Usuario): Promise<{ success: boolean; message?: string }>;
    deletaUsuarios(id:number): Promise<{ success: boolean; message?: string }>;
}