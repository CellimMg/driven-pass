import { Request, Response } from "express";
import { WifiInsert } from "../types/Wifi";
import { CustomError } from "../types/Error";
import * as wifiService from "../services/wifi_service";

export async function createWifi(req: Request, res: Response) {
    try {
        const wifi: WifiInsert = req.body;
        await wifiService.createWifi(wifi);
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function readWifi(req: Request, res: Response) {
    try {
        const userId = res.locals.userId;
        const wifi = await wifiService.readWifi(userId);
        return res.status(200).send({data: wifi});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Sem wifis salvos!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function readWifiById(req: Request, res: Response) {
    try {
        const wifiId = req.params.id;
        const userId = res.locals.userId;
        const wifi = await wifiService.readWifiById(parseInt(wifiId), userId);

        return res.status(200).send({data: wifi});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Este wifi não existe!" });
            case CustomError.NOT_ALLOWED:
                return res.status(401).send({ message: "Este wifi não pertence a você!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function deleteWifiById(req: Request, res: Response){
    try {
        const wifiId = req.params.id;
        const userId = res.locals.userId;
        await wifiService.deleteWifiById(parseInt(wifiId), userId);

        return res.sendStatus(200);
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Este wifi não existe!" });
            case CustomError.NOT_ALLOWED:
                return res.status(401).send({ message: "Este wifi não pertence a você!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}