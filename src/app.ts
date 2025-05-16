import express, { Request, Response, Application } from "express";
import { AppDataSource } from "./infraestrutura/config/dataSource";
import router from "./apresentacao/rotas";
import cors from "cors";
import path from "path";
import { Empresa } from "./dominio/entidades/EmpresaEntity";
import { Academico } from "./dominio/entidades/AcademicoEntity";
import { Administrador } from "./dominio/entidades/AdministradorEntity";
import bcrypt from "bcrypt";


const nodemailer = require('nodemailer');
require("dotenv").config();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app: Application = express();
app.use("/curriculos", express.static(path.join(__dirname, "..", "curriculos")));
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => {
    console.log(erro);
  });

const EMAIL_USER = 'scostadasilva584@gmail.com';
const EMAIL_PASS = 'mdto ifyj nwpe dsui';

app.post('/enviar-email', async (req: Request, res: Response) => {
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

app.post("/recuperar-senha", async (req: Request, res: Response) => {
  const { email, novaSenha } = req.body;

  if (!email || !novaSenha) {
    return res.status(400).json({ erro: "Campos obrigatórios: email e novaSenha" });
  }

  if (novaSenha.length < 6) {
    return res.status(400).json({ erro: "A nova senha deve ter pelo menos 6 caracteres." });
  }

  try {
    const empresaRepo = AppDataSource.getRepository(Empresa);
    const academicoRepo = AppDataSource.getRepository(Academico);
    const administradorRepo = AppDataSource.getRepository(Administrador);

    let usuarioParaAtualizar = null;

    const empresa = await empresaRepo.findOne({
      where: { emailResponsavelLegal: email },
      relations: ["usuario"],
    });

    if (empresa) {
      usuarioParaAtualizar = empresa.usuario;
    }

    if (!usuarioParaAtualizar) {
      const academico = await academicoRepo.findOne({
        where: { email },
        relations: ["usuario"],
      });
      if (academico) {
        usuarioParaAtualizar = academico.usuario;
      }
    }

    // Se ainda não achou, busca no administrador
    // if (!usuarioParaAtualizar) {
    //   const administrador = await administradorRepo.findOne({
    //     where: { email },
    //     relations: ["usuario"],
    //   });
    //   if (administrador) {
    //     usuarioParaAtualizar = administrador.usuario;
    //   }
    // }

    if (!usuarioParaAtualizar) {
      return res.status(404).json({ erro: "Usuário não encontrado com esse e-mail." });
    }

    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    usuarioParaAtualizar.senha = senhaCriptografada;

    const usuarioRepo = AppDataSource.getRepository("Usuario");
    await usuarioRepo.save(usuarioParaAtualizar);

    return res.status(200).json({ mensagem: "Senha atualizada com sucesso." });

  } catch (error) {
    console.error("Erro ao recuperar senha:", error);
    return res.status(500).json({ erro: "Erro interno ao tentar recuperar a senha." });
  }
});



export default app;
