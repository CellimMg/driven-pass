import { readCredencialByUserIdAndTitulo } from "../repositories/credencial_repository";
import { CredencialInsert } from "../types/Credencial";
import * as credencialRepository from "../repositories/credencial_repository";
import { CustomError } from "../types/Error";
import dotenv from "dotenv";
import cryptr from "cryptr";
dotenv.config();

const cryptrI = new cryptr(process.env.TOKEN_CRYPTR!);

export async function createCredencial(credencial: CredencialInsert) {
    try {
        const credencialByUserIdAndTitulo = await readCredencialByUserIdAndTitulo(credencial.userId, credencial.titulo);
        if (credencialByUserIdAndTitulo) throw CustomError.ALREADY_EXISTS;
        const newPassword = cryptrI.encrypt(credencial.password);
        credencial.password = newPassword;
        await credencialRepository.createCredencial(credencial);
    } catch (error) {
        console.log(error);
        throw error;
    }
}