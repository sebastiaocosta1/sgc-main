import express from "express";
import AcademicoController from "../../aplicacao/controladores/AcademicoController";
import AcademicoRepository from "../../dominio/repositorios/AcademicoRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";
import { upload } from "../../utilitarios/uploadCurriculos";

const router = express.Router();

const academicoRepository = new AcademicoRepository(
  AppDataSource.getRepository("Academico"),
  AppDataSource.getRepository("Usuario")
);

const academicoController = new AcademicoController(academicoRepository);

router.post("/", upload.single("curriculo"), academicoController.criaAcademico.bind(academicoController));
router.get("/", authMiddleware, academicoController.listaAcademicos.bind(academicoController));
router.get("/:id", authMiddleware, academicoController.listaAcademico.bind(academicoController));
router.put("/:id", authMiddleware, upload.single("curriculo"), academicoController.atualizaAcademico.bind(academicoController));
router.delete("/:id", authMiddleware, academicoController.deletaAcademico.bind(academicoController));

export default router;
