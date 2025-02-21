import { Entrevista } from "../../entidades/EntrevistaEntity";

export default interface InterfaceEntrevistaRepository {
    criaEntrevista(entrevista: Entrevista): void;
    listaEntrevistas(): Array<Entrevista> | Promise<Entrevista[]>;
    listaEntrevista(id?: number): Promise<Entrevista>;
    atualizaEntrevista(id: number, entrevista: Entrevista): Promise<{ success: boolean; message?: string }>;
    deletaEntrevista(id: number): Promise<{ success: boolean; message?: string }>;
}
