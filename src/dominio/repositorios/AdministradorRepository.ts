import { Repository } from "typeorm";
import { Administrador } from "../entidades/AdministradorEntity";
import { Usuario } from "../entidades/UsuarioEntity"; // importe o Usuario

import InterfaceAdministradorRepository from "./interfaces/InterfaceAdministradorRepository";

export default class AdministradorRepository implements InterfaceAdministradorRepository {
  private repository: Repository<Administrador>;
  private usuarioRepository: Repository<Usuario>; // adiciona o repositório do usuário

  constructor(
    repository: Repository<Administrador>,
    usuarioRepository: Repository<Usuario> // recebe também o repositório do usuário
  ) {
    this.repository = repository;
    this.usuarioRepository = usuarioRepository;
  }

  criaAdministrador(admin: Administrador): void {
    this.repository.save(admin);
  }

  async listaAdministradores(): Promise<Administrador[]> {
    return await this.repository.find();
  }

  async listaAdministrador(id: number): Promise<Administrador> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async atualizaAdministrador(
    id: number,
    adminData: Partial<Administrador>
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adminExistente = await this.repository.findOne({
        where: { id },
        relations: ['usuario'], // carrega o usuário vinculado
      });

      if (!adminExistente) {
        return { success: false, message: 'Administrador não encontrado.' };
      }

      // Verifica se o CPF já está sendo usado por outro administrador
      if (adminData.cpf) {
        const outro = await this.repository.findOne({
          where: { cpf: adminData.cpf },
        });

        if (outro && outro.id !== id) {
          return {
            success: false,
            message: 'Já existe outro administrador com este CPF.',
          };
        }
      }

      // Atualiza os campos do administrador
      adminExistente.nomeCompleto = adminData.nomeCompleto ?? adminExistente.nomeCompleto;
      adminExistente.cargo = adminData.cargo ?? adminExistente.cargo;
      adminExistente.cpf = adminData.cpf ?? adminExistente.cpf;

      // Atualiza os dados do usuário
      if (adminData.usuario) {
        const usuario = adminExistente.usuario;

        usuario.usuario = adminData.usuario.usuario ?? usuario.usuario;
        usuario.senha = adminData.usuario.senha ?? usuario.senha;
        usuario.tipo = adminData.usuario.tipo ?? usuario.tipo;
        usuario.status = adminData.usuario.status ?? usuario.status;

        await this.usuarioRepository.save(usuario);
      }

      await this.repository.save(adminExistente);

      return { success: true, message: 'Administrador atualizado com sucesso!' };
    } catch (error: any) {
      console.error('Erro ao atualizar administrador:', error?.message || error);
      return {
        success: false,
        message: 'Erro ao atualizar o administrador.',
      };
    }
  }

  async deletaAdministrador(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const adminToDelete = await this.repository.findOne({ where: { id: id } });

      if (!adminToDelete) {
        return { success: false, message: "Administrador não encontrado." };
      }

      await this.repository.remove(adminToDelete);
      return { success: true, message: "Administrador excluído com sucesso!" };
    } catch (error) {
      console.error("Erro ao excluir administrador:", error);
      return { success: false, message: "Erro ao excluir o administrador." };
    }
  }
}
