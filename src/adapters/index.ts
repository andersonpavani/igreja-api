import { Express } from 'express';
import Crypt from '../core/shared/Crypt';
import Token from '../core/shared/Token';
import UserCreate from '../core/user/service/UserCreate';
import UserCreateController from './user/UserCreateController';
import UserRepositoryPrisma from '../external/prisma/UserRepositoryPrisma';
import UserFindAll from '../core/user/service/UserFindAll';
import UserFindAllController from './user/UserFindAllController';
import UserFindById from '../core/user/service/UserFindById';
import UserFindByIdController from './user/UserFindByIdController';
import Login from '../core/authenticate/service/Login';
import LoginController from './authenticate/LoginController';
import UserChangePassword from '../core/user/service/UserChangePassword';
import UserChangePasswordController from './user/UserChangePasswordController';
import AuthenticateMiddlewareController from './authenticate/AuthenticateMiddlewareController';
import ErrorHandleController from './errorHandle/ErrorHandleController';
import AuthenticateAdminMiddlewareController from './authenticate/AuthenticateAdminMiddlewareController';
import AccountRepositoryPrisma from '../external/prisma/AccountRepositoryPrisma';
import AccountCreate from '../core/account/service/AccountCreate';
import AccountCreateController from './account/AccountCreateController';
import AccountFindAll from '../core/account/service/AccountFindAll';
import AccountFindAllController from './account/AccountFindAllController';
import AccountFindById from '../core/account/service/AccountFindById';
import AccountFindByIdController from './account/AccountFindByIdController';
import UserUpdate from '../core/user/service/UserUpdate';
import UserUpdateController from './user/UserUpdateController';

export default class Adapters {
    //TODO - Create abstraction of server api
    constructor(private readonly server: Express, private readonly crypt: Crypt, private readonly token: Token) {

        const userRepository = new UserRepositoryPrisma();

        const login = new Login(userRepository, this.crypt, this.token);
        new LoginController(this.server, login);


        //Middleware de autenticação de usuário logado
        new AuthenticateMiddlewareController(server, token);

        const userChangePassword = new UserChangePassword(userRepository, this.crypt);
        new UserChangePasswordController(this.server, userChangePassword);

        const userUpdate = new UserUpdate(userRepository);
        new UserUpdateController(this.server, userUpdate);

        const accountRepository = new AccountRepositoryPrisma();

        const accountCreate = new AccountCreate(accountRepository);
        new AccountCreateController(this.server, accountCreate);

        const accountFindAll = new AccountFindAll(accountRepository);
        new AccountFindAllController(this.server, accountFindAll);

        const accountFindById = new AccountFindById(accountRepository);
        new AccountFindByIdController(this.server, accountFindById)


        //Middleware de autenticação de usuário ADMINISTRADOR logado
        new AuthenticateAdminMiddlewareController(server);

        const userCreate = new UserCreate(userRepository, this.crypt);
        new UserCreateController(this.server, userCreate);

        const userFindAll = new UserFindAll(userRepository);
        new UserFindAllController(this.server, userFindAll);

        const userfindById = new UserFindById(userRepository);
        new UserFindByIdController(this.server, userfindById);


        //Middleware de manipulação de erros do app !!!DEVE FICAR POR ÚLTIMO!!!
        new ErrorHandleController(server);
    }
}