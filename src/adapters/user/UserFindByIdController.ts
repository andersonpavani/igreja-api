import { Express } from "express";
import UserFindById from "../../core/user/service/UserFindById";

export default class UserFindByIdController {
    constructor(readonly server: Express, readonly useCase: UserFindById) {
        server.get('/users/:id', async (req, res) => {
            const user = await useCase.execute(+req.params.id);
            return res.send(user);
        })
    }
}