import { Request, Response, NextFunction } from "express";
import { Usuario } from "../../dominio/entidades/UsuarioEntity";
import InterfaceUsuarioRepository from "../../dominio/repositorios/interfaces/InterfaceUserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

type JwtPayload = { id: number};

export default class UsuarioController {
    constructor(private repository: InterfaceUsuarioRepository) {}

    async login(req: Request, res: Response) {
        const { usuario, senha } = req.body;

        // console.log(req.body)
    
        const usuarioRepository = AppDataSource.getRepository(Usuario);
        const usuarioExistente = await usuarioRepository.findOne({ where: { usuario } });   
    
        if (!usuarioExistente) {
            return res.status(400).json({ message: "Usuário ou senha inválidos." });
        }
    
        const verificaSenha = await bcrypt.compare(senha, usuarioExistente.senha);
    
        if (!verificaSenha) {
            return res.status(400).json({ message: "Usuário ou senha inválidos...." }); // ✅ Adicionado `return`
        }
    
        const token = jwt.sign(
            { id: usuarioExistente.idUsuario },
            process.env.JWT_PASS ?? '',
            { expiresIn: '8h' }
        );
    
        return res.json({ message: "Usuário autenticado com sucesso!", usuarioExistente, token: token});
    }
    
       async criaUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { usuario, senha, tipo, status } = <Usuario>req.body;
           
            if (!usuario || !senha || !tipo || !status) {
                res.status(400).json({ message: "Todos os campos são obrigatórios." });
                //console.log(req.body);
                return;
            }
            
            const senhaHash = await bcrypt.hash(senha, 10);            
            const novoUsuario = new Usuario(usuario, senhaHash, tipo, status);

            await this.repository.criaUsuario(novoUsuario);
            res.status(201).json(novoUsuario);

        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await this.repository.listaUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const usuario = await this.repository.listaUsuario(Number(id));

            if (!usuario) {
                res.status(404).json({ message: "Usuário não encontrado." });
                return;
            }

            res.status(200).json(usuario);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { usuario, senha, tipo } = req.body as Usuario;

            const senhaHash = senha ? await bcrypt.hash(senha, 10) : undefined;

            const dadosAtualizados = {
                usuario,
                senha,
                ...(senhaHash && { senha: senhaHash }),
            };

            const { success, message } = await this.repository.atualizaUsuarios(
                Number(id),
                dadosAtualizados as Usuario
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaUsuarios(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }    
}
