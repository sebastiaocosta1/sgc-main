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
exports.Endereco = void 0;
var typeorm_1 = require("typeorm");
var Endereco = /** @class */ (function () {
    function Endereco(cep, cidade, estado, rua, numero) {
        this.cep = cep;
        this.cidade = cidade;
        this.estado = estado;
        this.rua = rua;
        this.numero = numero;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Endereco.prototype, "idEndereco", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 9 }),
        __metadata("design:type", String)
    ], Endereco.prototype, "cep", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100 }),
        __metadata("design:type", String)
    ], Endereco.prototype, "cidade", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 2 }),
        __metadata("design:type", String)
    ], Endereco.prototype, "estado", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 100 }),
        __metadata("design:type", String)
    ], Endereco.prototype, "rua", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Endereco.prototype, "numero", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
        __metadata("design:type", String)
    ], Endereco.prototype, "status", void 0);
    Endereco = __decorate([
        (0, typeorm_1.Entity)("enderecos"),
        __metadata("design:paramtypes", [String, String, String, String, String])
    ], Endereco);
    return Endereco;
}());
exports.Endereco = Endereco;
