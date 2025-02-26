import express from "express";
import EmpresaRepository from "../../dominio/repositorios/EmpresaRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import EmpresaController from "../../aplicacao/controladores/EmpesaController";

const router = express.Router();

// Inicializa o repositório da entidade Empresa
const empresaRepository = new EmpresaRepository(
    AppDataSource.getRepository("Empresa")
);

// Inicializa o controlador da entidade Empresa
const empresaController = new EmpresaController(empresaRepository);

// Rota para criar uma nova empresa
router.post("/", empresaController.criaEmpresa.bind(empresaController));

// Rota para listar todas as empresas
router.get("/", empresaController.listaEmpresas.bind(empresaController));

// Rota para buscar uma empresa específica pelo ID
router.get("/:id", empresaController.listaEmpresa.bind(empresaController));

// Rota para atualizar os dados de uma empresa pelo ID
router.put("/:id", empresaController.atualizaEmpresa.bind(empresaController));

// Rota para deletar uma empresa pelo ID
router.delete("/:id", empresaController.deletaEmpresa.bind(empresaController));

export default router;