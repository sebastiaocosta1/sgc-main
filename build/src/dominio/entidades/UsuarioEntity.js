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
exports.Usuario = void 0;
var typeorm_1 = require("typeorm");
var Usuario = /** @class */ (function () {
    function Usuario(usuario, senha, tipo) {
        this.usuario = usuario;
        this.senha = senha;
        this.tipo = tipo;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idusuario' }),
        __metadata("design:type", Number)
    ], Usuario.prototype, "idUsuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
        __metadata("design:type", String)
    ], Usuario.prototype, "usuario", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], Usuario.prototype, "senha", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
        __metadata("design:type", String)
    ], Usuario.prototype, "tipo", void 0);
    Usuario = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, String])
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
