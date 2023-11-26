import { Express } from "express";
import UserChangePassword from "../../core/user/service/UserChangePassword";
import Payload from "../../core/authenticate/model/AuthenticatePayloadModel";
import { ForbiddenError } from "../../core/shared/ErrorHelpers";

export default class UserChangePasswordController {
    constructor(readonly server: Express, readonly useCase: UserChangePassword) {
        server.patch('/users/changePassword', async (req, res) => {
            const payload = req.payload as Payload;
            const { id, oldPassword, newPassword } = req.body;

            await useCase.execute({ id, oldPassword, newPassword, payloadUserId: payload.userId, payloadUserType: payload.userType });

            return res.send({ message: 'Senha alterada com sucesso' });
        })
    }
}