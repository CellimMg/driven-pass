import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export async function tokenValidation(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.headers.authorization;
        jwt.verify(token!, process.env.TOKEN_SECRET!, (err, decoded) => {
            if(err) return res.sendStatus(401);
            next();
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}