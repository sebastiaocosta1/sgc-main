import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../infraestrutura/config/dataSource";
import { Usuario } from "../../dominio/entidades/UsuarioEntity";

type JwtPayload = { id: number };

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ mensagem: "Acesso não autorizado. Token ausente ou inválido." });
        }

        const token = authorization.split(" ")[1];

        let decodedToken: JwtPayload;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;
        } catch (error) {
            return res.status(401).json({ mensagem: "Token inválido ou expirado." });
        }

        const usuarioRepository = AppDataSource.getRepository(Usuario);
        const usuarioExistente = await usuarioRepository.findOneBy({ idUsuario: decodedToken.id });

        if (!usuarioExistente) {
            return res.status(401).json({ mensagem: "Acesso não autorizado. Usuário não encontrado." });
        }

        const { senha: _, ...usuarioLogado } = usuarioExistente;

        req.usuarioExistente = usuarioLogado;

        next();
    } catch (error) {
        console.error("Erro no middleware de autenticação:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};
