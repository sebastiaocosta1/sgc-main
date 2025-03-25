import express from "express";
import AdministradorController from "../../aplicacao/controladores/AdministradorController";
import AdministradorRepository from "../../dominio/repositorios/AdministradorRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import UsuarioRepository from "../../dominio/repositorios/UsuarioRepository";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const administradorRepository = new AdministradorRepository(
    AppDataSource.getRepository("Administrador")
);

const userRepository = new UsuarioRepository(
    AppDataSource.getRepository("Usuario")
);

const administradorController = new AdministradorController(administradorRepository);

router.post("/", administradorController.criaAdministrador.bind(administradorController));
router.get("/",  administradorController.listaAdministradores.bind(administradorController));
router.get("/:id", administradorController.listaAdministrador.bind(administradorController));
router.put("/:id",  authMiddleware, administradorController.atualizaAdministrador.bind(administradorController));
router.delete("/:id",  authMiddleware, administradorController.deletaAdministrador.bind(administradorController));

export default router;