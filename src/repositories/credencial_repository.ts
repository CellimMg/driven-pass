import { PrismaClient } from "@prisma/client";
import { CredencialInsert } from "../types/Credencial";
import { CustomError } from "../types/Error";

const prisma = new PrismaClient();

export async function createCredencial(credencial: CredencialInsert) {
    try {
        await prisma.credencial.create({ data: credencial });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}
export async function readCredencialAll(userId: number) {
    try {
        const credenciais = await prisma.credencial.findMany({where: {userId: userId}});
        return credenciais;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}
export async function readCredencialByUserId(userId: number) {
    try {
        const credencial = await prisma.credencial.findFirst({ where: { userId: userId } });

        if (!credencial) throw CustomError.NOT_FOUND;

        return credencial;
    } catch (error) {
        switch (error) {
            case "NOT_FOUND":
                throw CustomError.NOT_FOUND;
            default:
                throw CustomError.UNEXPECTED;
        }
    }
}

export async function readCredencialByUserIdAndTitulo(userId: number, titulo: string) {
    try {
        const credencial = await prisma.credencial.findFirst({ where: { userId: userId, titulo: titulo } });

        return credencial;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readCredencialById(id: number) {
    try {
        const credencial = await prisma.credencial.findFirst({ where: { id: id } });

        return credencial;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function deleteCredencialById(id: number) {
    try {
        await prisma.credencial.delete({ where: { id: id } });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}
