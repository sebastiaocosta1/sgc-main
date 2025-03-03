import express from "express";
import CandidaturaController from "../../aplicacao/controladores/CandidaturaController";
import CandidaturaRepository from "../../dominio/repositorios/CandidaturaRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";

const router = express.Router();

const candidaturaRepository = new CandidaturaRepository(
    AppDataSource.getRepository("Candidaturas")
);

const candidaturaController = new CandidaturaController(candidaturaRepository);

router.post("/", candidaturaController.criaCandidatura.bind(candidaturaController));
router.get("/", candidaturaController.listaCandidaturas.bind(candidaturaController));
router.get("/:id", candidaturaController.listaCandidatura.bind(candidaturaController));
router.put("/:id", candidaturaController.atualizaCandidatura.bind(candidaturaController));
router.delete("/:id", candidaturaController.deletaCandidatura.bind(candidaturaController));

export default router;
