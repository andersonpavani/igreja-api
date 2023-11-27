import { Express } from "express";
import AccountDelete from "../../core/account/service/AccountDelete";

export default class AccountDeleteController {
    constructor(readonly server: Express, readonly useCase: AccountDelete) {
        server.delete('/accounts/:id', async (req, res) => {
            await useCase.execute(+req.params.id);
            return res.status(200).send({ message: 'Conta deletada com sucesso' });
        })
    }
}