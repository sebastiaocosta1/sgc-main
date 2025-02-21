import { Request, Response } from "express";
import { Administrador } from "../../dominio/entidades/AdministradorEntity";
import InterfaceAdministradorRepository from "../../dominio/repositorios/interfaces/InterfaceAdministradorRepository";
import bcrypt from "bcrypt";

export default class AdministradorController {
    constructor(private repository: InterfaceAdministradorRepository) {}
   
    async criaAdministrador(req: Request, res: Response): Promise<void> {
        try {
            const { nomeCompleto, cpf, cargo, usuario, senha } = <Administrador>req.body;
           
            if (!nomeCompleto || !cpf || !cargo || !usuario || !senha) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                return;
            }
            
            const senhaHash = await bcrypt.hash(senha, 10);            
            const novoAdministrador = new Administrador(nomeCompleto, cpf, cargo, usuario, senhaHash);
            

            await this.repository.criaAdministrador(novoAdministrador);

            res.status(201).json(novoAdministrador);

        } catch (error) {
            console.error("Erro ao criar administrador:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // Listar todos os administradores
    async listaAdministradores(req: Request, res: Response): Promise<void> {
        try {
            const administradores = await this.repository.listaAdministradores();
            res.status(200).json(administradores);
        } catch (error) {
            console.log("teste")
            console.error("Erro ao listar administradores:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // Listar um administrador por ID
    async listaAdministrador(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const administrador = await this.repository.listaAdministrador(Number(id));

            if (!administrador) {
                res.status(404).json({ message: "Administrador não encontrado." });
                return;
            }

            res.status(200).json(administrador);
        } catch (error) {
            console.error("Erro ao buscar administrador:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    // Atualizar dados de um administrador
    async atualizaAdministrador(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nomeCompleto, cpf, cargo, usuario, senha } = req.body as Administrador;

            // Hash da nova senha, caso fornecida
            const senhaHash = senha ? await bcrypt.hash(senha, 10) : undefined;

            const dadosAtualizados = {
                nomeCompleto,
                cpf,
                cargo,
                usuario,
                ...(senhaHash && { senha: senhaHash }),
            };

            const { success, message } = await this.repository.atualizaAdministrador(
                Number(id),
                dadosAtualizados as Administrador
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar administrador:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaAdministrador(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaAdministrador(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar administrador:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
