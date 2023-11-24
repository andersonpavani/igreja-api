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

    create(user: User): Promise<User> {
        return this.prisma.user.create({ data: user });
    }

    update(user: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { id: user.id },
            data: user
        });
    }
}