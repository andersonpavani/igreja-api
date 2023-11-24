import { Express } from "express";
import AccountCreate from "../../core/account/service/AccountCreate";

export default class AccountCreateController {
    constructor(readonly server: Express, readonly useCase: AccountCreate) {
        server.post('/accounts', async (req, res) => {
            const { name, type, openingBalance } = req.body as any;
            const account = await useCase.execute({ name, type, openingBalance });

            return res.status(201).send(account);
        })
    }
}