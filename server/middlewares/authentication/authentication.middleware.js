const User = require("../../models/user/user.model");
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers?.['token'];
        if (!token) {
            let error = new Error('Authentication Header not set!');
            error.status = 401;
            throw error; // Use throw to trigger the catch block
        }

        let decode = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);

        if (decode) {
            const user = await User.findOne({ email: decode.email });
            if (!user) {
                let error = new Error('User not found');
                error.status = 401;
                throw error;
            }
            req.user = decode;
            next();
        } else {
            let error = new Error('Invalid auth key');
            error.status = 401;
            throw error;
        }
    } catch (err) {
        if (!err.status) err.status = 500; // Default to internal server error
        if (!err.message) err.message = 'Something went wrong during authentication!';
        next(err);
    }
}

module.exports = authMiddleware;
