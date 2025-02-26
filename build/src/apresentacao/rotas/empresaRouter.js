"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var EmpresaRepository_1 = __importDefault(require("../../dominio/repositorios/EmpresaRepository"));
var dataSource_1 = require("../../infraestrutura/config/dataSource");
var EmpesaController_1 = __importDefault(require("../../aplicacao/controladores/EmpesaController"));
var router = express_1.default.Router();
// Inicializa o repositório da entidade Empresa
var empresaRepository = new EmpresaRepository_1.default(dataSource_1.AppDataSource.getRepository("Empresa"));
// Inicializa o controlador da entidade Empresa
var empresaController = new EmpesaController_1.default(empresaRepository);
// Rota para criar uma nova empresa
router.post("/", empresaController.criaEmpresa.bind(empresaController));
// Rota para listar todas as empresas
router.get("/", empresaController.listaEmpresas.bind(empresaController));
// Rota para buscar uma empresa específica pelo ID
router.get("/:id", empresaController.listaEmpresa.bind(empresaController));
// Rota para atualizar os dados de uma empresa pelo ID
router.put("/:id", empresaController.atualizaEmpresa.bind(empresaController));
// Rota para deletar uma empresa pelo ID
router.delete("/:id", empresaController.deletaEmpresa.bind(empresaController));
exports.default = router;
