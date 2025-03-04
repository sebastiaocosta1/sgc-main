import { Request, Response } from "express";
import { Empresa } from "../../dominio/entidades/EmpresaEntity";
import InterfaceEmpresaRepository from "../../dominio/repositorios/interfaces/InterfaceEmpresaRepository";
import { Usuario } from "../../dominio/entidades/UsuarioEntity";
import InterfaceUserRepository from "../../dominio/repositorios/interfaces/InterfaceUserRepository";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

export default class EmpresaController {
    constructor(private repository: InterfaceEmpresaRepository) {}

    async criaEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const {
                cnpj,
                inscricaoEstadual,
                inscricaoMunicipal,
                nomeFantasia,
                razaoSocial,
                telefoneComercial,
                nomeResponsavelLegal,
                telefoneResponsavelLegal,
                emailResponsavelLegal,
                dataCadastramento,
                status,
                senha,
                enderecos,
                usuario
            } = req.body as Empresa;

            // console.log(req.body)
            
            if (
                !cnpj ||
                !nomeFantasia ||
                !inscricaoEstadual ||
                !inscricaoMunicipal ||
                !razaoSocial ||
                !telefoneComercial ||
                !nomeResponsavelLegal ||
                !telefoneResponsavelLegal ||
                !emailResponsavelLegal ||
                !dataCadastramento ||
                !status ||
                !senha ||
                !enderecos ||
                !usuario
            ) {
                res.status(400).json({ message: "Todos os campos obrigatórios devem ser fornecidos." });
                return;
            }

            const usuarioRepository = AppDataSource.getRepository(Usuario);
            const usuarioExistente = await usuarioRepository.findOne({ where: { usuario } });

            if (usuarioExistente) {
                res.status(400).json({ message: "Nome de usuário já está em uso." });
                return;
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const novoUsuario = new Usuario(usuario, senhaHash, "Empresa", status);
            await usuarioRepository.save(novoUsuario);

            const novaEmpresa = new Empresa(
                cnpj,
                inscricaoEstadual,
                inscricaoMunicipal,
                nomeFantasia,
                razaoSocial,
                telefoneComercial,
                nomeResponsavelLegal,
                telefoneResponsavelLegal,
                emailResponsavelLegal,
                new Date(dataCadastramento),
                status,
                usuario,
                senhaHash,
                enderecos
                
            );                       

            await this.repository.criaEmpresa(novaEmpresa);       
            
            res.status(201).json(novaEmpresa);
        } catch (error) {
            console.error("Erro ao criar empresa:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEmpresas(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await this.repository.listaEmpresas();
            res.status(200).json(empresas);
        } catch (error) {
            console.error("Erro ao listar empresas:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const empresa = await this.repository.listaEmpresa(Number(id));

            if (!empresa) {
                res.status(404).json({ message: "Empresa não encontrada." });
                return;
            }

            res.status(200).json(empresa);
        } catch (error) {
            console.error("Erro ao buscar empresa:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const {
                cnpj,
                inscricaoEstadual,
                inscricaoMunicipal,
                nomeFantasia,
                razaoSocial,
                telefoneComercial,
                nomeResponsavelLegal,
                telefoneResponsavelLegal,
                emailResponsavelLegal,
                dataCadastramento,
                status,
                senha,
                enderecos,
                usuario
            } = req.body as Empresa;
            
            const senhaHash = senha ? await bcrypt.hash(senha, 10) : undefined;

            const dadosAtualizados = {
                cnpj,
                inscricaoEstadual,
                inscricaoMunicipal,
                nomeFantasia,
                razaoSocial,
                telefoneComercial,
                nomeResponsavelLegal,
                telefoneResponsavelLegal,
                emailResponsavelLegal,
                dataCadastramento: new Date(dataCadastramento),
                status,
                ...(senhaHash && { senha: senhaHash }),
                enderecos,
                usuario                
            };

            const { success, message } = await this.repository.atualizaEmpresa(
                Number(id),
                dadosAtualizados as Empresa
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaEmpresa(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar empresa:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}