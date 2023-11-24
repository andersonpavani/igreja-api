import { Express } from "express";
import UserChangePassword from "../../core/user/service/UserChangePassword";
import Payload from "../../core/authenticate/model/AuthenticatePayloadModel";
import { ForbiddenError } from "../../core/shared/ErrorHelpers";

export default class UserChangePasswordController {
    constructor(readonly server: Express, readonly useCase: UserChangePassword) {
        server.put('/users/changePassword', async (req, res) => {
            const payload = req.payload as Payload;
            const { id, oldPassword, newPassword } = req.body;

            let verifyOldPassword = true;

            if (id) {
                if (payload.userType != 'Administrador') {
                    throw new ForbiddenError('Apenas administradores podem alterar senha de outros usuários');
                }

                verifyOldPassword = false;
            }

            await useCase.execute({ id: id ?? payload.userId, oldPassword: oldPassword ?? '', newPassword, verifyOldPassword });

            return res.send({ message: 'Senha alterada com sucesso' });
        })
    }
}