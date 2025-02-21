import { Request, Response } from "express";
import { autenticarUsuario } from "../../dominio/repositorios/LoginRepository";


export async function loginController(req: Request, res: Response) {
  try {
    const { usuario, senha } = req.body;
    const resultado = await autenticarUsuario(usuario, senha);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
