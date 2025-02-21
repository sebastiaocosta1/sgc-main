"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var AcademicoEntity_1 = require("../../dominio/entidades/AcademicoEntity");
var AcademicoController = /** @class */ (function () {
    function AcademicoController(repository) {
        this.repository = repository;
    }
    AcademicoController.prototype.criaAcademico = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, idade, email, telefone, hardskills, softskills, matricula, curriculo, senha, novoAcademico, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, nome = _a.nome, idade = _a.idade, email = _a.email, telefone = _a.telefone, hardskills = _a.hardskills, softskills = _a.softskills, matricula = _a.matricula, curriculo = _a.curriculo, senha = _a.senha;
                        if (!nome || !idade || !email || !telefone || !hardskills || !softskills || !matricula || !senha) {
                            res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
                            return [2 /*return*/];
                        }
                        novoAcademico = new AcademicoEntity_1.Academico(nome, idade, email, telefone, hardskills, softskills, matricula, curriculo, senha);
                        return [4 /*yield*/, this.repository.criaAcademico(novoAcademico)];
                    case 1:
                        _b.sent();
                        res.status(201).json(novoAcademico);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error("Erro ao criar acadêmico:", error_1);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AcademicoController.prototype.listaAcademicos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var academicos, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.listaAcademicos()];
                    case 1:
                        academicos = _a.sent();
                        res.status(200).json(academicos);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Erro ao listar acadêmicos:", error_2);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AcademicoController.prototype.listaAcademico = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, academico, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.repository.listaAcademico(Number(id))];
                    case 1:
                        academico = _a.sent();
                        if (!academico) {
                            res.status(404).json({ message: "Acadêmico não encontrado." });
                            return [2 /*return*/];
                        }
                        res.status(200).json(academico);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Erro ao buscar acadêmico:", error_3);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AcademicoController.prototype.atualizaAcademico = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, dadosAtualizados, _a, success, message, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        dadosAtualizados = req.body;
                        return [4 /*yield*/, this.repository.atualizaAcademico(Number(id), dadosAtualizados)];
                    case 1:
                        _a = _b.sent(), success = _a.success, message = _a.message;
                        if (!success) {
                            res.status(404).json({ message: message });
                            return [2 /*return*/];
                        }
                        res.sendStatus(204);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error("Erro ao atualizar acadêmico:", error_4);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AcademicoController.prototype.deletaAcademico = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, success, message, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.repository.deletaAcademico(Number(id))];
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
                        console.error("Erro ao deletar acadêmico:", error_5);
                        res.status(500).json({ message: "Erro interno do servidor." });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AcademicoController;
}());
exports.default = AcademicoController;
