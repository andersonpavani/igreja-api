import { UserType } from "../../user/model/UserModel";


export default interface Payload {
    userId: number;
    userType: UserType;
}