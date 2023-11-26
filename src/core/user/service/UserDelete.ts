import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";
import { MethodNotAllowedError, NotFoundError } from "../../shared/ErrorHelpers";
import User from "../model/UserModel";

export default class UserDelete implements UseCase<number, Partial<User>> {
    constructor(private readonly repository: UserRepository) { }

    async execute(id: number): Promise<Partial<User>> {
        const userWithDependents = await this.repository.countDependents(id);

        if (!userWithDependents) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const { _count: count } = userWithDependents;

        if ((count?.accountsCreated ?? 0 > 0) || (count?.accountsUpdated ?? 0 > 0)) {
            throw new MethodNotAllowedError('Existem contas cadastradas vinculadas a esse usuário');
        }

        //TODO - fazer verificações para saber se o usuário pode ser excluído

        const { password, ...user } = await this.repository.delete(id);

        return user;
    }
}