import { readWifiByUserIdAndTitulo } from "../repositories/wifi_repository";
import { WifiInsert } from "../types/Wifi";
import * as wifiRepository from "../repositories/wifi_repository";
import { CustomError } from "../types/Error";
import dotenv from "dotenv";
import cryptr from "cryptr";
dotenv.config();

const cryptrI = new cryptr(process.env.TOKEN_CRYPTR!);

export async function createWifi(wifi: WifiInsert) {
    try {
        const newPassword = cryptrI.encrypt(wifi.senha);
        wifi.senha = newPassword;
        await wifiRepository.createWifi(wifi);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function readWifi(userId: number) {
    try {
        const wifis = await wifiRepository.readWifiAll(userId);

        for(let wifi of wifis){
            wifi.senha = cryptrI.decrypt(wifi.senha);
        }
        
        return wifis;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function readWifiById(id: number, userId: number) {
    try {
        const wifi = await wifiRepository.readWifiById(id);

        if(!wifi) throw CustomError.NOT_FOUND;
        if(wifi?.userId != userId) throw CustomError.NOT_ALLOWED;

        wifi.senha = cryptrI.decrypt(wifi.senha);

        return wifi;    
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteWifiById(id: number, userId: number) {
    try {
        const wifi = await wifiRepository.readWifiById(id);

        if(!wifi) throw CustomError.NOT_FOUND;
        if(wifi?.userId != userId) throw CustomError.NOT_ALLOWED;

        await wifiRepository.deleteWifiById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}