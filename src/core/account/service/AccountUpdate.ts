import UseCase from "../../shared/UseCase";
import AccountRepository from "./AccountRepository";
import { BadRequestError, NotFoundError } from "../../shared/ErrorHelpers";
import Account, { AccountType } from "../model/AccountModel";
import { Decimal } from "@prisma/client/runtime/library";

type Input = {
    id: number;
    name?: string;
    type?: AccountType;
    openingBalance?: Decimal;
    openingDate?: Date;
    closingDate?: Date;
    enable?: boolean;
    userId: number;
}

export default class AccountUpdate implements UseCase<Input, Account> {
    constructor(private readonly repository: AccountRepository) { }

    async execute(data: Input): Promise<Account> {
        const { id, name, type, openingBalance, openingDate, closingDate, enable, userId } = data;

        const account = await this.repository.findById(id);

        if (!account) {
            throw new NotFoundError('Conta não encontrada');
        }

        if (account.enable === true && enable === false) {
            //TODO - Só pode desativar se estiver com saldo 0
            //TODO - Só pode desativar se não houver movimentação em data superior a data de encerramento

            if (!closingDate) {
                throw new BadRequestError('Data de encerramento é obrigatória para desativar conta');
            }
        }



        return this.repository.update({ id, name, type, openingBalance, openingDate, closingDate, enable }, userId);
    }
}