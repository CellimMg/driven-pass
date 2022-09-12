import joi from "joi";
import { NotaInsert } from "../types/Nota";

const createNotaSchema = joi.object<NotaInsert>({
    anotacao: joi.string().min(0).max(1000).required(),
    titulo: joi.string().min(0).max(50).required(),
    userId: joi.number().required()
});

export default createNotaSchema;