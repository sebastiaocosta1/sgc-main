import { Repository } from "typeorm";
import { Administrador } from "../entidades/AdministradorEntity";
import InterfaceAdministradorRepository from "./interfaces/InterfaceAdministradorRepository";

export default class AdministradorRepository implements InterfaceAdministradorRepository {
    private repository: Repository<Administrador>;

    constructor(repository: Repository<Administrador>) {
        this.repository = repository;
    }

    criaAdministrador(admin: Administrador): void {
        this.repository.save(admin);
    }

    async listaAdministradores(): Promise<Administrador[]> {
        return await this.repository.find();
    }

    async listaAdministrador(id: number): Promise<Administrador> {
        return await this.repository.findOne({ where: { id: id } });
    }

    async atualizaAdministrador(
        id: number,
        admin: Administrador
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const adminToUpdate = await this.repository.findOne({ where: { id: id } });

            if (!adminToUpdate) {
                return { success: false, message: "Administrador não encontrado." };
            }

            Object.assign(adminToUpdate, admin);

            await this.repository.save(adminToUpdate);
            return { success: true, message: "Administrador atualizado com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar administrador:", error);
            return { success: false, message: "Erro ao atualizar o administrador." };
        }
    }

    async deletaAdministrador(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const adminToDelete = await this.repository.findOne({ where: { id: id } });

            if (!adminToDelete) {
                return { success: false, message: "Administrador não encontrado." };
            }

            await this.repository.remove(adminToDelete);
            return { success: true, message: "Administrador excluído com sucesso!" };
        } catch (error) {
            console.error("Erro ao excluir administrador:", error);
            return { success: false, message: "Erro ao excluir o administrador." };
        }
    }
}
