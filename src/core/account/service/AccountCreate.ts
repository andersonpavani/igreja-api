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
    openingDate: Date;
    userId: number;
}

export default class AccountCreate implements UseCase<Input, Account> {
    constructor(private readonly repository: AccountRepository) { }

    async execute(data: Input): Promise<Account> {
        if (!data.name.length) {
            throw new BadRequestError('O campo Nome é obrigatório');
        }

        if (!data.type) {
            throw new BadRequestError('O campo Tipo é obrigatório');
        }

        const { name, type, openingBalance, openingDate, userId } = data;

        const accountExists = await this.repository.findByName(name);

        if (accountExists) {
            throw new BadRequestError('Nome já utilizado');
        }

        return this.repository.create({ name, type, openingBalance, openingDate }, userId);
    }
}