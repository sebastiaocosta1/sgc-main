import { Administrador } from "../../entidades/AdministradorEntity";

export default interface InterfaceAdministradorRepository {
    criaAdministrador(admin: Administrador): void;
    listaAdministradores(): Array<Administrador> | Promise<Administrador[]>;
    listaAdministrador(id?: number): Promise<Administrador>;
    atualizaAdministrador(id: number, admin: Administrador): Promise<{ success: boolean; message?: string }>;
    deletaAdministrador(id: number): Promise<{ success: boolean; message?: string }>;
}
