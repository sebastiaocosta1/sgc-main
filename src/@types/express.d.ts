import { Usuario } from "../dominio/entidades/UsuarioEntity";

declare global {
    namespace Exprss {
        export interface Request{
            usuarioLogado: Partial<Usuario>
        }
    }
}