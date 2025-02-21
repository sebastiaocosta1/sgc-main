import { Academico } from "../../entidades/AcademicoEntity";

export default interface InterfaceAcademicoRepository {
    criaAcademico(academico: Academico): void;
    listaAcademicos(): Array<Academico> | Promise<Academico[]>;
    listaAcademico(id?: number): Promise<Academico>;
    atualizaAcademico(id: number, academico: Academico): Promise<{ success: boolean; message?: string }>;
    deletaAcademico(id: number): Promise<{ success: boolean; message?: string }>;
}