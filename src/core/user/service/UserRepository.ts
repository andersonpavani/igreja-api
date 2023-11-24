import User from '../model/UserModel';

export default interface UserRepository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(user: User): Promise<User>;
    update(user: Partial<User>): Promise<User>;
};