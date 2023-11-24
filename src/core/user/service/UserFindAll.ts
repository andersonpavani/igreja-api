import UseCase from "../../shared/UseCase";
import User from "../model/UserModel";
import UserRepository from "./UserRepository";

export default class UserFindAll implements UseCase<void, User[]> {
    constructor(readonly repository: UserRepository) { }

    async execute(): Promise<User[]> {
        const users = await this.repository.findAll();
        return users;
    }
}