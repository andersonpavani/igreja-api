import { Express } from 'express';
import UserFindAll from '../../core/user/service/UserFindAll';

export default class UserFindAllController {
    constructor(readonly server: Express, readonly useCase: UserFindAll) {
        server.get('/users', async (_, res) => {
            const users = await useCase.execute();

            return res.send(users);
        })
    }
}