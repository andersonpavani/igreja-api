export default interface Token {
    sign(payload: string | Object): string;
    verify(token: string): Object;
};