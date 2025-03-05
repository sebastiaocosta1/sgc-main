import express from "express";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import EnderecoRepository from "../../dominio/repositorios/EnderecoRepository";
import EnderecoController from "../../aplicacao/controladores/EnderecoController";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const enderecoRepository = new EnderecoRepository(
    AppDataSource.getRepository("Endereco")
);

const enderecoController = new EnderecoController(enderecoRepository);

router.post("/", enderecoController.criaEndereco.bind(enderecoController));
router.get("/",  authMiddleware, enderecoController.listaEnderecos.bind(enderecoController));
router.get("/:id",  authMiddleware, enderecoController.listaEndereco.bind(enderecoController));
router.put("/:id",  authMiddleware, enderecoController.atualizaEndereco.bind(enderecoController));
// router.delete("/:id", enderecoController.deletaEndereco.bind(enderecoController));

export default router;
