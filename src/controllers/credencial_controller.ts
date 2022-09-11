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
        switch (error) {
            case CustomError.ALREADY_EXISTS:
                return res.status(400).send({message: "O usuário já possui uma credencial com este título!"});
            default:
                break;
        }
        return res.sendStatus(500);
    }
}