import User from '../model/UserModel';

export default interface UserRepository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByPartialNameEmail(arg: string): Promise<User[]>;
    create(user: User): Promise<User>;
    update(user: Partial<User>): Promise<User>;
    delete(userId: number): Promise<User>;
    countDependents(id: number): Promise<User | null>;
};