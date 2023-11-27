export type UserType = 'Administrador' | 'Usuario';

export default interface User {
    id?: number;
    email: string;
    name: string;
    password: string;
    type: UserType;
    enable?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    _count?: {
        accountsCreated: number;
        accountsUpdated: number;
        categoriesCreated: number;
        categoriesUpdated: number;
        peopleCreated: number;
        peopleUpdated: number;
    }
};