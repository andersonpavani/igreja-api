import Account from '../model/AccountModel';

export default interface AccountRepository {
    findById(id: number): Promise<Account | null>;
    findByName(name: string): Promise<Account | null>;
    findAll(): Promise<Account[]>;
    create(account: Account): Promise<Account>;
    update(account: Partial<Account>): Promise<Account>;
};