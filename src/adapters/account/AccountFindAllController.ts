import { Express } from 'express';
import AccountFindAll from '../../core/account/service/AccountFindAll';

export default class AccountFindAllController {
    constructor(readonly server: Express, readonly useCase: AccountFindAll) {
        server.get('/accounts', async (req, res) => {
            const { onlyEnable } = req.body as any;
            const accounts = await useCase.execute(onlyEnable);

            return res.send(accounts);
        })
    }
}