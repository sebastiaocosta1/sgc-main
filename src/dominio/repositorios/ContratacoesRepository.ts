import { Repository } from "typeorm";
import { Contratacoes } from "../entidades/ContratacoesEntity";
import InterfaceContratacaoRepository from "./interfaces/InterfaceContratacaoRespository";

export default class ContratacaoRepository implements InterfaceContratacaoRepository {
    private repository: Repository<Contratacoes>;

    constructor(repository: Repository<Contratacoes>) {
        this.repository = repository;
    }

    criaContratacao(contratacao: Contratacoes): void {
        this.repository.save(contratacao);
    }

    async listaContratacoes(): Promise<Contratacoes[]> {
        return await this.repository.find();
    }

    async listaContratacao(id: number): Promise<Contratacoes | null> {
        return await this.repository.findOne({ where: { idContratacao: id } });
    }

    async atualizaContratacao(
        id: number,
        contratacao: Contratacoes
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const contratacaoToUpdate = await this.repository.findOne({ where: { idContratacao: id } });

            if (!contratacaoToUpdate) {
                return { success: false, message: "Contratação não encontrada." };
            }

            Object.assign(contratacaoToUpdate, contratacao);

            await this.repository.save(contratacaoToUpdate);
            return { success: true, message: "Contratação atualizada com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar contratação:", error);
            return { success: false, message: "Erro ao atualizar a contratação." };
        }
    }

    async deletaContratacao(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const contratacaoToDelete = await this.repository.findOne({ where: { idContratacao: id } });

            if (!contratacaoToDelete) {
                return { success: false, message: "Contratação não encontrada." };
            }

            await this.repository.remove(contratacaoToDelete);
            return { success: true, message: "Contratação excluída com sucesso!" };
        } catch (error) {
            console.error("Erro ao excluir contratação:", error);
            return { success: false, message: "Erro ao excluir a contratação." };
        }
    }
}