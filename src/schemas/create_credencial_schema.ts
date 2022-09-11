import joi from "joi";
import { CredencialInsert } from "../types/Credencial";


const createCredencialSchema = joi.object<CredencialInsert>({
    email: joi.string().email().required(),
    url: joi.string().uri().required(),
    password: joi.string().required(),
    titulo: joi.string().min(1).required(),
    userId: joi.number().required()
});


export default createCredencialSchema;