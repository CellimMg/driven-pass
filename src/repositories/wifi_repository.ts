import { PrismaClient } from "@prisma/client";
import { WifiInsert } from "../types/Wifi";
import { CustomError } from "../types/Error";

const prisma = new PrismaClient();

export async function createWifi(wifi: WifiInsert) {
    try {
        await prisma.wifi.create({ data: wifi });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readWifiAll(userId: number) {
    try {
        const wifis = await prisma.wifi.findMany({where: {userId: userId}});
        return wifis;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readWifiByUserId(userId: number) {
    try {
        const wifi = await prisma.wifi.findFirst({ where: { userId: userId } });

        if (!wifi) throw CustomError.NOT_FOUND;

        return wifi;
    } catch (error) {
        switch (error) {
            case "NOT_FOUND":
                throw CustomError.NOT_FOUND;
            default:
                throw CustomError.UNEXPECTED;
        }
    }
}

export async function readWifiByUserIdAndTitulo(userId: number, titulo: string) {
    try {
        const wifi = await prisma.wifi.findFirst({ where: { userId: userId, titulo: titulo } });

        return wifi;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function readWifiById(id: number) {
    try {
        const wifi = await prisma.wifi.findFirst({ where: { id: id } });

        return wifi;
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}

export async function deleteWifiById(id: number) {
    try {
        await prisma.wifi.delete({ where: { id: id } });
    } catch (error) {
        throw CustomError.UNEXPECTED;
    }
}
