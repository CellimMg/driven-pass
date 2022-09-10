import { Request, Response, NextFunction } from "express"
import joi from "joi";


export function schemaValidate(schema: joi.ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const {error} = schema.validate(req.body);
            if(error) return res.status(422).send({message: error.message});
            next();
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    };
}