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

export default class UserCreate implements UseCase<Input, User> {
    constructor(private readonly repository: UserRepository, private readonly crypt: Crypt) { }

    async execute(data: Input): Promise<User> {
        const { email, name, password, type } = data;
        const passwordHashed = this.crypt.hash(password);

        const userExists = await this.repository.findByEmail(email);

        if (userExists) {
            throw new BadRequestError('E-Mail já cadastrado');
        }

        return this.repository.create({ email, name, password: passwordHashed, type });
    }
}