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

    findAll(onlyEnable: boolean): Promise<Account[]> {
        if (onlyEnable) {
            return this.prisma.account.findMany({ where: { enable: true } });
        } else {
            return this.prisma.account.findMany();
        }
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

    async update(account: Partial<Account>, userId: number): Promise<Account> {
        await this.prisma.account.update({
            where: { id: account.id },
            data: account
        });

        return this.prisma.account.update({
            where: { id: account.id },
            data: {
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

    countDependents(id: number): Promise<Account | null> {
        return this.prisma.account.findUnique({
            where: {
                id: id
            },
            include: {
                _count: {
                    select: {
                        financialMovementInputs: true,
                        financialMovementOutputs: true
                    }
                }
            }
        });
    }
}