import { Express } from "express";
import UserUpdate from "../../core/user/service/UserUpdate";
import Payload from "../../core/authenticate/model/AuthenticatePayloadModel";
import { ForbiddenError } from "../../core/shared/ErrorHelpers";

export default class UserUpdateController {
    constructor(readonly server: Express, readonly useCase: UserUpdate) {
        server.patch('/users', async (req, res) => {
            const payload = req.payload as Payload;
            const { id, email, name, type, enable } = req.body;

            if (id && payload.userType != 'Administrador') {
                throw new ForbiddenError('Apenas administradores podem alterar cadastro de outros usuários');
            }

            const user = await useCase.execute({ id: id ?? payload.userId, email, name, type, enable });

            return res.status(200).send(user);
        })
    }
}