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
var UsuarioRepository = /** @class */ (function () {
    function UsuarioRepository(repository) {
        this.repository = repository;
    }
    UsuarioRepository.prototype.criaUsuario = function (usuario) {
        this.repository.save(usuario);
    };
    UsuarioRepository.prototype.listaUsuarios = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsuarioRepository.prototype.listaUsuario = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne({ where: { idUsuario: id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsuarioRepository.prototype.atualizaUsuarios = function (id, usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var usuarioToUpdate, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.repository.findOne({ where: { idUsuario: id } })];
                    case 1:
                        usuarioToUpdate = _a.sent();
                        if (!usuarioToUpdate) {
                            return [2 /*return*/, { success: false, message: "Usuário não encontrado." }];
                        }
                        Object.assign(usuarioToUpdate, usuario);
                        return [4 /*yield*/, this.repository.save(usuarioToUpdate)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: "Usuário atualizado com sucesso!" }];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Erro ao atualizar usuário:", error_1);
                        return [2 /*return*/, { success: false, message: "Erro ao atualizar o usuário." }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioRepository.prototype.deletaUsuarios = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var usuarioToDelete, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.repository.findOne({ where: { idUsuario: id } })];
                    case 1:
                        usuarioToDelete = _a.sent();
                        if (!usuarioToDelete) {
                            return [2 /*return*/, { success: false, message: "Usuário não encontrado." }];
                        }
                        return [4 /*yield*/, this.repository.remove(usuarioToDelete)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: "Usuário excluído com sucesso!" }];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Erro ao excluir usuário:", error_2);
                        return [2 /*return*/, { success: false, message: "Erro ao excluir o usuário." }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioRepository.prototype.loginUsuario = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne({ where: { usuario: usuario } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UsuarioRepository;
}());
exports.default = UsuarioRepository;
