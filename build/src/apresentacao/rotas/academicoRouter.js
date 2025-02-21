"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AcademicoController_1 = __importDefault(require("../../aplicacao/controladores/AcademicoController"));
var AcademicoRepository_1 = __importDefault(require("../../dominio/repositorios/AcademicoRepository"));
var dataSource_1 = require("../../infraestrutura/config/dataSource");
var router = express_1.default.Router();
var academicoRepository = new AcademicoRepository_1.default(dataSource_1.AppDataSource.getRepository("Academico"));
var academicoController = new AcademicoController_1.default(academicoRepository);
router.post("/", academicoController.criaAcademico.bind(academicoController));
router.get("/", academicoController.listaAcademicos.bind(academicoController));
router.get("/:id", academicoController.listaAcademico.bind(academicoController));
router.put("/:id", academicoController.atualizaAcademico.bind(academicoController));
router.delete("/:id", academicoController.deletaAcademico.bind(academicoController));
exports.default = router;
