import { Request, Response } from "express";
import { Candidaturas } from "../../dominio/entidades/CandidaturaEntity";
import InterfaceCandidaturaRepository from "../../dominio/repositorios/interfaces/InterfaceCandidaturaRepository";

export default class CandidaturaController {
    constructor(private repository: InterfaceCandidaturaRepository) {}

    async criaCandidatura(req: Request, res: Response): Promise<void> {
        try {
            const { dataCandidatura, statusCandidatura, vaga, contratacao, entrevista, academico } = <Candidaturas>req.body;
            
            if (!dataCandidatura || !statusCandidatura || !vaga || !contratacao || !entrevista || !academico) {
                res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
                return;
            }

            const novaCandidatura = new Candidaturas(dataCandidatura, statusCandidatura, vaga, contratacao, entrevista, academico);
            await this.repository.criaCandidatura(novaCandidatura);

            res.status(201).json(novaCandidatura);
        } catch (error) {
            console.error("Erro ao criar candidatura:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaCandidaturas(req: Request, res: Response): Promise<void> {
        try {
            const candidaturas = await this.repository.listaCandidaturas();
            res.status(200).json(candidaturas);
        } catch (error) {
            console.error("Erro ao listar candidaturas:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaCandidatura(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const candidatura = await this.repository.listaCandidatura(Number(id));

            if (!candidatura) {
                res.status(404).json({ message: "Candidatura não encontrada." });
                return;
            }

            res.status(200).json(candidatura);
        } catch (error) {
            console.error("Erro ao buscar candidatura:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaCandidatura(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body as Candidaturas;

            const { success, message } = await this.repository.atualizaCandidatura(
                Number(id),
                dadosAtualizados
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar candidatura:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaCandidatura(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaCandidatura(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar candidatura:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
