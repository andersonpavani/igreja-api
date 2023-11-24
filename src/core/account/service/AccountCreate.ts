import UseCase from "../../shared/UseCase";
import { BadRequestError } from "../../shared/ErrorHelpers";
import Account from "../model/AccountModel";
import AccountRepository from "./AccountRepository";
import { Prisma } from "@prisma/client";

export type inputType = 'Caixa' | 'Banco';

type Input = {
    name: string;
    type: inputType;
    openingBalance: Prisma.Decimal;
}

export default class AccountCreate implements UseCase<Input, Account> {
    constructor(private readonly repository: AccountRepository) { }

    async execute(data: Input): Promise<Account> {
        const { name, type, openingBalance } = data;

        const accountExists = await this.repository.findByName(name);

        if (accountExists) {
            throw new BadRequestError('Nome já utilizado');
        }

        return this.repository.create({ name, type, openingBalance });
    }
}