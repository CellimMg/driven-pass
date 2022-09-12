import { NotaInsert } from "../types/Nota";
import { Request, Response } from "express";
import * as notaService from "../services/notas_service";
import { CustomError } from "../types/Error";

export async function createNota(req: Request, res: Response) {
    try {
        const nota: NotaInsert = req.body;
        await notaService.createNota(nota);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        switch (error) {
            case CustomError.ALREADY_EXISTS:
                return res.status(400).send({ message: "O usuário já possui uma nota com este título!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function readNotas(req: Request, res: Response) {
    try {
        const userId = res.locals.userId;
        const nota = await notaService.readNotas(userId);
        return res.status(200).send({data: nota});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Sem notas salvas!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function readNotaById(req: Request, res: Response) {
    try {
        const notaId = req.params.id;
        const userId = res.locals.userId;
        const nota = await notaService.readNotaById(parseInt(notaId), userId);

        return res.status(200).send({data: nota});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Esta nota não existe!" });
            case CustomError.NOT_ALLOWED:
                return res.status(401).send({ message: "Esta nota não pertence a você!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function deleteNotaById(req: Request, res: Response){
    try {
        const notaId = req.params.id;
        const userId = res.locals.userId;
        await notaService.deleteNotaById(parseInt(notaId), userId);

        return res.sendStatus(200);
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Esta nota não existe!" });
            case CustomError.NOT_ALLOWED:
                return res.status(401).send({ message: "Esta nota não pertence a você!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}