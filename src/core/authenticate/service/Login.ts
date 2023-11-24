import UseCase from '../../shared/UseCase';
import UserRepository from '../../user/service/UserRepository';
import Crypt from "../../shared/Crypt";
import Token from '../../shared/Token';
import { NotFoundError } from '../../shared/ErrorHelpers';


type Input = {
    email: string;
    password: string;
}

const ErrorMessage = 'E-Mail não encontrado ou Senha inválida';

export default class Login implements UseCase<Input, Object> {
    constructor(private readonly repository: UserRepository, private readonly crypt: Crypt, private readonly token: Token) { }

    async execute(data: Input): Promise<Object> {
        const { email, password } = data;

        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new NotFoundError(ErrorMessage);
        }

        const passwordMatch = this.crypt.compare(password, user.password);

        if (!passwordMatch || !user.enable) {
            throw new NotFoundError(ErrorMessage);
        }

        const profile = { id: user.id, email: user.email, name: user.name, type: user.type };

        const tokenText = this.token.sign({ userId: profile.id, userType: profile.type });
        return { profile, token: tokenText };
    }
}