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
exports.Academico = void 0;
var typeorm_1 = require("typeorm");
var CandidaturaEntity_1 = require("./CandidaturaEntity");
var Academico = /** @class */ (function () {
    function Academico(nome, idade, email, telefone, hardskills, softskills, matricula, curriculo, senha, candidatura) {
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.telefone = telefone;
        this.hardskills = hardskills;
        this.softskills = softskills;
        this.matricula = matricula;
        this.curriculo = curriculo;
        this.senha = senha;
        this.candidatura = candidatura || null;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idacademico' }),
        __metadata("design:type", Number)
    ], Academico.prototype, "idAcademico", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], Academico.prototype, "nome", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Academico.prototype, "idade", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
        __metadata("design:type", String)
    ], Academico.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
        __metadata("design:type", String)
    ], Academico.prototype, "telefone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Academico.prototype, "hardskills", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Academico.prototype, "softskills", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
        __metadata("design:type", String)
    ], Academico.prototype, "matricula", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Academico.prototype, "curriculo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], Academico.prototype, "senha", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return CandidaturaEntity_1.Candidaturas; }, function (candidatura) { return candidatura.academico; }),
        __metadata("design:type", CandidaturaEntity_1.Candidaturas)
    ], Academico.prototype, "candidatura", void 0);
    Academico = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, Number, String, String, String, String, String, String, String, CandidaturaEntity_1.Candidaturas])
    ], Academico);
    return Academico;
}());
exports.Academico = Academico;
