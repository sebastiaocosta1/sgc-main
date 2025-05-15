import express from "express";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import EntrevistaRepository from "../../dominio/repositorios/EntrevistaRepository";
import EntrevistaController from "../../aplicacao/controladores/EntrevistaController";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const entrevistaRepository = new EntrevistaRepository(
    AppDataSource.getRepository("Entrevista")
);

const entrevistaController = new EntrevistaController(entrevistaRepository);

router.post("/",  entrevistaController.criaEntrevista.bind(entrevistaController));
router.get("/",  entrevistaController.listaEntrevistas.bind(entrevistaController));
router.get("/:id",  entrevistaController.listaEntrevista.bind(entrevistaController));
router.put("/:id",  entrevistaController.atualizaEntrevista.bind(entrevistaController));
router.delete("/:id",  entrevistaController.deletaEntrevista.bind(entrevistaController));

export default router;
