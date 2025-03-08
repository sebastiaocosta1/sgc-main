import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Candidaturas } from './CandidaturaEntity';
import { Usuario } from './UsuarioEntity';

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

  @OneToOne(() => Candidaturas, (candidatura) => candidatura.academico)
  candidatura: Candidaturas;

  @OneToOne(() => Usuario, (usuario) => usuario.administrador, { eager: true, cascade: true })
  @JoinColumn({ name: 'idusuario' })
  usuario: Usuario;

  constructor(
    nome: string,
    idade: number,
    email: string,
    telefone: string,
    hardskills: string,
    softskills: string,
    matricula: string,
    curriculo: string,
    usuario: Usuario,
     
  ) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.telefone = telefone;
    this.hardskills = hardskills;
    this.softskills = softskills;
    this.matricula = matricula;
    this.curriculo = curriculo;
    this.usuario = usuario;  
  }

  @BeforeInsert()
  async createUsuario() {
  if (!this.usuario) {
      this.usuario = new Usuario(this.usuario.usuario, this.usuario.senha, this.usuario.tipo, this.usuario.status);
    }
  }
}
