import jwt from "jsonwebtoken";
import Token from "../../core/shared/Token";

export default class Jwt implements Token {
    constructor(private readonly secret: string) { }

    sign(payload: string | Object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '1d' });
    }

    verify(token: string): Object {
        const payload = jwt.verify(token, this.secret);
        return payload;
    }
}