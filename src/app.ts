import express, { Request, Response } from "express";
import { AppDataSource } from "./infraestrutura/config/dataSource";
const jwt = require("jsonwebtoken");
import router from "./apresentacao/rotas";
import cors = require("cors");
require('dotenv').config();

const corsOptions = {
  origin: ["http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],             
  allowedHeaders: ["Content-Type", "Authorization"],    
  credentials: true                                      
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
router(router);

AppDataSource.initialize().then( () => {
  console.log("Banco de dados conecetado")
})
.catch((erro) => {
  console.log(erro);
})


export default app;
