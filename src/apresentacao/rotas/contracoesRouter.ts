import express from "express";

import { AppDataSource } from "../../infraestrutura/config/dataSource";
import ContratacaoRepository from "../../dominio/repositorios/ContratacoesRepository";
import ContratacaoController from "../../aplicacao/controladores/ContratacoesController";

const router = express.Router();

const contratacaoRepository = new ContratacaoRepository(
    AppDataSource.getRepository("Contratacoes")
);

const contratacaoController = new ContratacaoController(contratacaoRepository);

router.post("/", contratacaoController.criaContratacao.bind(contratacaoController));
router.get("/", contratacaoController.listaContratacoes.bind(contratacaoController));
router.get("/:id", contratacaoController.listaContratacao.bind(contratacaoController));
router.put("/:id", contratacaoController.atualizaContratacao.bind(contratacaoController));
router.delete("/:id", contratacaoController.deletaContratacao.bind(contratacaoController));

export default router;
