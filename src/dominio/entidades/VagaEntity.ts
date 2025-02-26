import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Empresa } from './EmpresaEntity'; 
import { Candidaturas } from './CandidaturaEntity'; 

@Entity()
export class Vagas {
  @PrimaryGeneratedColumn({ name: 'idvagas' })
  idVagas: number;

  @Column({ type: 'varchar', length: 100 })
  cargo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salario: number;

  @Column({ type: 'varchar', length: 50 })
  tipo: string; 

  @Column({ type: 'varchar', length: 100 })
  horarioExpediente: string; 

  @Column({ type: 'text', name: 'principais_atividades' })
  principaisAtividades: string;

  @Column({ type: 'date', name: 'data_publicacao' })
  dataPublicacao: Date;

  @Column({ type: 'varchar', length: 20, name: 'status_vaga' })
  statusVaga: string; 

  @Column({ type: 'varchar', length: 20, name: 'status_cadastro' })
  statusCadastro: string; 

  @ManyToOne(() => Empresa, (empresa) => empresa.vagas)
  empresa: Empresa;

  @OneToMany(() => Candidaturas, (candidaturas) => candidaturas.vaga)
  candidaturas: Candidaturas[];

  @OneToMany(() => Vagas, (vagas) => vagas.empresa)
  vagas: Vagas[];

  constructor(
    cargo: string,
    salario: number,
    tipo: string,
    horarioExpediente: string,
    principaisAtividades: string,
    dataPublicacao: Date,
    statusVaga: string,
    statusCadastro: string,
    empresa: Empresa
  ) {
    this.cargo = cargo;
    this.salario = salario;
    this.tipo = tipo;
    this.horarioExpediente = horarioExpediente;
    this.principaisAtividades = principaisAtividades;
    this.dataPublicacao = dataPublicacao;
    this.statusVaga = statusVaga;
    this.statusCadastro = statusCadastro;
    this.empresa = empresa;
  }
}
