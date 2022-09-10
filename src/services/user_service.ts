import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { UserInsert } from "../types/User";

import * as userRepository from "../repositories/user_repository";
import { User } from "@prisma/client";
import { CustomError } from "../types/Error";

export async function createUser(user: UserInsert) {
    try {
        user.password = hashPassword(user.password);
        await userRepository.createUser(user);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function singinUser(user: UserInsert): Promise<String> {
    try {
        const userData: User = await userRepository.readUser(user);

        if (!comparePassword(user.password, userData.password)) throw CustomError.WRONG_CREDENTIALS;

        const token = generateToken(userData);

        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


function generateToken(user: User): string {
    const payload = {
        id: user.id,
        email: user.email
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
        algorithm: "HS256",
        expiresIn: "1h"
    });

    return token;
}

function comparePassword(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
}

function hashPassword(password: string) {
    const salt: number = parseInt(process.env.HASH_SALT!);
    return bcrypt.hashSync(password, salt);
}