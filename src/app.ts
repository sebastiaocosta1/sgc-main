import express, { Request, Response } from "express";
import { AppDataSource } from "./infraestrutura/config/dataSource";
import router from "./apresentacao/rotas";
import cors = require("cors");
import path from "path";
const nodemailer = require('nodemailer');
require("dotenv").config();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

const EMAIL_USER = 'scostadasilva584@gmail.com';
const EMAIL_PASS = 'mdto ifyj nwpe dsui';

app.post('/enviar-email', async (req, res) => {
  const { para, assunto, mensagem } = req.body;

  if (!para || !assunto || !mensagem) {
    return res.status(400).json({ erro: "Campos obrigatórios: para, assunto, mensagem" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: para,
      subject: assunto,
      text: mensagem,
    });

    res.json({ sucesso: true, mensagem: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao enviar email', detalhes: error.message });
  }
});

export default app;
