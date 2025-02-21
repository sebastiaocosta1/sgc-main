import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import { Login } from "../entidades/LoginEntity";

const loginRepository = AppDataSource.getRepository(Login);

export async function autenticarUsuario(usuario: string, senha: string) {
  const user = await loginRepository.findOne({ where: { usuario } });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const senhaCorreta = await bcrypt.compare(senha, user.senha);
  if (!senhaCorreta) {
    throw new Error("Senha incorreta.");
  }

  // Gerar token JWT
  const token = jwt.sign({ id: user.id, usuario: user.usuario }, "secreto", {
    expiresIn: "1h",
  });

  return { message: "Login bem-sucedido!", token };
}
