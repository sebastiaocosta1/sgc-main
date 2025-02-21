import { Vagas } from "../../entidades/VagaEntity";

export default interface InterfaceVagaRepository {
    criaVaga(vaga: Vagas): void;
    listaVagas(): Array<Vagas> | Promise<Vagas[]>;
    listaVaga(id?: number): Promise<Vagas>;
    atualizaVaga(id: number, vaga: Vagas): Promise<{ success: boolean; message?: string }>;
    deletaVaga(id: number): Promise<{ success: boolean; message?: string }>;
}