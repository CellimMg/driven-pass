import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import jwt, { JwtPayload } from "jsonwebtoken";
import { UserPayload } from "../types/User";

export async function tokenValidation(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.headers.authorization;
        jwt.verify(token!, process.env.TOKEN_SECRET!, (err, decoded) => {
            if(err) return res.sendStatus(401);
            console.log(decoded)
            const userId = (decoded as JwtPayload).id;
            res.locals.userId = userId;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}