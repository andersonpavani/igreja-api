import { Express } from 'express';
import UserFindByPartialNameEmail from '../../core/user/service/UserFindByPartialNameEmail';
import { BadRequestError } from '../../core/shared/ErrorHelpers';

export default class UserFindByPartialNameEmailController {
    constructor(readonly server: Express, readonly useCase: UserFindByPartialNameEmail) {
        server.get('/users/findByPartialNameEmail', async (req, res) => {
            const { arg } = req.body;

            if (!arg) {
                throw new BadRequestError('Argumento para pesquisa é obrigatório');
            }
            const users = await useCase.execute(arg);

            return res.send(users);
        })
    }
}