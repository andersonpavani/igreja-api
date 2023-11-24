import { Express } from "express";
import UserCreate from "../../core/user/service/UserCreate";

export default class UserCreateController {
    constructor(readonly server: Express, readonly useCase: UserCreate) {
        server.post('/users', async (req, res) => {
            const { email, name, password, type } = req.body as any;
            const user = await useCase.execute({ email, name, password, type });

            return res.status(201).send(user);
        })
    }
}