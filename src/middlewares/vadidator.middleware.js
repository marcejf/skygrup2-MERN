export const validateSchema =  (schema) => {
    return  (req, res, next) => {
        try{
            schema.parse(req.body);
            next();

        } catch (error) {
            res.status(400).json({ message:error.errors.map((error) =>  error.message)});
        }
    }
};
