import { Repository } from "typeorm";
import { Empresa } from "../entidades/EmpresaEntity";
import InterfaceEmpresaRepository from "./interfaces/InterfaceEmpresaRepository";

export default class EmpresaRepository implements InterfaceEmpresaRepository {
    private repository: Repository<Empresa>;

    constructor(repository: Repository<Empresa>) {
        this.repository = repository;
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
        empresa: Empresa
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const empresaToUpdate = await this.repository.findOne({ where: { idEmpresa: id } });

            if (!empresaToUpdate) {
                return { success: false, message: "Empresa não encontrada." };
            }

            Object.assign(empresaToUpdate, empresa);

            await this.repository.save(empresaToUpdate);
            return { success: true, message: "Empresa atualizada com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
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