import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("login")
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  usuario: string;

  @Column({ type: "varchar", length: 255 })
  senha: string;
}
