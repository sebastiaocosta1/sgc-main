import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BeforeInsert } from "typeorm";
import { Endereco } from "./EnderecoEntity";
import { Vagas } from "./VagaEntity";
import { Usuario } from "./UsuarioEntity";


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

  @OneToMany(() => Vagas, (vagas) => vagas.empresa)
  vagas: Vagas[];

  @OneToOne(() => Endereco, (endereco) => endereco.empresa, { eager: true, cascade: true })
  @JoinColumn()
  endereco: Endereco;

  @OneToOne(() => Usuario, (usuario) => usuario.empresa, { eager: true, cascade: true })
  @JoinColumn()
  usuario: Usuario;

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
    endereco: Endereco,
    usuario: Usuario
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
    this.endereco = endereco;
    this.usuario = usuario;
    
  }

    @BeforeInsert()
    async createUsuario() {
      if (!this.usuario) {
        this.usuario = new Usuario(this.usuario.usuario, this.usuario.senha, this.usuario.tipo, this.usuario.status);
      }
    }
   
    @BeforeInsert()
    async createEndereco() {
      if (!this.endereco) {
        this.endereco = new Endereco(this.endereco.cep,
           this.endereco.cidade, this.endereco.estado,
            this.endereco.rua, this.endereco.numero);
      }
    }
  
}
