import { Request, Response } from "express";
import { Contratacoes } from "../../dominio/entidades/ContratacoesEntity";
import InterfaceContratacaoRepository from "../../dominio/repositorios/interfaces/InterfaceContratacaoRespository";

export default class ContratacaoController {
    constructor(private repository: InterfaceContratacaoRepository) {}

    async criaContratacao(req: Request, res: Response): Promise<void> {
        try {
            const { dataContratacao, candidatura } = <Contratacoes>req.body;
            
            if (!dataContratacao || !candidatura) {
                res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
                return;
            }

            const novaContratacao = new Contratacoes(dataContratacao, candidatura);
            await this.repository.criaContratacao(novaContratacao);

            res.status(201).json(novaContratacao);
        } catch (error) {
            console.error("Erro ao criar contratação:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaContratacoes(req: Request, res: Response): Promise<void> {
        try {
            const contratacoes = await this.repository.listaContratacoes();
            res.status(200).json(contratacoes);
        } catch (error) {
            console.error("Erro ao listar contratações:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaContratacao(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const contratacao = await this.repository.listaContratacao(Number(id));

            if (!contratacao) {
                res.status(404).json({ message: "Contratação não encontrada." });
                return;
            }

            res.status(200).json(contratacao);
        } catch (error) {
            console.error("Erro ao buscar contratação:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaContratacao(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body as Contratacoes;

            const { success, message } = await this.repository.atualizaContratacao(
                Number(id),
                dadosAtualizados
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar contratação:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaContratacao(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaContratacao(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar contratação:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}