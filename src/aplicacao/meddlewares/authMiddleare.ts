import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
type JwtPayload = { id: number};

export const authMiddleare = async (req: Request, res: Response, next: NextFunction) => {
 const { authorization } = req.headers;
    
if(!authorization){
    return res.status(401).json({mensagem: "Acesso não autorizado."})
    }
const token = authorization.split(' ')[1]
const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
if(id != null){
     next()
}
    return res.status(401).json({mensagem: "Acesso não autorizado."})


}