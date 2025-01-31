import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export async function createAccesToken(payload){

    return new Promise((resolve, reject) => {

        jwt.sign(payload, JWT_SECRET, {expiresIn: "1000h"},(err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
}  