"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AdministradorController_1 = __importDefault(require("../../aplicacao/controladores/AdministradorController"));
var AdministradorRepository_1 = __importDefault(require("../../dominio/repositorios/AdministradorRepository"));
var dataSource_1 = require("../../infraestrutura/config/dataSource");
var router = express_1.default.Router();
var administradorRepository = new AdministradorRepository_1.default(dataSource_1.AppDataSource.getRepository("Administrador"));
var administradorController = new AdministradorController_1.default(administradorRepository);
router.post("/", administradorController.criaAdministrador.bind(administradorController));
router.get("/", administradorController.listaAdministradores.bind(administradorController));
router.get("/:id", administradorController.listaAdministrador.bind(administradorController));
router.put("/:id", administradorController.atualizaAdministrador.bind(administradorController));
router.delete("/:id", administradorController.deletaAdministrador.bind(administradorController));
exports.default = router;
