import { PrismaClient, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { CustomError } from "../types/Error";
import { UserInsert } from "../types/User";

const prisma = new PrismaClient();

export async function createUser(user: UserInsert){
    try {
        await prisma.user.create({data: user});
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    throw CustomError.ALREADY_EXISTS;
            }
        }
        throw CustomError.UNEXPECTED;
    }
}

export async function readUser(user: UserInsert): Promise<User>{
    try {
        const userReturn: User | null = await prisma.user.findFirst({
            where: {
                email: user.email
            }, 
        });
        
        if(!userReturn) throw CustomError.WRONG_CREDENTIALS;

        return userReturn;
    } catch (error) {
        switch(error){
            case "WRONG_CREDENTIALS":
                throw CustomError.WRONG_CREDENTIALS;
            default:
                throw CustomError.UNEXPECTED;
        }
    } 
}