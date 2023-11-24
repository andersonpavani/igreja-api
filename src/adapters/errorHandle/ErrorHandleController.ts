import { Express, NextFunction, Request, Response } from 'express'
import { AppError } from '../../core/shared/ErrorHelpers'

export default class ErrorHandleController {
    constructor(readonly server: Express) {
        server.use((error: Error & Partial<AppError>, req: Request, res: Response, next: NextFunction) => {
            const statusCode = error.statusCode ?? 500;
            const message = error.statusCode ? error.message : 'Internal Server Error';
            return res.status(statusCode).json({ message });
        });
    }
}
