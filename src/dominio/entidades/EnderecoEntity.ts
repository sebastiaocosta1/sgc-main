import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  constructor(cep: string, cidade: string, estado: string, rua: string, numero: string) {
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.rua = rua;
    this.numero = numero;
  }
}
