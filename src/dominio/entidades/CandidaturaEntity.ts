import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Vagas } from './VagaEntity';
import { Contratacoes } from './ContratacoesEntity';
import { Entrevista } from './EntrevistaEntity';
import { Academico } from './AcademicoEntity';

@Entity()
@Unique(['academico', 'vaga']) // Impede que um acadêmico se candidate mais de uma vez à mesma vaga
export class Candidaturas {
  @PrimaryGeneratedColumn({ name: 'idcandidatura' })
  idCandidatura: number;

  @Column({ type: 'date', name: 'data_candidatura' })
  dataCandidatura: Date;

  @Column({ type: 'varchar', length: 20, name: 'status_candidatura' })
  statusCandidatura: string;

  @ManyToOne(() => Vagas, (vaga) => vaga.candidaturas, { eager: true })
  vaga: Vagas;

  @ManyToOne(() => Academico, (academico) => academico.candidaturas, { eager: true })
  @JoinColumn()
  academico: Academico;  

  @OneToOne(() => Contratacoes, (contratacao) => contratacao.candidatura, { eager: true })
  contratacao: Contratacoes;

  @OneToOne(() => Entrevista, (entrevista) => entrevista.candidatura)
  entrevista: Entrevista;

  constructor(
    dataCandidatura: Date,
    statusCandidatura: string,
    vaga: Vagas,
    academico: Academico
  ) {
    this.dataCandidatura = dataCandidatura;
    this.statusCandidatura = statusCandidatura;
    this.vaga = vaga;
    this.academico = academico;
  }
}
