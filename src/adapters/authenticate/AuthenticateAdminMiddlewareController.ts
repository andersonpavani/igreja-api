import { Express, NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../../core/shared/ErrorHelpers";

export default class AuthenticateAdminMiddlewareController {
    constructor(readonly server: Express) {
        server.use(async (req: Request, res: Response, next: NextFunction) => {
            const { userType } = req.payload as any;

            if (userType != 'Administrador') {
                throw new ForbiddenError('Requer privilégio de Administrador');
            }

            next();
        });
    }
}