import joi from "joi";
import { UserInsert } from "../types/User";


const signinSchema = joi.object<UserInsert>({
    email: joi.string().email().required(),
    password: joi.string().required() //Por questões de segurança, não informa a quantidade de caracteres
});



//comentario de teste

export default signinSchema;