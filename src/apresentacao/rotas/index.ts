import express from "express";

import adminstradorRouter from "../rotas/administradorRouter";
import usuarioRouter from "../rotas/usuarioRouter";
import enderecoRouter from "../rotas/enderecoRouter";
import academicoRoter from "../rotas/academicoRouter";
import empresaRouter from "../rotas/empresaRouter";
import vagaRouter from "../rotas/vagaRouter";
import candidaturaRouter from "../rotas/candidaturaRouter";
import entrevistaRouter from "../rotas/entrevistaRouter";
import contratacoesRouter from "./contracoesRouter";

const router = (app: express.Router) => {
   
    app.use("/verificaLogin", usuarioRouter);
    app.use("/administradores", adminstradorRouter);
    app.use("/usuarios", usuarioRouter);
    app.use("/login", usuarioRouter);
    app.use("/enderecos", enderecoRouter);
    app.use("/academicos", academicoRoter);
    app.use("/empresas", empresaRouter);
    app.use("/vagas", vagaRouter);
    app.use("/candidaturas", candidaturaRouter);
    app.use("/entrevistas", entrevistaRouter);
    app.use("/contratacoes", contratacoesRouter);
};

export default router;