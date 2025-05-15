import { Repository } from "typeorm";
import { Academico } from "../entidades/AcademicoEntity";
import InterfaceAcademicoRepository from "./interfaces/InterfaceAcademicoRepository";
import { Usuario } from "../entidades/UsuarioEntity";

export default class AcademicoRepository implements InterfaceAcademicoRepository {
  private repository: Repository<Academico>;
  private usuarioRepository: Repository<Usuario>;

  constructor(
    repository: Repository<Academico>,
    usuarioRepository: Repository<Usuario>
  ) {
    this.repository = repository;
    this.usuarioRepository = usuarioRepository;
  }

  criaAcademico(academico: Academico): void {
    this.repository.save(academico);
  }

  async listaAcademicos(): Promise<Academico[]> {
    return await this.repository.find();
  }

  async listaAcademico(id: number): Promise<Academico | null> {
    return await this.repository.findOne({ where: { idAcademico: id } });
  }

  async atualizaAcademico(
    id: number,
    dados: Partial<Academico>
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const academicoExistente = await this.repository.findOne({
        where: { idAcademico: id },
        relations: ['usuario'],
      });

      if (!academicoExistente) {
        return { success: false, message: "Acadêmico não encontrado." };
      }
      
      academicoExistente.nome = dados.nome ?? academicoExistente.nome;
      academicoExistente.idade = dados.idade ?? academicoExistente.idade;
      academicoExistente.email = dados.email ?? academicoExistente.email;
      academicoExistente.telefone = dados.telefone ?? academicoExistente.telefone;
      academicoExistente.hardskills = dados.hardskills ?? academicoExistente.hardskills;
      academicoExistente.softskills = dados.softskills ?? academicoExistente.softskills;
      academicoExistente.matricula = dados.matricula ?? academicoExistente.matricula;
      academicoExistente.curriculo = dados.curriculo ?? academicoExistente.curriculo;

      if (dados.usuario) {
        const usuario = academicoExistente.usuario;

        usuario.usuario = dados.usuario.usuario ?? usuario.usuario;
        usuario.senha = dados.usuario.senha ?? usuario.senha;
        usuario.tipo = dados.usuario.tipo ?? usuario.tipo;
        usuario.status = dados.usuario.status ?? usuario.status;

        await this.usuarioRepository.save(usuario);
      }

      await this.repository.save(academicoExistente);

      return { success: true, message: "Acadêmico atualizado com sucesso!" };
    } catch (error: any) {
      console.error("Erro ao atualizar acadêmico:", error?.message || error);
      return { success: false, message: "Erro ao atualizar o acadêmico." };
    }
  }

  async deletaAcademico(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const academicoToDelete = await this.repository.findOne({ where: { idAcademico: id } });

      if (!academicoToDelete) {
        return { success: false, message: "Acadêmico não encontrado." };
      }

      await this.repository.remove(academicoToDelete);
      return { success: true, message: "Acadêmico excluído com sucesso!" };
    } catch (error) {
      console.error("Erro ao excluir acadêmico:", error);
      return { success: false, message: "Erro ao excluir o acadêmico." };
    }
  }

  async buscaPorMatricula(matricula: string): Promise<Academico | null> {
    return await this.repository.findOne({ where: { matricula }, relations: ["usuario"] });
  }
  
}
