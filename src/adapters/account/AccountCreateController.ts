import { Express } from "express";
import AccountCreate from "../../core/account/service/AccountCreate";
import Payload from "../../core/authenticate/model/AuthenticatePayloadModel";

export default class AccountCreateController {
    constructor(readonly server: Express, readonly useCase: AccountCreate) {
        server.post('/accounts', async (req, res) => {
            const { name, type, openingBalance, openingDate } = req.body as any;
            const { userId } = req.payload as Payload;
            const account = await useCase.execute({ name, type, openingBalance, openingDate, userId });

            return res.status(201).send(account);
        })
    }
}