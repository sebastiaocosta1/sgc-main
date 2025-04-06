import { Request, Response } from "express";
import { Academico } from "../../dominio/entidades/AcademicoEntity";
import InterfaceAcademicoRepository from "../../dominio/repositorios/interfaces/InterfaceAcademicoRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import { Usuario } from "../../dominio/entidades/UsuarioEntity";
import { upload } from "../../utilitarios/uploadCurriculos";
import bcrypt from "bcrypt";

export default class AcademicoController {
    constructor(private repository: InterfaceAcademicoRepository) {}

    async criaAcademico(req: Request, res: Response): Promise<void> {
        try {
          const {
            nome,
            idade,
            email,
            telefone,
            hardskills,
            softskills,
            matricula,
            usuario,
          } = req.body;
      
          const arquivo = req.file;
      
          if (!arquivo) {
            res.status(400).json({ message: "Currículo não enviado." });
            return;
          }
      
          if (
            !nome ||
            !idade ||
            !email ||
            !telefone ||
            !hardskills ||
            !softskills ||
            !matricula ||
            !usuario
          ) {
            res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
            return;
          }
      
          const usuarioData = JSON.parse(usuario); // ⚠️ Lembre-se: vem como string do front
          const usuarioRepository = AppDataSource.getRepository(Usuario);
          const usuarioExistente = await usuarioRepository.findOne({ where: { usuario: usuarioData.usuario } });
      
          if (usuarioExistente) {
            res.status(400).json({ message: "Nome de usuário já está em uso." });
            return;
          }
      
          const senhaHash = await bcrypt.hash(usuarioData.senha, 10);
          const novoUsuario = new Usuario(usuarioData.usuario, senhaHash, "Academico", usuarioData.status);
      
          const caminhoCurriculo = `/curriculos/${arquivo.filename}`;
      
          const novoAcademico = new Academico(
            nome,
            idade,
            email,
            telefone,
            hardskills,
            softskills,
            matricula,
            caminhoCurriculo,
            novoUsuario
          );
      
          await this.repository.criaAcademico(novoAcademico);
      
          res.status(201).json(novoAcademico);
        } catch (error) {
          console.error("Erro ao criar acadêmico:", error);
          res.status(500).json({ message: "Erro interno do servidor." });
        }
      }
      
    async listaAcademicos(req: Request, res: Response): Promise<void> {
        try {
            const academicos = await this.repository.listaAcademicos();
            res.status(200).json(academicos);
        } catch (error) {
            console.error("Erro ao listar acadêmicos:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async listaAcademico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const academico = await this.repository.listaAcademico(Number(id));

            if (!academico) {
                res.status(404).json({ message: "Acadêmico não encontrado." });
                return;
            }

            res.status(200).json(academico);
        } catch (error) {
            console.error("Erro ao buscar acadêmico:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async atualizaAcademico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body as Academico;

            const { success, message } = await this.repository.atualizaAcademico(
                Number(id),
                dadosAtualizados
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao atualizar acadêmico:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async deletaAcademico(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.deletaAcademico(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.sendStatus(204);
        } catch (error) {
            console.error("Erro ao deletar acadêmico:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
      }
    }