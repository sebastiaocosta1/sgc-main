import express from "express";
import VagaRepository from "../../dominio/repositorios/VagaRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import VagaController from "../../aplicacao/controladores/VagaController";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const vagaRepository = new VagaRepository(
    AppDataSource.getRepository("Vagas")
);

const vagaController = new VagaController(vagaRepository);

router.post("/", authMiddleware, vagaController.criaVaga.bind(vagaController));
router.get("/", authMiddleware, vagaController.listaVagas.bind(vagaController));
router.get("/:id", authMiddleware, vagaController.listaVaga.bind(vagaController));
router.put("/:id", authMiddleware, vagaController.atualizaVaga.bind(vagaController));
router.delete("/:id", authMiddleware, vagaController.deletaVaga.bind(vagaController));

export default router;
