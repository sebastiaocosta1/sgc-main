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
exports.Administrador = void 0;
var typeorm_1 = require("typeorm");
var Administrador = /** @class */ (function () {
    function Administrador(nomeCompleto, cpf, cargo, usuario, status, senha) {
        this.nomeCompleto = nomeCompleto;
        this.cpf = cpf;
        this.cargo = cargo;
        this.usuario = usuario;
        this.status = status;
        this.senha = senha;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Administrador.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'nome_completo', type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], Administrador.prototype, "nomeCompleto", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 11, unique: true }),
        __metadata("design:type", String)
    ], Administrador.prototype, "cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
        __metadata("design:type", String)
    ], Administrador.prototype, "cargo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
        __metadata("design:type", String)
    ], Administrador.prototype, "usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
        __metadata("design:type", String)
    ], Administrador.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], Administrador.prototype, "senha", void 0);
    Administrador = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, String, String, String, String])
    ], Administrador);
    return Administrador;
}());
exports.Administrador = Administrador;
