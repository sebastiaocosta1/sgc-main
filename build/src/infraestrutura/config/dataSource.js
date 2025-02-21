"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var EnderecoEntity_1 = require("../../dominio/entidades/EnderecoEntity");
var AdministradorEntity_1 = require("../../dominio/entidades/AdministradorEntity");
var AcademicoEntity_1 = require("../../dominio/entidades/AcademicoEntity");
var VagaEntity_1 = require("../../dominio/entidades/VagaEntity");
var EmpresaEntity_1 = require("../../dominio/entidades/EmpresaEntity");
var ContratacoesEntity_1 = require("../../dominio/entidades/ContratacoesEntity");
var CandidaturaEntity_1 = require("../../dominio/entidades/CandidaturaEntity");
var UsuarioEntity_1 = require("../../dominio/entidades/UsuarioEntity");
var EntrevistaEntity_1 = require("../../dominio/entidades/EntrevistaEntity");
var LoginEntity_1 = require("../../dominio/entidades/LoginEntity");
//require('dotenv').config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'aluno',
    database: 'db_sgc',
    entities: [EnderecoEntity_1.Endereco, AdministradorEntity_1.Administrador, AcademicoEntity_1.Academico, VagaEntity_1.Vagas, EmpresaEntity_1.Empresa, ContratacoesEntity_1.Contratacoes, CandidaturaEntity_1.Candidaturas, UsuarioEntity_1.Usuario, EntrevistaEntity_1.Entrevista, LoginEntity_1.Login],
    synchronize: true,
    logging: false,
});
