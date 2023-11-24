import { Express } from 'express';
import AccountFindAll from '../../core/account/service/AccountFindAll';

export default class AccountFindAllController {
    constructor(readonly server: Express, readonly useCase: AccountFindAll) {
        server.get('/accounts', async (_, res) => {
            const accounts = await useCase.execute();

            return res.send(accounts);
        })
    }
}