import { Express } from "express";
import UserDelete from "../../core/user/service/UserDelete";

export default class UserDeleteController {
    constructor(readonly server: Express, readonly useCase: UserDelete) {
        server.delete('/users/:id', async (req, res) => {
            await useCase.execute(+req.params.id)
            return res.status(200).send({ message: 'Usuário deletado com sucesso' });
        })
    }
}