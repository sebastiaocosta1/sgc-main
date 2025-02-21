import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Candidaturas } from './CandidaturaEntity'; // Importe a entidade Candidaturas

@Entity()
export class Entrevista {
  @PrimaryGeneratedColumn({ name: 'identrevista' })
  idEntrevista: number;

  @Column({ type: 'date' })
  data: Date;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'varchar', length: 50 })
  modalidade: string; // Exemplo: "Presencial" ou "Online"

  @Column({ type: 'text' })
  texto: string; // Texto com os detalhes ou instruções da entrevista

  @Column({ type: 'text', name: 'resposta_convidado', nullable: true })
  respostaConvidado: string; // Resposta do convidado, se houver

  @OneToOne(() => Candidaturas, (candidatura) => candidatura.entrevista)
  candidatura: Candidaturas;

  constructor(
    data: Date,
    hora: string,
    modalidade: string,
    texto: string,
    respostaConvidado?: string,
    candidatura?: Candidaturas
  ) {
    this.data = data;
    this.hora = hora;
    this.modalidade = modalidade;
    this.texto = texto;
    this.respostaConvidado = respostaConvidado || null;
    this.candidatura = candidatura || null;
  }
}
