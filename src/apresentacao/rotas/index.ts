import express from "express";

import adminstradorRouter from "../rotas/administradorRouter";
import usuarioRouter from "../rotas/usuarioRouter";
import enderecoRouter from "../rotas/enderecoRouter";
import academicoRoter from "../rotas/academicoRouter";
import empresaRouter from "../rotas/empresaRouter";

const router = (app: express.Router) => {
    
    app.use("/administradores", adminstradorRouter);
    app.use("/usuarios", usuarioRouter);
    app.use("/enderecos", enderecoRouter);
    app.use("/academicos", academicoRoter);
    app.use("/empresas", empresaRouter);
};

export default router;