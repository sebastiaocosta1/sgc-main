import { Repository } from "typeorm";
import { Usuario } from "../entidades/UsuarioEntity";
import InterfaceUserRepository from "./interfaces/InterfaceUserRepository";

export default class UsuarioRepository implements InterfaceUserRepository {
    private repository: Repository<Usuario>;

    constructor(repository: Repository<Usuario>) {
        this.repository = repository;
    }

    criaUsuario(usuario: Usuario): void {
        this.repository.save(usuario);
    }

    async listaUsuarios(): Promise<Usuario[]> {
        return await this.repository.find();
    }

    async listaUsuario(id: number): Promise<Usuario | null> {
        return await this.repository.findOne({ where: {  idUsuario: id } });
    }

    async atualizaUsuarios(
        id: number,
        usuario: Usuario
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const usuarioToUpdate = await this.repository.findOne({ where: { idUsuario: id } });

            if (!usuarioToUpdate) {
                return { success: false, message: "Usuário não encontrado." };
            }

            Object.assign(usuarioToUpdate, usuario);

            await this.repository.save(usuarioToUpdate);
            return { success: true, message: "Usuário atualizado com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return { success: false, message: "Erro ao atualizar o usuário." };
        }
    }

    async deletaUsuarios(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const usuarioToDelete = await this.repository.findOne({ where: { idUsuario: id } });

            if (!usuarioToDelete) {
                return { success: false, message: "Usuário não encontrado." };
            }

            await this.repository.remove(usuarioToDelete);
            return { success: true, message: "Usuário excluído com sucesso!" };
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            return { success: false, message: "Erro ao excluir o usuário." };
        }
    }

    async loginUsuario(usuario: string): Promise<Usuario | null> {
        return await this.repository.findOne({ where: { usuario: usuario } });
    }
}
