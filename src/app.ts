import express, { Request, Response } from "express";
import { AppDataSource } from "./infraestrutura/config/dataSource";
import router from "./apresentacao/rotas";
import cors = require("cors");
import path from "path";
require("dotenv").config();

const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use("/curriculos", express.static(path.join(__dirname, "..", "curriculos")));
app.use(express.json());
app.use(cors(corsOptions));
router(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => {
    console.log(erro);
  });

export default app;
