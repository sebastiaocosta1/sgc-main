"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dataSource_1 = require("../../infraestrutura/config/dataSource");
var UsuarioRepository_1 = __importDefault(require("../../dominio/repositorios/UsuarioRepository"));
var UsuarioController_1 = __importDefault(require("../../aplicacao/controladores/UsuarioController"));
var router = express_1.default.Router();
var usuarioRepository = new UsuarioRepository_1.default(dataSource_1.AppDataSource.getRepository("Usuario"));
var usuarioController = new UsuarioController_1.default(usuarioRepository);
router.post("/", usuarioController.criaUsuario.bind(usuarioController));
router.get("/", usuarioController.listaUsuarios.bind(usuarioController));
router.get("/:id", usuarioController.listaUsuario.bind(usuarioController));
router.put("/:id", usuarioController.atualizaUsuario.bind(usuarioController));
router.delete("/:id", usuarioController.deletaUsuario.bind(usuarioController));
exports.default = router;
