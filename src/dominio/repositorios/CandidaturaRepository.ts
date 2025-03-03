import { Repository } from "typeorm";
import { Candidaturas } from "../entidades/CandidaturaEntity";
import InterfaceCandidaturaRepository from "./interfaces/InterfaceCandidaturaRepository";

export default class CandidaturaRepository implements InterfaceCandidaturaRepository {
    private repository: Repository<Candidaturas>;

    constructor(repository: Repository<Candidaturas>) {
        this.repository = repository;
    }

    criaCandidatura(candidatura: Candidaturas): void {
        this.repository.save(candidatura);
    }

    async listaCandidaturas(): Promise<Candidaturas[]> {
        return await this.repository.find();
    }

    async listaCandidatura(id: number): Promise<Candidaturas | null> {
        return await this.repository.findOne({ where: { idCandidatura: id } });
    }

    async atualizaCandidatura(
        id: number,
        candidatura: Candidaturas
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const candidaturaToUpdate = await this.repository.findOne({ where: { idCandidatura: id } });

            if (!candidaturaToUpdate) {
                return { success: false, message: "Candidatura não encontrada." };
            }

            Object.assign(candidaturaToUpdate, candidatura);

            await this.repository.save(candidaturaToUpdate);
            return { success: true, message: "Candidatura atualizada com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar candidatura:", error);
            return { success: false, message: "Erro ao atualizar a candidatura." };
        }
    }

    async deletaCandidatura(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const candidaturaToDelete = await this.repository.findOne({ where: { idCandidatura: id } });

            if (!candidaturaToDelete) {
                return { success: false, message: "Candidatura não encontrada." };
            }

            await this.repository.remove(candidaturaToDelete);
            return { success: true, message: "Candidatura excluída com sucesso!" };
        } catch (error) {
            console.error("Erro ao excluir candidatura:", error);
            return { success: false, message: "Erro ao excluir a candidatura." };
        }
    }
}
