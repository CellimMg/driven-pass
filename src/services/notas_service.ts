import * as notaRepository from "../repositories/notas_repository";
import { CustomError } from "../types/Error";
import { NotaInsert } from "../types/Nota";

export async function createNota(nota: NotaInsert) {
    try {
        const notaByUserIdAndTitulo = await notaRepository.readNotaByUserIdAndTitulo(nota.userId, nota.titulo);
        if (notaByUserIdAndTitulo) throw CustomError.ALREADY_EXISTS;
        
        
        await notaRepository.createNota(nota);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function readNotas(userId: number) {
    try {
        const notas = await notaRepository.readNotas(userId);
        
        return notas;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function readNotaById(id: number, userId: number) {
    try {
        const nota = await notaRepository.readNotaById(id);

        if(!nota) throw CustomError.NOT_FOUND;
        if(nota?.userId != userId) throw CustomError.NOT_ALLOWED;

        return nota;    
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteNotaById(id: number, userId: number) {
    try {
        const nota = await notaRepository.readNotaById(id);

        if(!nota) throw CustomError.NOT_FOUND;
        if(nota?.userId != userId) throw CustomError.NOT_ALLOWED;

        await notaRepository.deleteNotaById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}