"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UsuarioEntity_1 = require("../../dominio/entidades/UsuarioEntity");
var bcrypt_1 = __importDefault(require("bcrypt"));
var UsuarioController = /** @class */ (function () {
    function UsuarioController(repository) {
        this.repository = repository;
    }
    UsuarioController.prototype.criaUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, usuario, senha, tipo, status_1, senhaHash, novoUsuario, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, usuario = _a.usuario, senha = _a.senha, tipo = _a.tipo, status_1 = _a.status;
                        if (!usuario || !senha || !tipo || !status_1) {
                            res.status(400).json({ message: "Todos os campos são obrigatórios." });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(senha, 10)];
                    case 1:
                        senhaHash = _b.sent();
                        novoUsuario = new UsuarioEntity_1.Usuario(usuario, senhaHash, tipo, status_1);
                        return [4 /*yield*/, this.repository.criaUsuario(novoUsuario)];
                    case 2:
                        _b.sent();
                        res.status(201).json(novoUsuario);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error("Erro ao criar usuário:", error_1);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.listaUsuarios = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuarios, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.listaUsuarios()];
                    case 1:
                        usuarios = _a.sent();
                        res.status(200).json(usuarios);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Erro ao listar usuários:", error_2);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.listaUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, usuario, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.repository.listaUsuario(Number(id))];
                    case 1:
                        usuario = _a.sent();
                        if (!usuario) {
                            res.status(404).json({ message: "Usuário não encontrado." });
                            return [2 /*return*/];
                        }
                        res.status(200).json(usuario);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Erro ao buscar usuário:", error_3);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.atualizaUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, usuario, senha, tipo, senhaHash, _b, dadosAtualizados, _c, success, message, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        id = req.params.id;
                        _a = req.body, usuario = _a.usuario, senha = _a.senha, tipo = _a.tipo;
                        if (!senha) return [3 /*break*/, 2];
                        return [4 /*yield*/, bcrypt_1.default.hash(senha, 10)];
                    case 1:
                        _b = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = undefined;
                        _d.label = 3;
                    case 3:
                        senhaHash = _b;
                        dadosAtualizados = __assign({ usuario: usuario, senha: senha }, (senhaHash && { senha: senhaHash }));
                        return [4 /*yield*/, this.repository.atualizaUsuarios(Number(id), dadosAtualizados)];
                    case 4:
                        _c = _d.sent(), success = _c.success, message = _c.message;
                        if (!success) {
                            res.status(404).json({ message: message });
                            return [2 /*return*/];
                        }
                        res.sendStatus(204);
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _d.sent();
                        console.error("Erro ao atualizar usuário:", error_4);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.deletaUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, success, message, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.repository.deletaUsuarios(Number(id))];
                    case 1:
                        _a = _b.sent(), success = _a.success, message = _a.message;
                        if (!success) {
                            res.status(404).json({ message: message });
                            return [2 /*return*/];
                        }
                        res.sendStatus(204);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        console.error("Erro ao deletar usuário:", error_5);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsuarioController;
}());
exports.default = UsuarioController;
