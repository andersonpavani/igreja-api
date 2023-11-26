import { BadRequestError } from "../../shared/ErrorHelpers";
import UseCase from "../../shared/UseCase";
import User from "../model/UserModel";
import UserRepository from "./UserRepository";

export default class UserFindByPartialNameEmail implements UseCase<string, Partial<User[]>> {
    constructor(readonly repository: UserRepository) { }

    async execute(arg: string): Promise<Partial<User[]>> {
        if (arg.trim().length < 3) {
            throw new BadRequestError('Informe pelo menos 3 caracteres para pesquisa');
        }

        const users = await this.repository.findByPartialNameEmail(arg.trim());
        return users.filter(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }
}