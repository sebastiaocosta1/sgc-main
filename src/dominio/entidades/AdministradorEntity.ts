import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
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

  @OneToOne(() => Usuario, (usuario) => usuario.administrador, { eager: true, cascade: true })
  @JoinColumn({ name: 'idusuario' })
  usuario: Usuario;

  constructor(
    nomeCompleto: string,
    cpf: string,
    cargo: string,
    usuario: Usuario
  ) {
    this.nomeCompleto = nomeCompleto;
    this.cpf = cpf;
    this.cargo = cargo;    
    this.usuario = usuario;
  }
  
  @BeforeInsert()
  async createUsuario() {
    if (!this.usuario) {
      this.usuario = new Usuario(this.usuario.usuario, this.usuario.senha, this.usuario.tipo, this.usuario.status);
    }
  }
}
