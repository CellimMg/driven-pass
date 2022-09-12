import { PrismaClient } from "@prisma/client";
import { CartaoInsert } from "../types/Cartao";
import { CustomError } from "../types/Error";

const prisma = new PrismaClient();

export async function createCartao(cartao: CartaoInsert) {
    try {
        await prisma.cartao.create({ data: cartao });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readCartaoAll(userId: number) {
    try {
        const cartoes = await prisma.cartao.findMany({where: {userId: userId}});
        return cartoes;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readCartaoByUserId(userId: number) {
    try {
        const cartao = await prisma.cartao.findFirst({ where: { userId: userId } });

        if (!cartao) throw CustomError.NOT_FOUND;

        return cartao;
    } catch (error) {
        switch (error) {
            case "NOT_FOUND":
                throw CustomError.NOT_FOUND;
            default:
                throw CustomError.UNEXPECTED;
        }
    }
}

export async function readCartaoByUserIdAndTitulo(userId: number, titulo: string) {
    try {
        const cartao = await prisma.cartao.findFirst({ where: { userId: userId, titulo: titulo } });

        return cartao;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readCartaoById(id: number) {
    try {
        const cartao = await prisma.cartao.findFirst({ where: { id: id } });

        return cartao;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function deleteCartaoById(id: number) {
    try {
        await prisma.cartao.delete({ where: { id: id } });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}
