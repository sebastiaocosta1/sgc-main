import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ type: 'varchar', length: 50, unique: true })
  usuario: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  constructor(
    nomeCompleto: string,
    cpf: string,
    cargo: string,
    usuario: string,
    senha: string
  ) {
    this.nomeCompleto = nomeCompleto;
    this.cpf = cpf;
    this.cargo = cargo;
    this.usuario = usuario;
    this.senha = senha;
  }
}
