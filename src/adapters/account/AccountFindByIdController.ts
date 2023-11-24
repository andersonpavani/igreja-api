import { Express } from "express";
import AccountFindById from "../../core/account/service/AccountFindById";

export default class AccountFindByIdController {
    constructor(readonly server: Express, readonly useCase: AccountFindById) {
        server.get('/accounts/:id', async (req, res) => {
            const account = await useCase.execute(+req.params.id);
            return res.send(account);
        })
    }
}