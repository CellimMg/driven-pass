import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { UserInsert } from "../types/User";

import * as userRepository from "../repositories/user_repository";

export async function createUser(user: UserInsert){
    try {
        user.password = hashPassword(user.password);
        await userRepository.createUser(user);
    } catch (error) {
        console.log(error);
        throw error;
    }
} 


function hashPassword(password: string){
    const salt: number = parseInt(process.env.HASH_SALT!);
    return bcrypt.hashSync(password, salt);
}