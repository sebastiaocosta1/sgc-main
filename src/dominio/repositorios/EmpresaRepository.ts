import { Repository } from "typeorm";
import { Empresa } from "../entidades/EmpresaEntity";
import { Usuario } from "../entidades/UsuarioEntity";
import { Endereco } from "../entidades/EnderecoEntity";
import InterfaceEmpresaRepository from "./interfaces/InterfaceEmpresaRepository";

export default class EmpresaRepository implements InterfaceEmpresaRepository {
  private repository: Repository<Empresa>;
  private usuarioRepository: Repository<Usuario>;
  private enderecoRepository: Repository<Endereco>;

  constructor(
    repository: Repository<Empresa>,
    usuarioRepository: Repository<Usuario>,
    enderecoRepository: Repository<Endereco>
  ) {
    this.repository = repository;
    this.usuarioRepository = usuarioRepository;
    this.enderecoRepository = enderecoRepository;
  }

  criaEmpresa(empresa: Empresa): void {
    this.repository.save(empresa);
  }

  async listaEmpresas(): Promise<Empresa[]> {
    return await this.repository.find();
  }

  async listaEmpresa(id: number): Promise<Empresa> {
    return await this.repository.findOne({ where: { idEmpresa: id } });
  }

  async atualizaEmpresa(
    id: number,
    empresaData: Partial<Empresa>
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const empresaExistente = await this.repository.findOne({
        where: { idEmpresa: id },
        relations: ["usuario", "endereco"],
      });

      if (!empresaExistente) {
        return { success: false, message: "Empresa não encontrada." };
      }

      // Verifica duplicidade de CNPJ
      if (empresaData.cnpj) {
        const outra = await this.repository.findOne({ where: { cnpj: empresaData.cnpj } });
        if (outra && outra.idEmpresa !== id) {
          return { success: false, message: "Já existe outra empresa com este CNPJ." };
        }
      }

      // Verifica duplicidade de e-mail
      if (empresaData.emailResponsavelLegal) {
        const outra = await this.repository.findOne({
          where: { emailResponsavelLegal: empresaData.emailResponsavelLegal },
        });
        if (outra && outra.idEmpresa !== id) {
          return {
            success: false,
            message: "Já existe outra empresa com este e-mail de responsável legal.",
          };
        }
      }

      // Atualiza campos da empresa
      empresaExistente.cnpj = empresaData.cnpj ?? empresaExistente.cnpj;
      empresaExistente.inscricaoEstadual = empresaData.inscricaoEstadual ?? empresaExistente.inscricaoEstadual;
      empresaExistente.inscricaoMunicipal = empresaData.inscricaoMunicipal ?? empresaExistente.inscricaoMunicipal;
      empresaExistente.nomeFantasia = empresaData.nomeFantasia ?? empresaExistente.nomeFantasia;
      empresaExistente.razaoSocial = empresaData.razaoSocial ?? empresaExistente.razaoSocial;
      empresaExistente.telefoneComercial = empresaData.telefoneComercial ?? empresaExistente.telefoneComercial;
      empresaExistente.nomeResponsavelLegal = empresaData.nomeResponsavelLegal ?? empresaExistente.nomeResponsavelLegal;
      empresaExistente.telefoneResponsavelLegal = empresaData.telefoneResponsavelLegal ?? empresaExistente.telefoneResponsavelLegal;
      empresaExistente.emailResponsavelLegal = empresaData.emailResponsavelLegal ?? empresaExistente.emailResponsavelLegal;
      empresaExistente.dataCadastramento = empresaData.dataCadastramento ?? empresaExistente.dataCadastramento;

      // Atualiza usuário vinculado
      if (empresaData.usuario) {
        const usuarioExistente = empresaExistente.usuario;

        if (!usuarioExistente?.idUsuario) {
          return { success: false, message: "Usuário associado à empresa não possui ID." };
        }

        const usuario = await this.usuarioRepository.findOne({
            where: { idUsuario: usuarioExistente.idUsuario },
          });

        if (!usuario) {
          return { success: false, message: "Usuário associado não encontrado." };
        }

        // Verifica duplicidade de nome de usuário
        if (empresaData.usuario.usuario) {
          const outro = await this.usuarioRepository.findOne({
            where: { usuario: empresaData.usuario.usuario },
          });

          if (outro && outro.idUsuario !== usuario.idUsuario) {
            return {
              success: false,
              message: "Já existe outro usuário com esse nome de usuário.",
            };
          }
        }

        usuario.usuario = empresaData.usuario.usuario ?? usuario.usuario;
        usuario.senha = empresaData.usuario.senha ?? usuario.senha;
        usuario.tipo = empresaData.usuario.tipo ?? usuario.tipo;
        usuario.status = empresaData.usuario.status ?? usuario.status;

        await this.usuarioRepository.save(usuario);
      }

      // Atualiza endereço vinculado
      if (empresaData.endereco) {
        const enderecoExistente = empresaExistente.endereco;

        if (!enderecoExistente?.idEndereco) {
          return { success: false, message: "Endereço associado à empresa não possui ID." };
        }

        const endereco = await this.enderecoRepository.findOne({
          where: { idEndereco: enderecoExistente.idEndereco },
        });

        if (!endereco) {
          return { success: false, message: "Endereço associado não encontrado." };
        }

        endereco.cep = empresaData.endereco.cep ?? endereco.cep;
        endereco.cidade = empresaData.endereco.cidade ?? endereco.cidade;
        endereco.estado = empresaData.endereco.estado ?? endereco.estado;
        endereco.rua = empresaData.endereco.rua ?? endereco.rua;
        endereco.numero = empresaData.endereco.numero ?? endereco.numero;

        await this.enderecoRepository.save(endereco);
      }

      // Salva empresa com os dados atualizados
      await this.repository.save(empresaExistente);

      return { success: true, message: "Empresa atualizada com sucesso!" };
    } catch (error: any) {
      console.error("Erro ao atualizar empresa:", error?.message || error);
      return { success: false, message: "Erro ao atualizar a empresa." };
    }
  }

  async deletaEmpresa(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const empresaToDelete = await this.repository.findOne({ where: { idEmpresa: id } });

      if (!empresaToDelete) {
        return { success: false, message: "Empresa não encontrada." };
      }

      await this.repository.remove(empresaToDelete);
      return { success: true, message: "Empresa excluída com sucesso!" };
    } catch (error) {
      console.error("Erro ao excluir empresa:", error);
      return { success: false, message: "Erro ao excluir a empresa." };
    }
  }
}
