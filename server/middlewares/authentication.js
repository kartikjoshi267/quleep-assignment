import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
    try {
        const authHeader = String(req.headers.authorization.split(' ')[1]);
        if (!authHeader) {
            return res.status(401).json({ "error": "Please use a valid authentication token" });
        }

        const secret = process.env.JWT_SECRET_STRING;
        const token_verification = jwt.verify(authHeader, secret);
        req.user = token_verification;
    } catch (error) {
    	console.log(error);
        return res.status(500).send({ error: "Internal Server error occured" });
    }
    next();
}

export default authenticate;
