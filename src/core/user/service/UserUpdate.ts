import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";
import { ForbiddenError, NotFoundError } from "../../shared/ErrorHelpers";
import User, { UserType } from "../model/UserModel";

type Input = {
    id?: number;
    email?: string;
    name?: string;
    type?: UserType;
    enable?: boolean;
    payloadUserId: number,
    payloadUserType: UserType
}

export default class UserUpdate implements UseCase<Input, Partial<User>> {
    constructor(private readonly repository: UserRepository) { }

    async execute(data: Input): Promise<Partial<User>> {
        const { id, email, name, type, enable, payloadUserId, payloadUserType } = data;

        if (id && payloadUserType != 'Administrador') {
            throw new ForbiddenError('Apenas administradores podem alterar cadastro de outros usuários');
        }

        if (id === undefined && (type !== undefined || enable !== undefined)) {
            throw new ForbiddenError('Apenas seu Email e Nome podem ser alterados');
        }

        const userExists = await this.repository.findById(id ?? payloadUserId);

        if (!userExists) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const { password, ...user } = await this.repository.update(id === undefined ? { id: payloadUserId, email, name } : { id, email, name, type, enable });

        return user;
    }
}