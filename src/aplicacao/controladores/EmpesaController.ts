import { Request, Response } from "express";
import { Empresa } from "../../dominio/entidades/EmpresaEntity";
import InterfaceEmpresaRepository from "../../dominio/repositorios/interfaces/InterfaceEmpresaRepository";
import { Usuario } from "../../dominio/entidades/UsuarioEntity";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import { Endereco } from "../../dominio/entidades/EnderecoEntity";

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
      endereco,
      usuario,
    } = req.body as Empresa; // REMOVIDO: dataCadastramento

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
      !endereco ||
      !usuario
    ) {
      res.status(400).json({ message: "Todos os campos obrigatórios devem ser fornecidos." });
      return;
    }

    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const empresaExistente = await this.repository.listaEmpresas();

    const cnpjDuplicado = empresaExistente.find(emp => emp.cnpj === cnpj);
    if (cnpjDuplicado) {
      res.status(400).json({ message: "CNPJ já cadastrado." });
      return;
    }

    const emailDuplicado = empresaExistente.find(emp => emp.emailResponsavelLegal === emailResponsavelLegal);
    if (emailDuplicado) {
      res.status(400).json({ message: "E-mail do responsável já cadastrado." });
      return;
    }

    const usuarioExistente = await usuarioRepository.findOne({ where: { usuario: usuario.usuario } });
    if (usuarioExistente) {
      res.status(400).json({ message: "Nome de usuário já está em uso." });
      return;
    }

    const senhaHash = await bcrypt.hash(usuario.senha, 10);

    const novoEndereco = new Endereco(
      endereco.cep,
      endereco.cidade,
      endereco.estado,
      endereco.rua,
      endereco.numero
    );
    const novoUsuario = new Usuario(usuario.usuario, senhaHash, "Empresa", usuario.status);

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
      new Date(), // ✅ DATA ATUAL com hora correta
      novoEndereco,
      novoUsuario
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
        endereco,
        usuario,
      } = req.body as Empresa;

      const usuarioRepository = AppDataSource.getRepository(Usuario);
      const empresas = await this.repository.listaEmpresas();

      // Verifica se já existe outra empresa com mesmo CNPJ
      const outraComMesmoCnpj = empresas.find(emp => emp.cnpj === cnpj && emp.idEmpresa !== Number(id));
      if (outraComMesmoCnpj) {
        res.status(400).json({ message: "CNPJ já cadastrado por outra empresa." });
        return;
      }

      // Verifica se já existe outra empresa com o mesmo e-mail do responsável
      const outraComMesmoEmail = empresas.find(
        emp => emp.emailResponsavelLegal === emailResponsavelLegal && emp.idEmpresa !== Number(id)
      );
      if (outraComMesmoEmail) {
        res.status(400).json({ message: "E-mail já cadastrado por outra empresa." });
        return;
      }

      // Verifica se nome de usuário já está em uso por outro
      const usuarioExistente = await usuarioRepository.findOne({
        where: { usuario: usuario.usuario },
        relations: ["empresa"],
      });

      if (usuarioExistente && usuarioExistente.empresa?.idEmpresa !== Number(id)) {
        res.status(400).json({ message: "Nome de usuário já em uso por outra empresa." });
        return;
      }

      const senhaHash = usuario.senha ? await bcrypt.hash(usuario.senha, 10) : undefined;

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
        dataCadastramento,
        endereco,
        usuario: {
          ...usuario,
          senha: senhaHash ?? usuario.senha,
        },
      };

      const { success, message } = await this.repository.atualizaEmpresa(Number(id), dadosAtualizados as Empresa);

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
