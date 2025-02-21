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
exports.Candidaturas = void 0;
var typeorm_1 = require("typeorm");
var VagaEntity_1 = require("./VagaEntity");
var ContratacoesEntity_1 = require("./ContratacoesEntity");
var EntrevistaEntity_1 = require("./EntrevistaEntity"); // Importe a entidade Entrevista
var AcademicoEntity_1 = require("./AcademicoEntity"); // Importe a entidade Academicos
var Candidaturas = /** @class */ (function () {
    function Candidaturas(dataCandidatura, statusCandidatura, vaga, contratacao, entrevista, academico) {
        this.dataCandidatura = dataCandidatura;
        this.statusCandidatura = statusCandidatura;
        this.vaga = vaga;
        this.contratacao = contratacao;
        this.entrevista = entrevista;
        this.academico = academico;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idcandidatura' }),
        __metadata("design:type", Number)
    ], Candidaturas.prototype, "idCandidatura", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date', name: 'data_candidatura' }),
        __metadata("design:type", Date)
    ], Candidaturas.prototype, "dataCandidatura", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'status_candidatura' }),
        __metadata("design:type", String)
    ], Candidaturas.prototype, "statusCandidatura", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return VagaEntity_1.Vagas; }, function (vagas) { return vagas.candidaturas; }),
        __metadata("design:type", VagaEntity_1.Vagas)
    ], Candidaturas.prototype, "vaga", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return ContratacoesEntity_1.Contratacoes; }, function (contratacao) { return contratacao.candidatura; }),
        __metadata("design:type", ContratacoesEntity_1.Contratacoes)
    ], Candidaturas.prototype, "contratacao", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return EntrevistaEntity_1.Entrevista; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", EntrevistaEntity_1.Entrevista)
    ], Candidaturas.prototype, "entrevista", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return AcademicoEntity_1.Academico; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", AcademicoEntity_1.Academico)
    ], Candidaturas.prototype, "academico", void 0);
    Candidaturas = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [Date, String, VagaEntity_1.Vagas, ContratacoesEntity_1.Contratacoes, EntrevistaEntity_1.Entrevista, AcademicoEntity_1.Academico])
    ], Candidaturas);
    return Candidaturas;
}());
exports.Candidaturas = Candidaturas;
