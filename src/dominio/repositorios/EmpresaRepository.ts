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
  
      
      Object.assign(empresaExistente, {
        cnpj: empresaData.cnpj ?? empresaExistente.cnpj,
        inscricaoEstadual: empresaData.inscricaoEstadual ?? empresaExistente.inscricaoEstadual,
        inscricaoMunicipal: empresaData.inscricaoMunicipal ?? empresaExistente.inscricaoMunicipal,
        nomeFantasia: empresaData.nomeFantasia ?? empresaExistente.nomeFantasia,
        razaoSocial: empresaData.razaoSocial ?? empresaExistente.razaoSocial,
        telefoneComercial: empresaData.telefoneComercial ?? empresaExistente.telefoneComercial,
        nomeResponsavelLegal: empresaData.nomeResponsavelLegal ?? empresaExistente.nomeResponsavelLegal,
        telefoneResponsavelLegal: empresaData.telefoneResponsavelLegal ?? empresaExistente.telefoneResponsavelLegal,
        emailResponsavelLegal: empresaData.emailResponsavelLegal ?? empresaExistente.emailResponsavelLegal,
        dataCadastramento: empresaData.dataCadastramento ?? empresaExistente.dataCadastramento,
      });
  
      
      if (empresaData.usuario) {
        empresaExistente.usuario = {
          ...empresaExistente.usuario,
          ...empresaData.usuario,
        };
      }
  
      
      if (empresaData.endereco) {
        empresaExistente.endereco = {
          ...empresaExistente.endereco,
          ...empresaData.endereco,
        };
      }
  
      
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
