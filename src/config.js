export const  MONGODB_URI = 
    process.env.MONGODB_URI || 'mongodb://localhost:27017/aerolineaSKYGRUP'; // default to local MongoDB


export const PORT = process.env.PORT || 4000;


export const JWT_SECRET = process.env.JWT_SECRET || 'secret-key'; // default secret key for JWT

