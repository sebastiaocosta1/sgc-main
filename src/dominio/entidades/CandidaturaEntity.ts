import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Vagas } from './VagaEntity';
import { Contratacoes } from './ContratacoesEntity';
import { Entrevista } from './EntrevistaEntity'; // Importe a entidade Entrevista
import { Academico } from './AcademicoEntity'; // Importe a entidade Academicos

@Entity()
export class Candidaturas {
  @PrimaryGeneratedColumn({ name: 'idcandidatura' })
  idCandidatura: number;

  @Column({ type: 'date', name: 'data_candidatura' })
  dataCandidatura: Date;

  @Column({ type: 'varchar', length: 20, name: 'status_candidatura' })
  statusCandidatura: string; // Exemplo: "Pendente", "Aprovado", "Rejeitado"

  @ManyToOne(() => Vagas, (vagas) => vagas.candidaturas)
  vaga: Vagas;

  @OneToOne(() => Contratacoes, (contratacao) => contratacao.candidatura)
  contratacao: Contratacoes;

  @OneToOne(() => Entrevista)
  @JoinColumn()
  entrevista: Entrevista;

  @OneToOne(() => Academico)
  @JoinColumn()
  academico: Academico;

  constructor(dataCandidatura: Date, statusCandidatura: string, vaga: Vagas, contratacao: Contratacoes, entrevista: Entrevista, academico: Academico) {
    this.dataCandidatura = dataCandidatura;
    this.statusCandidatura = statusCandidatura;
    this.vaga = vaga;
    this.contratacao = contratacao;
    this.entrevista = entrevista;
    this.academico = academico;
  }
}
