import User from '../models/users.model.js';
import bcryptjs from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { createAccesToken } from '../libs/jwt.js';



//http://localhost:4000/api/create

export const create =  async (req, res) => {

    try{
        //prueba 1
        console.log('Datos recib_idos:', req.body);

        const {email, password, role} = req.body;
        const userFound = await User.findOne({email});

        if (userFound) 
            return res.status(400).json({
                message: ['el usuario ya existe'],
            });


        //hashear contraseña 1
        const salt = await bcryptjs.genSalt(10); //genere los saltos y lo haga en 10
        const hashedPassword = await bcryptjs.hash(password, salt);

        //2
        const newUser = new User
        ({  email, 
            password: hashedPassword,
            role
        });
        console.log('Nuevo usuario creado:', newUser);


        const userSaved = await newUser.save(); 
        console.log('Usuario guardado:', userSaved);


        const token = await createAccesToken({
            id: userSaved._id,
        });
        console.log('Token generado:', token);


        
        res.cookie("token", token, {
            httpOnly: true,  // debe ser true pos seguriidad
            secure : process.env.NODE_ENV !== 'development',   // solo true para produccion 
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',   //nome para produccion
        });

        
        res.json({
            id:userSaved._id,
            email:userSaved.email,
            role:userSaved.role
        })
    
    }catch(error){
        console.log('error en el controlador create', error);
        res.status(500).json({message: error.message});
    }
}

//login
//http://localhost:4000/api/login
export const login = async(req, res) => {
    try {
        const { email, password} = req.body;

        const userFound= await User.findOne({ email });

        if(!userFound)
            return res.status(400).json({
            message: ['el email no esta registrado'],
        });

        //val_idar contraseña
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if(!isMatch)
            return res.status(400).json({
            message:['contraseña incorrecta']
        });

        //acceder al token 
        const token = await createAccesToken ({
            id: userFound._id,
            email: userFound.email,
        });

        //respuesta del cookie
        res.cookie("token", token,{
            httpOnly: true,
            secure : false,             //process.env.NODE_ENV === "production",
            sameSite: 'none',
        });

        //respuesta json 
        res.json({
            id:userFound._id,
            email:userFound.email,
        });

    } catch(error){
        res.status(500).json({message:error.message});
    }
};

export const verifyToken  = async (req, res) => {
    const {token} = req.cookies;
    if(!token) return res.json(false);

        jwt.verify(token, JWT_SECRET, async (err, User) => {
            if(err) return res.status(401);

            const userFound = await User.findById(User.id);

            if(!userFound) return res.status(401);
            
             return res.json({
            id:userFound._id,
            email:userFound.email,
            role: userFound.role,
        });
    })
}