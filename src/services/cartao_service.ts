import { readCartaoByUserIdAndTitulo } from "../repositories/cartao_repository";
import { CartaoInsert } from "../types/Cartao";
import * as cartaoRepository from "../repositories/cartao_repository";
import { CustomError } from "../types/Error";
import dotenv from "dotenv";
import cryptr from "cryptr";
dotenv.config();

const cryptrI = new cryptr(process.env.TOKEN_CRYPTR!);

export async function createCartao(cartao: CartaoInsert) {
    try {
        const cartaoByUserIdAndTitulo = await readCartaoByUserIdAndTitulo(cartao.userId, cartao.titulo);
        if (cartaoByUserIdAndTitulo) throw CustomError.ALREADY_EXISTS;
        const newPassword = cryptrI.encrypt(cartao.senha);
        const newCvc = cryptrI.encrypt(cartao.cvc);
        cartao.senha = newPassword;
        cartao.cvc = newCvc;
        await cartaoRepository.createCartao(cartao);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function readCartao(userId: number) {
    try {
        const cartoes = await cartaoRepository.readCartaoAll(userId);

        for(let cartao of cartoes){
            cartao.senha = cryptrI.decrypt(cartao.senha);
            cartao.cvc = cryptrI.decrypt(cartao.cvc);
        }
        
        return cartoes;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function readCartaoById(id: number, userId: number) {
    try {
        const cartao = await cartaoRepository.readCartaoById(id);

        if(!cartao) throw CustomError.NOT_FOUND;
        if(cartao?.userId != userId) throw CustomError.NOT_ALLOWED;

        cartao.senha = cryptrI.decrypt(cartao.senha);
        cartao.cvc = cryptrI.decrypt(cartao.cvc);

        return cartao;    
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteCartaoById(id: number, userId: number) {
    try {
        const cartao = await cartaoRepository.readCartaoById(id);

        if(!cartao) throw CustomError.NOT_FOUND;
        if(cartao?.userId != userId) throw CustomError.NOT_ALLOWED;

        await cartaoRepository.deleteCartaoById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}