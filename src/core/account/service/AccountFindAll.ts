import UseCase from "../../shared/UseCase";
import Account from "../model/AccountModel";
import AccountRepository from "./AccountRepository";

export default class AccountFindAll implements UseCase<void, Account[]> {
    constructor(readonly repository: AccountRepository) { }

    async execute(): Promise<Account[]> {
        const account = await this.repository.findAll();
        return account;
    }
}