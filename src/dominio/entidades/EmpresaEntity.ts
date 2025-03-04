import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Endereco } from "./EnderecoEntity";
import { Vagas } from "./VagaEntity";
import { Usuario } from "./UsuarioEntity";

//o dilema das redes sociais

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn({ name: 'idempresa' })
  idEmpresa: number;

  @Column({ type: 'varchar', length: 14, unique: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 20, name: 'inscricao_estadual', nullable: true })
  inscricaoEstadual: string;

  @Column({ type: 'varchar', length: 20, name: 'inscricao_municipal', nullable: true })
  inscricaoMunicipal: string;

  @Column({ type: 'varchar', length: 255, name: 'nome_fantasia' })
  nomeFantasia: string;

  @Column({ type: 'varchar', length: 255, name: 'razao_social' })
  razaoSocial: string;

  @Column({ type: 'varchar', length: 15, name: 'telefone_comercial' })
  telefoneComercial: string;

  @Column({ type: 'varchar', length: 255, name: 'nome_responsavel_legal' })
  nomeResponsavelLegal: string;

  @Column({ type: 'varchar', length: 15, name: 'telefone_responsavel_legal' })
  telefoneResponsavelLegal: string;

  @Column({ type: 'varchar', length: 255, name: 'email_responsavel_legal', unique: true })
  emailResponsavelLegal: string;

  @Column({ type: 'date', name: 'data_cadastramento' })
  dataCadastramento: Date;

  @Column({ type: 'varchar', length: 20 })
  status: string; 

  @Column({ type: 'varchar', length: 255 })
  usuario: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @OneToMany(() => Endereco, (endereco) => endereco.idEndereco)
  vagas: Vagas[];

  @OneToMany(() => Vagas, (vagas) => vagas.empresa)
  enderecos: Endereco[];

    // @OneToOne(() => Usuario, (usuario) => usuario.administrador, { eager: true })
    // @JoinColumn({ name: 'idusuario' })
    // usuario: Usuario;

  constructor(
    cnpj: string,
    inscricaoEstadual: string,
    inscricaoMunicipal: string,
    nomeFantasia: string,
    razaoSocial: string,
    telefoneComercial: string,
    nomeResponsavelLegal: string,
    telefoneResponsavelLegal: string,
    emailResponsavelLegal: string,
    dataCadastramento: Date,
    status: string,
    usuario: string,
    senha: string,
    endereco: Endereco[]  
  ) {
    this.cnpj = cnpj;
    this.inscricaoEstadual = inscricaoEstadual;
    this.inscricaoMunicipal = inscricaoMunicipal;
    this.nomeFantasia = nomeFantasia;
    this.razaoSocial = razaoSocial;
    this.telefoneComercial = telefoneComercial;
    this.nomeResponsavelLegal = nomeResponsavelLegal;
    this.telefoneResponsavelLegal = telefoneResponsavelLegal;
    this.emailResponsavelLegal = emailResponsavelLegal;
    this.dataCadastramento = dataCadastramento;
    this.status = status;
    this.usuario = usuario;
    this.senha = senha;
    this.enderecos = endereco;
    
  }
}
