import express from "express";
import AcademicoController from "../../aplicacao/controladores/AcademicoController";
import AcademicoRepository from "../../dominio/repositorios/AcademicoRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const academicoRepository = new AcademicoRepository(
    AppDataSource.getRepository("Academico")
);

const academicoController = new AcademicoController(academicoRepository);

router.post("/", academicoController.criaAcademico.bind(academicoController));
router.get("/",  academicoController.listaAcademicos.bind(academicoController));
router.get("/:id",academicoController.listaAcademico.bind(academicoController));
router.put("/:id", academicoController.atualizaAcademico.bind(academicoController));
router.delete("/:id", academicoController.deletaAcademico.bind(academicoController));

export default router;
