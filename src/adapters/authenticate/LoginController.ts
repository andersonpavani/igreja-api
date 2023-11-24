import { Express } from "express";
import Login from "../../core/authenticate/service/Login";
import { BadRequestError } from "../../core/shared/ErrorHelpers";

export default class LoginController {
    constructor(readonly server: Express, readonly useCase: Login) {
        server.get('/login', async (req, res) => {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new BadRequestError('Dados incompleto');
            }

            const loginInfo = await useCase.execute({ email, password });
            return res.send(loginInfo);
        });
    }
}