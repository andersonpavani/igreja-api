import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";
import Crypt from "../../shared/Crypt";
import { BadRequestError, ForbiddenError, NotFoundError } from "../../shared/ErrorHelpers";
import { UserType } from "../model/UserModel";

type Input = {
    id: number;
    oldPassword?: string;
    newPassword: string;
    payloadUserId: number;
    payloadUserType: UserType;
}

export default class UserChangePassword implements UseCase<Input, void> {
    constructor(private readonly repository: UserRepository, private readonly crypt: Crypt) { }

    async execute(data: Input): Promise<void> {
        const { id, oldPassword, newPassword, payloadUserId, payloadUserType } = data;

        if (id && payloadUserType != 'Administrador') {
            throw new ForbiddenError('Apenas administradores podem alterar senha de outros usuários');
        }

        const user = await this.repository.findById(id ? id : payloadUserId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if (!id && !this.crypt.compare(oldPassword ? oldPassword : '', user.password)) {
            throw new BadRequestError('Senha atual inválida');
        }

        const newPasswordHashed = this.crypt.hash(newPassword);

        await this.repository.update({ id: user.id, password: newPasswordHashed });
    }
}