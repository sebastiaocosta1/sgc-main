import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Vagas } from './VagaEntity';
import { Contratacoes } from './ContratacoesEntity';
import { Entrevista } from './EntrevistaEntity'; 
import { Academico } from './AcademicoEntity'; 

@Entity()
export class Candidaturas {
  @PrimaryGeneratedColumn({ name: 'idcandidatura' })
  idCandidatura: number;

  @Column({ type: 'date', name: 'data_candidatura' })
  dataCandidatura: Date;

  @Column({ type: 'varchar', length: 20, name: 'status_candidatura' })
  statusCandidatura: string; 

  @ManyToOne(() => Vagas, (vagas) => vagas.candidaturas)
  vaga: Vagas;

  @OneToOne(() => Contratacoes, (contratacao) => contratacao.candidatura)
  contratacao: Contratacoes;

  @OneToOne(() => Entrevista, (entrevista) => entrevista.candidatura)
  entrevista: Entrevista;

  @OneToOne(() => Academico)
  @JoinColumn()
  academico: Academico;

  constructor(dataCandidatura: Date, statusCandidatura: string, vaga: Vagas, academico: Academico) {
    this.dataCandidatura = dataCandidatura;
    this.statusCandidatura = statusCandidatura;
    this.vaga = vaga;
    this.academico = academico;
  }
}
