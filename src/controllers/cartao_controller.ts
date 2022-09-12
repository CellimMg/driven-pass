import { Request, Response } from "express";
import { CartaoInsert } from "../types/Cartao";
import { CustomError } from "../types/Error";
import * as cartaoService from "../services/cartao_service";

export async function createCartao(req: Request, res: Response) {
    try {
        const cartao: CartaoInsert = req.body;
        await cartaoService.createCartao(cartao);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        switch (error) {
            case CustomError.ALREADY_EXISTS:
                return res.status(400).send({ message: "O usuário já possui um cartao com este título!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function readCartao(req: Request, res: Response) {
    try {
        const userId = res.locals.userId;
        const cartao = await cartaoService.readCartao(userId);
        return res.status(200).send({data: cartao});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Sem cartões salvos!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function readCartaoById(req: Request, res: Response) {
    try {
        const cartaoId = req.params.id;
        const userId = res.locals.userId;
        const cartao = await cartaoService.readCartaoById(parseInt(cartaoId), userId);

        return res.status(200).send({data: cartao});
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Este cartao não existe!" });
            case CustomError.NOT_ALLOWED:
                return res.status(401).send({ message: "Este cartao não pertence a você!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}

export async function deleteCartaoById(req: Request, res: Response){
    try {
        const cartaoId = req.params.id;
        const userId = res.locals.userId;
        await cartaoService.deleteCartaoById(parseInt(cartaoId), userId);

        return res.sendStatus(200);
    } catch (error) {
        switch (error) {
            case CustomError.NOT_FOUND:
                return res.status(404).send({ message: "Este cartao não existe!" });
            case CustomError.NOT_ALLOWED:
                return res.status(401).send({ message: "Este cartao não pertence a você!" });
            default:
                break;
        }
        return res.sendStatus(500);
    }
}