import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Candidaturas } from './CandidaturaEntity'; 

@Entity()
export class Entrevista {
  @PrimaryGeneratedColumn({ name: 'identrevista' })
  idEntrevista: number;

  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'varchar', length: 50 })
  modalidade: string; 

  @Column({ type: 'text' })
  texto: string; 

  @Column({ type: 'text', name: 'resposta_convidado', nullable: true })
  respostaConvidado: string; 

  @OneToOne(() => Candidaturas, (candidatura) => candidatura.entrevista, { eager: true })
  @JoinColumn({ name: 'idcandidatura' })  
  candidatura: Candidaturas;

  constructor(
    data: Date,
    hora: string,
    modalidade: string,
    texto: string,
    respostaConvidado: string,
    candidatura: Candidaturas
  ) {
    this.data = data;
    this.hora = hora;
    this.modalidade = modalidade;
    this.texto = texto;
    this.respostaConvidado = respostaConvidado || null;
    this.candidatura = candidatura || null;
  }
}
