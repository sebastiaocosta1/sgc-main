import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './UsuarioEntity';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome_completo', type: 'varchar', length: 255 })
  nomeCompleto: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 100 })
  cargo: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  usuario: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  // @OneToOne(() => Usuario, (usuario) => usuario.administrador, { eager: true })
  // @JoinColumn({ name: 'idusuario' })
  // usuario: Usuario;

  constructor(
    nomeCompleto: string,
    cpf: string,
    cargo: string,
    status: string,
    senha: string,
    usuario: string
  ) {
    this.nomeCompleto = nomeCompleto;
    this.cpf = cpf;
    this.cargo = cargo;
    this.status = status;
    this.senha = senha;
    this.usuario = usuario;
  }
}
