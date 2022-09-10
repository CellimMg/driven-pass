import { Request, Response } from "express";
import { UserInsert } from "../types/User";
import * as userService from "../services/user_service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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