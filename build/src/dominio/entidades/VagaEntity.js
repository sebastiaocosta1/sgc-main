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
exports.Vagas = void 0;
var typeorm_1 = require("typeorm");
var EmpresaEntity_1 = require("./EmpresaEntity"); // Importe a entidade Empresa
var CandidaturaEntity_1 = require("./CandidaturaEntity"); // Importe a entidade Candidaturas
var Vagas = /** @class */ (function () {
    function Vagas(cargo, salario, tipo, horarioExpediente, principaisAtividades, dataPublicacao, statusVaga, statusCadastro, empresa) {
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
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idvagas' }),
        __metadata("design:type", Number)
    ], Vagas.prototype, "idVagas", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
        __metadata("design:type", String)
    ], Vagas.prototype, "cargo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
        __metadata("design:type", Number)
    ], Vagas.prototype, "salario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
        __metadata("design:type", String)
    ], Vagas.prototype, "tipo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
        __metadata("design:type", String)
    ], Vagas.prototype, "horarioExpediente", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', name: 'principais_atividades' }),
        __metadata("design:type", String)
    ], Vagas.prototype, "principaisAtividades", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date', name: 'data_publicacao' }),
        __metadata("design:type", Date)
    ], Vagas.prototype, "dataPublicacao", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'status_vaga' }),
        __metadata("design:type", String)
    ], Vagas.prototype, "statusVaga", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'status_cadastro' }),
        __metadata("design:type", String)
    ], Vagas.prototype, "statusCadastro", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return EmpresaEntity_1.Empresa; }, function (empresa) { return empresa.vagas; }),
        __metadata("design:type", EmpresaEntity_1.Empresa)
    ], Vagas.prototype, "empresa", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return CandidaturaEntity_1.Candidaturas; }, function (candidaturas) { return candidaturas.vaga; }),
        __metadata("design:type", Array)
    ], Vagas.prototype, "candidaturas", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Vagas; }, function (vagas) { return vagas.empresa; }),
        __metadata("design:type", Array)
    ], Vagas.prototype, "vagas", void 0);
    Vagas = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, Number, String, String, String, Date, String, String, EmpresaEntity_1.Empresa])
    ], Vagas);
    return Vagas;
}());
exports.Vagas = Vagas;
