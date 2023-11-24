import { NotFoundError } from '../../shared/ErrorHelpers';
import UseCase from '../../shared/UseCase';
import Account from '../model/AccountModel';
import AccountRepository from './AccountRepository';

export default class AccountFindById implements UseCase<number, Account | null> {
  constructor(private readonly repository: AccountRepository) { }

  async execute(id: number): Promise<Account | null> {
    const account = await this.repository.findById(id);

    if (!account) {
      throw new NotFoundError('Conta não encontrada');
    }

    return account;
  }
}