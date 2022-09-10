import joi from "joi";
import { UserInsert } from "../types/User";


const userSchema = joi.object<UserInsert>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default userSchema;