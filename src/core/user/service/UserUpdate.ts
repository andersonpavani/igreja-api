import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";
import { NotFoundError } from "../../shared/ErrorHelpers";
import User, { UserType } from "../model/UserModel";

type Input = {
    id: number;
    email?: string;
    name?: string;
    type?: UserType;
    enable?: boolean;
}

export default class UserChangePassword implements UseCase<Input, User> {
    constructor(private readonly repository: UserRepository) { }

    async execute(data: Input): Promise<User> {
        const { id } = data;

        const user = await this.repository.findById(id);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return this.repository.update(data);
    }
}