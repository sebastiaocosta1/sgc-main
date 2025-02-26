import { Empresa } from "../../entidades/EmpresaEntity";

export default interface InterfaceEmpresaRepository {
    criaEmpresa(empresa: Empresa): void;
    listaEmpresas(): Array<Empresa> | Promise<Empresa[]>;
    listaEmpresa(id?: number): Promise<Empresa>;
    atualizaEmpresa(id: number, empresa: Empresa): Promise<{ success: boolean; message?: string }>;
    deletaEmpresa(id: number): Promise<{ success: boolean; message?: string }>;
}