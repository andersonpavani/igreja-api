import Crypt from "../../core/shared/Crypt";
import bcrypt from "bcrypt";

export default class BCrypt implements Crypt {
    hash(text: string): string {
        return bcrypt.hashSync(text, 7);
    }

    compare(password: string, passwordHashed: string): boolean {
        return bcrypt.compareSync(password, passwordHashed);
    }
}