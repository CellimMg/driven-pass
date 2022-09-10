import joi from "joi";
import { UserInsert } from "../types/User";


const signinSchema = joi.object<UserInsert>({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export default signinSchema;