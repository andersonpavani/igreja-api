import { PrismaClient } from "@prisma/client";
import User from "../../core/user/model/UserModel";
import UserRepository from "../../core/user/service/UserRepository";

export default class UserRepositoryPrisma implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }

    findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    findByPartialNameEmail(arg: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: arg
                        }
                    },
                    {
                        email: {
                            contains: arg
                        }
                    }
                ]
            }
        });
    }

    create(user: User): Promise<User> {
        return this.prisma.user.create({ data: user });
    }

    update(user: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { id: user.id },
            data: user
        });
    }

    delete(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id: id }
        });
    }

    countDependents(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                _count: {
                    select: {
                        accountsCreated: true,
                        accountsUpdated: true
                    }
                }
            }
        });
    }
}