import { Express, NextFunction, Request, Response } from "express";
import Token from "../../core/shared/Token";
import { BadRequestError, UnauthorizedError } from "../../core/shared/ErrorHelpers";

const ErrorMessage = 'Não autorizado';

export default class AuthenticateMiddlewareController {
    constructor(readonly server: Express, readonly token: Token) {
        server.use(async (req: Request, res: Response, next: NextFunction) => {
            const { authorization } = req.headers;

            if (!authorization) {
                throw new UnauthorizedError(ErrorMessage);
            }

            const [type, tokenText] = authorization.split(' ');

            if (type !== 'Bearer' || !tokenText) {
                throw new BadRequestError('Estrutura de autenticação inválida');
            }

            try {
                const payload = this.token.verify(tokenText);
                req.payload = payload;
            } catch (error) {
                throw new UnauthorizedError(ErrorMessage);
            }

            next();
        });
    }
}