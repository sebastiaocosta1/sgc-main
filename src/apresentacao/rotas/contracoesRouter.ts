import express from "express";

import { AppDataSource } from "../../infraestrutura/config/dataSource";
import ContratacaoRepository from "../../dominio/repositorios/ContratacoesRepository";
import ContratacaoController from "../../aplicacao/controladores/ContratacoesController";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const contratacaoRepository = new ContratacaoRepository(
    AppDataSource.getRepository("Contratacoes")
);

const contratacaoController = new ContratacaoController(contratacaoRepository);

router.post("/",  contratacaoController.criaContratacao.bind(contratacaoController));
router.get("/",   authMiddleware ,contratacaoController.listaContratacoes.bind(contratacaoController));
router.get("/:id",   authMiddleware ,contratacaoController.listaContratacao.bind(contratacaoController));
router.put("/:id",   authMiddleware ,contratacaoController.atualizaContratacao.bind(contratacaoController));
router.delete("/:id",  authMiddleware ,contratacaoController.deletaContratacao.bind(contratacaoController));

export default router;
 