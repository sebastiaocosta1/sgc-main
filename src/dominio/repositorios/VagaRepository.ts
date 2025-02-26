import { Repository } from "typeorm";
import { Vagas } from "../entidades/VagaEntity";
import InterfaceVagaRepository from "./interfaces/InterfaceVagaRepository";

export default class VagaRepository implements InterfaceVagaRepository {
    private repository: Repository<Vagas>;

    constructor(repository: Repository<Vagas>) {
        this.repository = repository;
    }

    criaVaga(vaga: Vagas): void {
        this.repository.save(vaga);
    }

    async listaVagas(): Promise<Vagas[]> {
        return await this.repository.find({ relations: ["empresa"] });
    }

    async listaVaga(id: number): Promise<Vagas | null> {
        return await this.repository.findOne({ where: {idVagas: id }, relations: ["empresa"] });
    }

    async atualizaVaga(
        id: number,
        vaga: Vagas
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const vagaToUpdate = await this.repository.findOne({ where: { idVagas: id } });

            if (!vagaToUpdate) {
                return { success: false, message: "Vaga não encontrada." };
            }

            Object.assign(vagaToUpdate, vaga);

            await this.repository.save(vagaToUpdate);
            return { success: true, message: "Vaga atualizada com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar vaga:", error);
            return { success: false, message: "Erro ao atualizar a vaga." };
        }
    }

    async deletaVaga(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const vagaToDelete = await this.repository.findOne({ where: { idVagas: id } });

            if (!vagaToDelete) {
                return { success: false, message: "Vaga não encontrada." };
            }

            await this.repository.remove(vagaToDelete);
            return { success: true, message: "Vaga excluída com sucesso!" };
        } catch (error) {
            console.error("Erro ao excluir vaga:", error);
            return { success: false, message: "Erro ao excluir a vaga." };
        }
    }
}
