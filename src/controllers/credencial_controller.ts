import { Request, Response } from "express";
import { CredencialInsert } from "../types/Credencial";
import { CustomError } from "../types/Error";
import * as credencialService from "../services/credencial_service";

export async function createCredencial(req: Request, res: Response) {
    try {
        const credencial: CredencialInsert = req.body;
        await credencialService.createCredencial(credencial);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        switch (error) {
            case CustomError.ALREADY_EXISTS:
                return res.status(400).send({ message: "O usuário já possui uma credencial com este título!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function readCredencial(req: Request, res: Response) {
    try {
        const userId = res.locals.userId;
        const credencial = await credencialService.readCredencial(userId);
        return res.status(200).send({data: credencial});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(400).send({ message: "Sem credenciais salvas!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function readCredencialById(req: Request, res: Response) {
    try {
        const credencialId = req.params.id;
        const userId = res.locals.userId;
        const credencial = await credencialService.readCredencialById(parseInt(credencialId), userId);

        return res.status(200).send({data: credencial});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Esta credencial não existe!" });
            case CustomError.NOT_ALLOWED:
                return res.status(400).send({ message: "Esta credencial não pertence a você!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}