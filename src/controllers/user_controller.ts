import { Request, Response } from "express";
import { UserInsert } from "../types/User";
import * as userService from "../services/user_service";
import { CustomError } from "../types/Error";

export async function createUser(req: Request, res: Response) {
    try {
        const user: UserInsert = req.body;
        await userService.createUser(user);
        return res.sendStatus(201);
    } catch (error) {
        switch(error){
            case CustomError.ALREADY_EXISTS:
                return res.status(400).send({message: "Email já existe!"});
            default: 
                return res.sendStatus(500);
        }
    }
}

export async function signinUser(req: Request, res: Response){
    try {
        const user: UserInsert = req.body;
        const token = await userService.singinUser(user);
        return res.status(200).send({token: token});
    } catch (error) {
        switch(error){
            case CustomError.WRONG_CREDENTIALS:
                return res.status(400).send({message: "Email e/ou senha incorretos!"});
            default: 
                return res.sendStatus(500);
        }
    }
}