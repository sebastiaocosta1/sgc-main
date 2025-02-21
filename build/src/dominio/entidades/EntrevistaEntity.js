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
exports.Entrevista = void 0;
var typeorm_1 = require("typeorm");
var CandidaturaEntity_1 = require("./CandidaturaEntity"); // Importe a entidade Candidaturas
var Entrevista = /** @class */ (function () {
    function Entrevista(data, hora, modalidade, texto, respostaConvidado, candidatura) {
        this.data = data;
        this.hora = hora;
        this.modalidade = modalidade;
        this.texto = texto;
        this.respostaConvidado = respostaConvidado || null;
        this.candidatura = candidatura || null;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'identrevista' }),
        __metadata("design:type", Number)
    ], Entrevista.prototype, "idEntrevista", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], Entrevista.prototype, "data", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'time' }),
        __metadata("design:type", String)
    ], Entrevista.prototype, "hora", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
        __metadata("design:type", String)
    ], Entrevista.prototype, "modalidade", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Entrevista.prototype, "texto", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', name: 'resposta_convidado', nullable: true }),
        __metadata("design:type", String)
    ], Entrevista.prototype, "respostaConvidado", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return CandidaturaEntity_1.Candidaturas; }, function (candidatura) { return candidatura.entrevista; }),
        __metadata("design:type", CandidaturaEntity_1.Candidaturas)
    ], Entrevista.prototype, "candidatura", void 0);
    Entrevista = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [Date, String, String, String, String, CandidaturaEntity_1.Candidaturas])
    ], Entrevista);
    return Entrevista;
}());
exports.Entrevista = Entrevista;
