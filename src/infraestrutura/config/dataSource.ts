import { DataSource } from "typeorm";
import { Endereco } from "../../dominio/entidades/EnderecoEntity";
import { Administrador } from "../../dominio/entidades/AdministradorEntity";
import { Academico } from "../../dominio/entidades/AcademicoEntity";
import { Vagas } from "../../dominio/entidades/VagaEntity";
import { Empresa } from "../../dominio/entidades/EmpresaEntity";
import { Contratacoes } from "../../dominio/entidades/ContratacoesEntity";
import { Candidaturas } from "../../dominio/entidades/CandidaturaEntity";
import { Usuario } from "../../dominio/entidades/UsuarioEntity";
import { Entrevista } from "../../dominio/entidades/EntrevistaEntity";

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // ssl: {
    //     rejectUnauthorized: false // necessário para evitar erro com certificado
    //   },
    entities: [Endereco, Administrador, Academico, Vagas, Empresa, Contratacoes, Candidaturas, Usuario, Entrevista],
    synchronize: true, 
    logging: false,
});