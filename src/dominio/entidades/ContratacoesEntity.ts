import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Candidaturas } from './CandidaturaEntity';

@Entity()
export class Contratacoes {
  @PrimaryGeneratedColumn({ name: 'idcontratacao' })
  idContratacao: number;

  @Column({ type: 'date', name: 'data_contratacao' })
  dataContratacao: Date;

  @OneToOne(() => Candidaturas, (candidatura) => candidatura.academico, {eager: true})
  @JoinColumn({ name: 'idcandidatura' })
  candidatura: Candidaturas;

  constructor(dataContratacao: Date, candidatura: Candidaturas) {
    this.dataContratacao = dataContratacao;
    this.candidatura = candidatura;
  }
}
