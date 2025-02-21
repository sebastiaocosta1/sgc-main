import { Contratacoes } from "../../entidades/ContratacoesEntity";

export default interface InterfaceContratacaoRepository {
    criaContratacao(contratacao: Contratacoes): void;
    listaContratacoes(): Array<Contratacoes> | Promise<Contratacoes[]>;
    listaContratacao(id?: number): Promise<Contratacoes>;
    atualizaContratacao(id: number, contratacao: Contratacoes): Promise<{ success: boolean; message?: string }>;
    deletaContratacao(id: number): Promise<{ success: boolean; message?: string }>;
}
