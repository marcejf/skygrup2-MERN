import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config..js";



export const auth = (req, res, next) => {


    try{
        const {token} = req.cookies;

        if (!token)
            return res.status(401).json({message: 'no token provided'});

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if(err)
                return res.status(401).json({ message:'unauthorized'});
            
            req.user = user;

            next();
        
        });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};