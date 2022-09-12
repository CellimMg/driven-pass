import joi from "joi";
import { CartaoInsert } from "../types/Cartao";

const patternCVC = "^[0-9]{3}$"
const patternNumero = "^[0-9]{16}$"
const patternSenha = "^[0-9]{4}$"

const createCartaoSchema = joi.object<CartaoInsert>({
    nome: joi.string().min(1).required(),
    titulo: joi.string().required(),
    userId: joi.number().required(),
    virtual: joi.boolean().required(),
    cvc: joi.string().regex(new RegExp(patternCVC)).required(),
    numero: joi.string().regex(new RegExp(patternNumero)).required(),
    senha: joi.string().regex(new RegExp(patternSenha)).required(),
    tipo: joi.string().valid("credito", "debito", "ambos").required()
});

export default createCartaoSchema;