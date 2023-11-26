import { Express } from "express";
import UserUpdate from "../../core/user/service/UserUpdate";
import Payload from "../../core/authenticate/model/AuthenticatePayloadModel";

export default class UserUpdateController {
    constructor(readonly server: Express, readonly useCase: UserUpdate) {
        server.patch('/users', async (req, res) => {
            const payload = req.payload as Payload;
            const { id, email, name, type, enable } = req.body;
            const user = await useCase.execute({ id, email, name, type, enable, payloadUserId: payload.userId, payloadUserType: payload.userType });
            return res.status(200).send(user);
        })
    }
}