"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dataSource_1 = require("../../infraestrutura/config/dataSource");
var EnderecoRepository_1 = __importDefault(require("../../dominio/repositorios/EnderecoRepository"));
var EnderecoController_1 = __importDefault(require("../../aplicacao/controladores/EnderecoController"));
var router = express_1.default.Router();
// Criando instâncias do repositório e do controlador
var enderecoRepository = new EnderecoRepository_1.default(dataSource_1.AppDataSource.getRepository("Endereco"));
var enderecoController = new EnderecoController_1.default(enderecoRepository);
router.post("/", enderecoController.criaEndereco.bind(enderecoController));
router.get("/", enderecoController.listaEnderecos.bind(enderecoController));
router.get("/:id", enderecoController.listaEndereco.bind(enderecoController));
router.put("/:id", enderecoController.atualizaEndereco.bind(enderecoController));
// router.delete("/:id", enderecoController.deletaEndereco.bind(enderecoController));
exports.default = router;
