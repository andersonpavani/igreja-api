import { Decimal } from "@prisma/client/runtime/library";

export type AccountType = 'Caixa' | 'Banco';

export default interface Account {
    id?: number;
    name: string;
    type: AccountType;
    openingBalance: Decimal;
    openingDate: Date;
    closingDate?: Date | null;
    enable?: boolean;
    _count?: {
        financialMovementInputs: number;
        financialMovementOutputs: number;
    }
};