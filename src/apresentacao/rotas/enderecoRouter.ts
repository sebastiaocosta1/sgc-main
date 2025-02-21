import express from "express";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import EnderecoRepository from "../../dominio/repositorios/EnderecoRepository";
import EnderecoController from "../../aplicacao/controladores/EnderecoController";

const router = express.Router();

// Criando instâncias do repositório e do controlador
const enderecoRepository = new EnderecoRepository(
    AppDataSource.getRepository("Endereco")
);

const enderecoController = new EnderecoController(enderecoRepository);

router.post("/", enderecoController.criaEndereco.bind(enderecoController));
router.get("/", enderecoController.listaEnderecos.bind(enderecoController));
router.get("/:id", enderecoController.listaEndereco.bind(enderecoController));
router.put("/:id", enderecoController.atualizaEndereco.bind(enderecoController));
// router.delete("/:id", enderecoController.deletaEndereco.bind(enderecoController));

export default router;
