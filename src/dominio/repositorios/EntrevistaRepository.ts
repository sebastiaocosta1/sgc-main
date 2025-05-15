import { Repository } from "typeorm";
import { Entrevista } from "../entidades/EntrevistaEntity";
import InterfaceEntrevistaRepository from "./interfaces/InterfaceEntrevistaRepository";

export default class EntrevistaRepository implements InterfaceEntrevistaRepository {
    private repository: Repository<Entrevista>;

    constructor(repository: Repository<Entrevista>) {
        this.repository = repository;
    }

    criaEntrevista(entrevista: Entrevista): void {
        this.repository.save(entrevista);
    }

    async listaEntrevistas(): Promise<Entrevista[]> {
        return await this.repository.find();
    }

    async listaEntrevista(id: number): Promise<Entrevista | null> {
        return await this.repository.findOne({
            where: { idEntrevista: id },
            relations: {
                candidatura: {
                    academico: true,
                },
            },
        });
    }

    async atualizaEntrevista(
        id: number,
        entrevista: Entrevista
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const entrevistaToUpdate = await this.repository.findOne({ where: { idEntrevista: id } });

            if (!entrevistaToUpdate) {
                return { success: false, message: "Entrevista não encontrada." };
            }

            Object.assign(entrevistaToUpdate, entrevista);

            await this.repository.save(entrevistaToUpdate);
            return { success: true, message: "Entrevista atualizada com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar entrevista:", error);
            return { success: false, message: "Erro ao atualizar a entrevista." };
        }
    }

    async deletaEntrevista(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const entrevistaToDelete = await this.repository.findOne({ where: { idEntrevista: id } });

            if (!entrevistaToDelete) {
                return { success: false, message: "Entrevista não encontrada." };
            }

            await this.repository.remove(entrevistaToDelete);
            return { success: true, message: "Entrevista excluída com sucesso!" };
        } catch (error) {
            console.error("Erro ao excluir entrevista:", error);
            return { success: false, message: "Erro ao excluir a entrevista." };
        }
    }
}
