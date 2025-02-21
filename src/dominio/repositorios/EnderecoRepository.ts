import { Repository } from "typeorm";
import { Endereco } from "../entidades/EnderecoEntity";
import InterfaceEnderecoRepository from "./interfaces/InterfaceEnderecoRepository";

export default class EnderecoRepository implements InterfaceEnderecoRepository {
    private repository: Repository<Endereco>;

    constructor(repository: Repository<Endereco>) {
        this.repository = repository;
    }

    criaEndereco(endereco: Endereco): void {
        this.repository.save(endereco);
    }

    async listaEnderecos(): Promise<Endereco[]> {
        return await this.repository.find();
    }

    async listaEndereco(id: number): Promise<Endereco | null> {
        return await this.repository.findOne({ where: { idEndereco: id } });
    }

    async atualizaEndereco(
        id: number,
        endereco: Endereco
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const enderecoToUpdate = await this.repository.findOne({ where: { idEndereco: id } });

            if (!enderecoToUpdate) {
                return { success: false, message: "Endereço não encontrado." };
            }

            Object.assign(enderecoToUpdate, endereco);

            await this.repository.save(enderecoToUpdate);
            return { success: true, message: "Endereço atualizado com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar endereço:", error);
            return { success: false, message: "Erro ao atualizar o endereço." };
        }
    }

    async deletaEndereco(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const enderecoToDelete = await this.repository.findOne({ where: { idEndereco: id } });

            if (!enderecoToDelete) {
                return { success: false, message: "Endereço não encontrado." };
            }

            await this.repository.remove(enderecoToDelete);
            return { success: true, message: "Endereço excluído com sucesso!" };
        } catch (error) {
            console.error("Erro ao excluir endereço:", error);
            return { success: false, message: "Erro ao excluir o endereço." };
        }
    }
}
