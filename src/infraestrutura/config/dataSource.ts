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
import { Login } from "../../dominio/entidades/LoginEntity";
//require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'aluno',
    database: 'db_sgc',
    entities: [Endereco, Administrador, Academico, Vagas, Empresa, Contratacoes, Candidaturas, Usuario, Entrevista, Login],
    synchronize: true, 
    logging: false,
});

