import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Candidaturas } from './CandidaturaEntity';

@Entity()
export class Academico {
  @PrimaryGeneratedColumn({ name: 'idacademico' })
  idAcademico: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'int' })
  idade: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  telefone: string;

  @Column({ type: 'text' })
  hardskills: string;

  @Column({ type: 'text' })
  softskills: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  matricula: string;

  @Column({ type: 'text', nullable: true })
  curriculo: string;
  
  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @OneToOne(() => Candidaturas, (candidatura) => candidatura.academico)
  candidatura: Candidaturas;

  constructor(
    nome: string,
    idade: number,
    email: string,
    telefone: string,
    hardskills: string,
    softskills: string,
    matricula: string,
    curriculo: string,
    status: string,
    senha: string,    
    candidatura?: Candidaturas,    
  ) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.telefone = telefone;
    this.hardskills = hardskills;
    this.softskills = softskills;
    this.matricula = matricula;
    this.curriculo = curriculo;
    this.status = status;
    this.senha = senha;    
    this.candidatura = candidatura || null;    
  }
}
