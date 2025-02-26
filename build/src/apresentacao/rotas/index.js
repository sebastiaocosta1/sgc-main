"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var administradorRouter_1 = __importDefault(require("../rotas/administradorRouter"));
var usuarioRouter_1 = __importDefault(require("../rotas/usuarioRouter"));
var enderecoRouter_1 = __importDefault(require("../rotas/enderecoRouter"));
var academicoRouter_1 = __importDefault(require("../rotas/academicoRouter"));
var empresaRouter_1 = __importDefault(require("../rotas/empresaRouter"));
var router = function (app) {
    app.use("/administradores", administradorRouter_1.default);
    app.use("/usuarios", usuarioRouter_1.default);
    app.use("/enderecos", enderecoRouter_1.default);
    app.use("/academicos", academicoRouter_1.default);
    app.use("/empresas", empresaRouter_1.default);
};
exports.default = router;
