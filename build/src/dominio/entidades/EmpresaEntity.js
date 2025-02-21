"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = void 0;
var typeorm_1 = require("typeorm");
var EnderecoEntity_1 = require("./EnderecoEntity");
var VagaEntity_1 = require("./VagaEntity");
var Empresa = /** @class */ (function () {
    function Empresa(cnpj, inscricaoEstadual, inscricaoMunicipal, nomeFantasia, razaoSocial, telefoneComercial, nomeResponsavelLegal, telefoneResponsavelLegal, emailResponsavelLegal, dataCadastramento, status, senha, endereco) {
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
        this.senha = senha;
        this.endereco = endereco;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idempresa' }),
        __metadata("design:type", Number)
    ], Empresa.prototype, "idEmpresa", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 14, unique: true }),
        __metadata("design:type", String)
    ], Empresa.prototype, "cnpj", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'inscricao_estadual', nullable: true }),
        __metadata("design:type", String)
    ], Empresa.prototype, "inscricaoEstadual", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'inscricao_municipal', nullable: true }),
        __metadata("design:type", String)
    ], Empresa.prototype, "inscricaoMunicipal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'nome_fantasia' }),
        __metadata("design:type", String)
    ], Empresa.prototype, "nomeFantasia", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'razao_social' }),
        __metadata("design:type", String)
    ], Empresa.prototype, "razaoSocial", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 15, name: 'telefone_comercial' }),
        __metadata("design:type", String)
    ], Empresa.prototype, "telefoneComercial", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'nome_responsavel_legal' }),
        __metadata("design:type", String)
    ], Empresa.prototype, "nomeResponsavelLegal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 15, name: 'telefone_responsavel_legal' }),
        __metadata("design:type", String)
    ], Empresa.prototype, "telefoneResponsavelLegal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'email_responsavel_legal', unique: true }),
        __metadata("design:type", String)
    ], Empresa.prototype, "emailResponsavelLegal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date', name: 'data_cadastramento' }),
        __metadata("design:type", Date)
    ], Empresa.prototype, "dataCadastramento", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
        __metadata("design:type", String)
    ], Empresa.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], Empresa.prototype, "senha", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return EnderecoEntity_1.Endereco; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", EnderecoEntity_1.Endereco)
    ], Empresa.prototype, "endereco", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return VagaEntity_1.Vagas; }, function (vagas) { return vagas.empresa; }),
        __metadata("design:type", Array)
    ], Empresa.prototype, "vagas", void 0);
    Empresa = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, Date, String, String, EnderecoEntity_1.Endereco])
    ], Empresa);
    return Empresa;
}());
exports.Empresa = Empresa;
