import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Administrador } from './AdministradorEntity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idusuario' })
  idUsuario: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  usuario: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'varchar', length: 20 })
  tipo: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  // @OneToOne(() => Administrador, (administrador) => administrador.usuario)
  // administrador?: Administrador;

  constructor(usuario: string, senha: string, tipo: string, status: string) {
    this.usuario = usuario;
    this.senha = senha;
    this.tipo = tipo;
    this.status = status;
  }
}
