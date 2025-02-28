import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Empresa } from "./EmpresaEntity";

@Entity("enderecos")
export class Endereco {
  @PrimaryGeneratedColumn()
  idEndereco: number;

  @Column({ length: 9 })
  cep: string;

  @Column({ length: 100 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ length: 100 })
  rua: string;

  @Column()
  numero: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

    @OneToMany(() => Empresa, (empresa) => empresa.enderecos)
    endereco: Endereco[];

  constructor(cep: string, cidade: string, estado: string, rua: string, numero: string, status: string) {
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.rua = rua;
    this.numero = numero;
    this.status = status;
  }
}
