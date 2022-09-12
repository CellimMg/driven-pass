import joi from "joi"
import { WifiInsert } from "../types/Wifi"

const createWifiSchema = joi.object<WifiInsert>({
    nome: joi.string().required(),
    senha: joi.string().required(),
    titulo: joi.string().required(),
    userId: joi.number().required()
});


export default createWifiSchema;