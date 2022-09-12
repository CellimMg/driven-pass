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

export async function readCredencial(userId: number) {
    try {
        const credencials = await credencialRepository.readCredencialAll(userId);

        for(let credencial of credencials){
            credencial.password = cryptrI.decrypt(credencial.password);
        }
        
        return credencials;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function readCredencialById(id: number, userId: number) {
    try {
        const credencial = await credencialRepository.readCredencialById(id);

        if(!credencial) throw CustomError.NOT_FOUND;
        if(credencial?.userId != userId) throw CustomError.NOT_ALLOWED;

        credencial.password = cryptrI.decrypt(credencial.password);

        return credencial;    
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteCredencialById(id: number, userId: number) {
    try {
        const credencial = await credencialRepository.readCredencialById(id);

        if(!credencial) throw CustomError.NOT_FOUND;
        if(credencial?.userId != userId) throw CustomError.NOT_ALLOWED;

        await credencialRepository.deleteCredencialById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}