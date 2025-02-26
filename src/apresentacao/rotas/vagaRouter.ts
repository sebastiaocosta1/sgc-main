import express from "express";
import VagaRepository from "../../dominio/repositorios/VagaRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import VagaController from "../../aplicacao/controladores/VagaController";

const router = express.Router();

const vagaRepository = new VagaRepository(
    AppDataSource.getRepository("Vagas")
);

const vagaController = new VagaController(vagaRepository);

router.post("/", vagaController.criaVaga.bind(vagaController));
router.get("/", vagaController.listaVagas.bind(vagaController));
router.get("/:id", vagaController.listaVaga.bind(vagaController));
router.put("/:id", vagaController.atualizaVaga.bind(vagaController));
router.delete("/:id", vagaController.deletaVaga.bind(vagaController));

export default router;
