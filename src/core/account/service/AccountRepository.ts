import Account from '../model/AccountModel';

export default interface AccountRepository {
    findById(id: number): Promise<Account | null>;
    findByName(name: string): Promise<Account | null>;
    findAll(onlyEnable: boolean): Promise<Account[]>;
    create(account: Account, userId: number): Promise<Account>;
    update(account: Partial<Account>, userId: number): Promise<Account>;
    delete(id: number): Promise<Account>;
    countDependents(id: number): Promise<Account | null>;
};