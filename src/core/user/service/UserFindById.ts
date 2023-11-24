import { NotFoundError } from '../../shared/ErrorHelpers';
import UseCase from '../../shared/UseCase';
import User from '../model/UserModel';
import UserRepository from './UserRepository';

export default class UserFindById implements UseCase<number, Partial<User> | null> {
  constructor(private readonly repository: UserRepository) { }

  async execute(id: number): Promise<Partial<User> | null> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const { password, ...rest } = user;

    return rest;
  }
}