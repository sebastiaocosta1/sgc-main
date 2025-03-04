import { Request, Response } from "express";
import { Entrevista } from "../../dominio/entidades/EntrevistaEntity";
import InterfaceEntrevistaRepository from "../../dominio/repositorios/interfaces/InterfaceEntrevistaRepository";

export default class EntrevistaController {
    constructor(private repository: InterfaceEntrevistaRepository) {}
   
    async criaEntrevista(req: Request, res: Response): Promise<void> {
        try {
            const { data, hora, modalidade, texto, respostaConvidado, candidatura } = <Entrevista>req.body;
           
            if (!data || !hora || !modalidade || !texto || !respostaConvidado || !candidatura) {
                res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
                return;
            }
            //console.log(req.body)
            
            const novaEntrevista = new Entrevista(data, hora, modalidade, texto, respostaConvidado, candidatura);

            await this.repository.criaEntrevista(novaEntrevista);
            res.status(201).json(novaEntrevista);

        } catch (error) {
            console.error("Erro ao criar entrevista:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEntrevistas(req: Request, res: Response): Promise<void> {
        try {
            const entrevistas = await this.repository.listaEntrevistas();
            res.status(200).json(entrevistas);
        } catch (error) {
            console.error("Erro ao listar entrevistas:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEntrevista(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const entrevista = await this.repository.listaEntrevista(Number(id));

            if (!entrevista) {
                res.status(404).json({ message: "Entrevista não encontrada." });
                return;
            }

            res.status(200).json(entrevista);
        } catch (error) {
            console.error("Erro ao buscar entrevista:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaEntrevista(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { data, hora, modalidade, texto, respostaConvidado, candidatura } = req.body as Entrevista;

            const dadosAtualizados = {
                data,
                hora,
                modalidade,
                texto,
                respostaConvidado,
                candidatura,
            };

            const { success, message } = await this.repository.atualizaEntrevista(
                Number(id),
                dadosAtualizados as Entrevista
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar entrevista:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaEntrevista(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaEntrevista(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar entrevista:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
