import joi from "joi";
import { UserInsert } from "../types/User";


const signupSchema = joi.object<UserInsert>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export default signupSchema;