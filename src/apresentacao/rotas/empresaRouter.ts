import express from "express";
import EmpresaRepository from "../../dominio/repositorios/EmpresaRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import EmpresaController from "../../aplicacao/controladores/EmpesaController";
import UsuarioRepository from "../../dominio/repositorios/UsuarioRepository";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const empresaRepository = new EmpresaRepository(
    AppDataSource.getRepository("Empresa")
);
const userRepository = new UsuarioRepository(
    AppDataSource.getRepository("Usuario")
);

const empresaController = new EmpresaController(empresaRepository);

router.post("/", empresaController.criaEmpresa.bind(empresaController));
router.get("/",  empresaController.listaEmpresas.bind(empresaController));
router.get("/:id",  empresaController.listaEmpresa.bind(empresaController));
router.put("/:id",  empresaController.atualizaEmpresa.bind(empresaController));
router.delete("/:id",  empresaController.deletaEmpresa.bind(empresaController));

export default router;