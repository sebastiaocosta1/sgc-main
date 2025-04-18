import express from "express";
import CandidaturaController from "../../aplicacao/controladores/CandidaturaController";
import CandidaturaRepository from "../../dominio/repositorios/CandidaturaRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const candidaturaRepository = new CandidaturaRepository(
    AppDataSource.getRepository("Candidaturas")
);

const candidaturaController = new CandidaturaController(candidaturaRepository);

router.post("/", candidaturaController.criaCandidatura.bind(candidaturaController));
router.get("/",  authMiddleware, candidaturaController.listaCandidaturas.bind(candidaturaController));
router.get("/:id",  authMiddleware, candidaturaController.listaCandidatura.bind(candidaturaController));
router.put("/:id",  authMiddleware, candidaturaController.atualizaCandidatura.bind(candidaturaController));
router.delete("/:id",  authMiddleware, candidaturaController.deletaCandidatura.bind(candidaturaController));

export default router;
