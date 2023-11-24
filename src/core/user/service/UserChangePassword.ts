import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";
import Crypt from "../../shared/Crypt";
import { BadRequestError, NotFoundError } from "../../shared/ErrorHelpers";

type Input = {
    id: number;
    oldPassword: string;
    newPassword: string;
    verifyOldPassword: boolean;
}

export default class UserChangePassword implements UseCase<Input, void> {
    constructor(private readonly repository: UserRepository, private readonly crypt: Crypt) { }

    async execute(data: Input): Promise<void> {
        const { id, oldPassword, newPassword, verifyOldPassword } = data;

        const user = await this.repository.findById(id);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        if (verifyOldPassword && !this.crypt.compare(oldPassword, user.password)) {
            throw new BadRequestError('Senha atual inválida');
        }

        const newPasswordHashed = this.crypt.hash(newPassword);

        const userEdited = { id: user.id, password: newPasswordHashed };

        await this.repository.update(userEdited);
    }
}