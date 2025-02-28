import { Request, Response } from "express";
import { Vagas } from "../../dominio/entidades/VagaEntity";
import InterfaceVagasRepository from "../../dominio/repositorios/interfaces/InterfaceVagaRepository";
import { log } from "console";

export default class VagasController {
    constructor(private repository: InterfaceVagasRepository) { }

    async criaVaga(req: Request, res: Response): Promise<void> {
        try {
            const {
                cargo,
                salario,
                tipo,
                horarioExpediente,
                principaisAtividades,
                dataPublicacao,
                statusVaga,
                statusCadastro,
                empresa,
            } = req.body as Vagas;


            if (!cargo || !salario || !tipo || !horarioExpediente || !principaisAtividades || !dataPublicacao || !statusVaga || !statusCadastro || !empresa) {
                res.status(400).json({ message: "Todos os campos obrigatórios devem ser fornecidos." });
                return;
            }

            const novaVaga = new Vagas(
                cargo,
                salario,
                tipo,
                horarioExpediente,
                principaisAtividades,
                new Date(dataPublicacao),
                statusVaga,
                statusCadastro,
                empresa
            );

            await this.repository.criaVaga(novaVaga);

            res.status(201).json(novaVaga);
        } catch (error) {
            console.error("Erro ao criar vaga:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaVagas(req: Request, res: Response): Promise<void> {
        try {
            const vagas = await this.repository.listaVagas();
            res.status(200).json(vagas);
        } catch (error) {
            console.error("Erro ao listar vagas:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaVaga(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const vaga = await this.repository.listaVaga(Number(id));

            if (!vaga) {
                res.status(404).json({ message: "Vaga não encontrada." });
                return;
            }

            res.status(200).json(vaga);
        } catch (error) {
            console.error("Erro ao buscar vaga:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaVaga(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const {
                cargo,
                salario,
                tipo,
                horarioExpediente,
                principaisAtividades,
                dataPublicacao,
                statusVaga,
                statusCadastro,
                empresa,
            } = req.body as Vagas;

            const dadosAtualizados = {
                cargo,
                salario,
                tipo,
                horarioExpediente,
                principaisAtividades,
                dataPublicacao: new Date(dataPublicacao),
                statusVaga,
                statusCadastro,
                empresa,
            };

            const { success, message } = await this.repository.atualizaVaga(
                Number(id),
                dadosAtualizados as Vagas
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar vaga:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaVaga(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaVaga(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar vaga:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}