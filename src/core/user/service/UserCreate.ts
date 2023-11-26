import validator from "validator";
import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";
import Crypt from "../../shared/Crypt";
import User from "../model/UserModel";
import { UserType } from "../model/UserModel";
import { BadRequestError } from "../../shared/ErrorHelpers";

type Input = {
    email: string;
    name: string;
    password: string;
    type: UserType;
}

export default class UserCreate implements UseCase<Input, Partial<User>> {
    constructor(private readonly repository: UserRepository, private readonly crypt: Crypt) { }

    async execute(data: Input): Promise<Partial<User>> {
        const requiredFields = ["email", "name", "password", "type"];

        for (const field of requiredFields) {
            if (!data?.[field as keyof Input]?.length) {
                throw new BadRequestError(`O campo ${field} é obrigatório`);
            }
        }

        if (!validator.isEmail(data.email)) {
            throw new BadRequestError('E-mail inválido');
        }

        const { email, name, password, type } = data;
        const passwordHashed = this.crypt.hash(password);

        const userExists = await this.repository.findByEmail(email);

        if (userExists) {
            throw new BadRequestError('E-Mail já cadastrado');
        }

        const { password: _, ...user } = await this.repository.create({ email, name, password: passwordHashed, type });

        return user;
    }
}