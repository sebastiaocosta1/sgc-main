import express from "express";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import UsuarioRepository from "../../dominio/repositorios/UsuarioRepository";
import UsuarioController from "../../aplicacao/controladores/UsuarioController";
import { authMiddleware } from "../../aplicacao/meddlewares/authMiddleare";

const router = express.Router();

const usuarioRepository = new UsuarioRepository(
    AppDataSource.getRepository("Usuario")
);

const usuarioController = new UsuarioController(usuarioRepository);


router.post("/login", usuarioController.login.bind(usuarioController));
router.post("/", usuarioController.criaUsuario.bind(usuarioController));
router.get("/", authMiddleware, usuarioController.listaUsuarios.bind(usuarioController));
router.get("/:id", authMiddleware, usuarioController.listaUsuario.bind(usuarioController));
router.put("/:id", authMiddleware, usuarioController.atualizaUsuario.bind(usuarioController));
router.delete("/:id", authMiddleware, usuarioController.deletaUsuario.bind(usuarioController));


export default router;
