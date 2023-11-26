import { PrismaClient } from "@prisma/client";
import Account from "../../core/account/model/AccountModel";
import AccountRepository from "../../core/account/service/AccountRepository";

export default class AccountRepositoryPrisma implements AccountRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    findById(id: number): Promise<Account | null> {
        return this.prisma.account.findUnique({
            where: { id }
        })
    }

    findByName(name: string): Promise<Account | null> {
        return this.prisma.account.findUnique({
            where: { name }
        })
    }

    findAll(): Promise<Account[]> {
        return this.prisma.account.findMany();
    }

    create(account: Account, userId: number): Promise<Account> {
        return this.prisma.account.create({
            data: {
                ...account as Omit<Account, 'id'>,
                createdBy: {
                    connect: { id: userId },
                },
                updatedBy: {
                    connect: { id: userId }
                }
            }
        });
    }

    update(account: Partial<Account>, userId: number): Promise<Account> {
        return this.prisma.account.update({
            where: { id: account.id },
            data: {
                ...account as Omit<Account, 'id'>,
                updatedBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }

    delete(id: number): Promise<Account> {
        return this.prisma.account.delete({
            where: {
                id: id
            }
        })
    }
}