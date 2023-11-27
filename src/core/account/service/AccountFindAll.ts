import UseCase from "../../shared/UseCase";
import Account from "../model/AccountModel";
import AccountRepository from "./AccountRepository";

export default class AccountFindAll implements UseCase<boolean, Account[]> {
    constructor(readonly repository: AccountRepository) { }

    async execute(onlyEnable: boolean): Promise<Account[]> {
        const account = await this.repository.findAll(onlyEnable);
        return account;
    }
}