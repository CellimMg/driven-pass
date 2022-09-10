import { PrismaClient } from "@prisma/client";
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