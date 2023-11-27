import UseCase from "../../shared/UseCase";
import AccountRepository from "./AccountRepository";
import { MethodNotAllowedError, NotFoundError } from "../../shared/ErrorHelpers";
import Account from "../model/AccountModel";

export default class AccountDelete implements UseCase<number, Account> {
    constructor(private readonly repository: AccountRepository) { }

    async execute(id: number): Promise<Account> {
        const accountWithDependents = await this.repository.countDependents(id);

        if (!accountWithDependents) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const { _count: count } = accountWithDependents;

        if ((count?.financialMovementInputs ?? 0 > 0) || (count?.financialMovementOutputs ?? 0 > 0)) {
            throw new MethodNotAllowedError('Existem movimentações lançadas vinculadas a essa conta');
        }

        const account = await this.repository.delete(id);

        return account;
    }
}