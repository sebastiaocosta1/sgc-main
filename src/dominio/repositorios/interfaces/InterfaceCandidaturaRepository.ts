import { Candidaturas } from "../../entidades/CandidaturaEntity";

export default interface InterfaceCandidaturaRepository {
    criaCandidatura(candidatura: Candidaturas): void;
    listaCandidaturas(): Array<Candidaturas> | Promise<Candidaturas[]>;
    listaCandidatura(id?: number): Promise<Candidaturas>;
    atualizaCandidatura(id: number, candidatura: Candidaturas): Promise<{ success: boolean; message?: string }>;
    deletaCandidatura(id: number): Promise<{ success: boolean; message?: string }>;
}
