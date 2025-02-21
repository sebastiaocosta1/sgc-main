import { Repository } from "typeorm";
import { Academico } from "../entidades/AcademicoEntity";
import InterfaceAcademicoRepository from "./interfaces/InterfaceAcademicoRepository";

export default class AcademicoRepository implements InterfaceAcademicoRepository {
    private repository: Repository<Academico>;

    constructor(repository: Repository<Academico>) {
        this.repository = repository;
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
        academico: Academico
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const academicoToUpdate = await this.repository.findOne({ where: { idAcademico: id } });

            if (!academicoToUpdate) {
                return { success: false, message: "Acadêmico não encontrado." };
            }

            Object.assign(academicoToUpdate, academico);

            await this.repository.save(academicoToUpdate);
            return { success: true, message: "Acadêmico atualizado com sucesso!" };
        } catch (error) {
            console.error("Erro ao atualizar acadêmico:", error);
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
}
