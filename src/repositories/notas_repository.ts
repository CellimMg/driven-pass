import { PrismaClient } from "@prisma/client";
import { CustomError } from "../types/Error";
import { NotaInsert } from "../types/Nota";

const prisma = new PrismaClient();

export async function createNota(nota: NotaInsert) {
    try {
        await prisma.nota.create({ data: nota });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readNotas(userId: number) {
    try {
        const notas = await prisma.nota.findMany({where: {userId: userId}});
        return notas;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readNotaById(id: number) {
    try {
        const nota = await prisma.nota.findFirst({ where: { id: id } });

        return nota;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readNotaByUserIdAndTitulo(userId: number, titulo: string) {
    try {
        const nota = await prisma.nota.findFirst({ where: { userId: userId, titulo: titulo } });

        return nota;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function deleteNotaById(id: number) {
    try {
        await prisma.nota.delete({ where: { id: id } });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

