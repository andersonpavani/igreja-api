export default interface Crypt {
    hash(text: string): string;
    compare(password: string, passwordHashed: string): boolean;
};