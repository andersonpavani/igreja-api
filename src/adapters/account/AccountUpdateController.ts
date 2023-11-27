import { Express } from "express";
import AccountUpdate from "../../core/account/service/AccountUpdate";
import Payload from "../../core/authenticate/model/AuthenticatePayloadModel";

export default class AccountUpdateController {
    constructor(readonly server: Express, readonly useCase: AccountUpdate) {
        server.patch('/accounts', async (req, res) => {
            const payload = req.payload as Payload;
            const { id, name, type, openingBalance, openingDate, closingDate, enable } = req.body;
            const account = await useCase.execute({ id, name, type, openingBalance, openingDate, closingDate, enable, userId: payload.userId });
            return res.status(200).send(account);
        })
    }
}