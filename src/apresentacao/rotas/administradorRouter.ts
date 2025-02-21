import express from "express";
import AdministradorController from "../../aplicacao/controladores/AdministradorController";
import AdministradorRepository from "../../dominio/repositorios/AdministradorRepository";
import { AppDataSource } from "../../infraestrutura/config/dataSource";


const router = express.Router();

const administradorRepository = new AdministradorRepository(
    AppDataSource.getRepository("Administrador")
);

const administradorController = new AdministradorController(administradorRepository);

router.post("/", administradorController.criaAdministrador.bind(administradorController));
router.get("/", administradorController.listaAdministradores.bind(administradorController));
router.get("/:id", administradorController.listaAdministrador.bind(administradorController));
router.put("/:id", administradorController.atualizaAdministrador.bind(administradorController));
router.delete("/:id", administradorController.deletaAdministrador.bind(administradorController));

export default router;