import { Request, Response } from "express";
import { Endereco } from "../../dominio/entidades/EnderecoEntity";
import InterfaceEnderecoRepository from "../../dominio/repositorios/interfaces/InterfaceEnderecoRepository";

export default class EnderecoController {
    constructor(private repository: InterfaceEnderecoRepository) {}

    async criaEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { cep, cidade,   estado, rua,  numero, status } = <Endereco>req.body;

            //console.log(<Endereco>req.body)

            if (!cep || !cidade || !estado || !rua || !numero || !status) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }

            const novoEndereco = new Endereco(cep, cidade,   estado, rua,  numero, status);
            await this.repository.criaEndereco(novoEndereco);

            res.status(201).json(novoEndereco);
        } catch (error) {
            console.error("Erro ao criar endereço:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEnderecos(req: Request, res: Response): Promise<void> {
        try {
            const enderecos = await this.repository.listaEnderecos();
            res.status(200).json(enderecos);
        } catch (error) {
            console.error("Erro ao listar endereços:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const endereco = await this.repository.listaEndereco(Number(id));

            if (!endereco) {
                res.status(404).json({ message: "Endereço não encontrado." });
                return;
            }

            res.status(200).json(endereco);
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { cep, cidade,   estado, rua,  numero, status } = req.body as Endereco;

            const dadosAtualizados = { cep, cidade,   estado, rua,  numero, status };

            const { success, message } = await this.repository.atualizaEndereco(
                Number(id),
                dadosAtualizados as Endereco
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // async deletaEndereco(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id } = req.params;

    //         const { success, message } = await this.repository.deletaEndereco(Number(id));

    //         if (!success) {
    //             res.status(404).json({ message });
    //             return;
    //         }

    //         res.sendStatus(204);
    //     } catch (error) {
    //         console.error("Erro ao deletar endereço:", error);
    //         res.status(500).json({ message: "Erro interno do servidor." });
    //     }
    // }
}
