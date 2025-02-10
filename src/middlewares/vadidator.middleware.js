export const validateSchema =  (schema) => {
    return  (req, res, next) => {
        try{
            schema.parse(req.body);
            next();

        } catch (error) {
            console.log("error de validacion", error.errors);
            return res.status(400).json({ message:error.errors.map((error) =>  error.message)});
        }
    }
};
