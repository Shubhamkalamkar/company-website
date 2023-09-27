const jwt = require('jsonwebtoken')
require('dotenv').config()

const authentication = (req, res, next) => {
    try {
        let token = req.headers?.['token']
        if (!token) {
            // user sign up
            //need intern id
            console.log(req.body.isSignup)
            if (req.body.isSignup === true) {
                next()
            }
            else {
                let err = new Error('auth header not set')
                next(err)
            }

        }
        else {
            // admin add user
            let decode = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
            if (decode) {
                // console.log(decode)
                req.user = decode
                next()


            }
            else {
                let error = new Error('Invalid auth key');
                error.status = 401;
                throw error;
            }
        }
    } catch (err) {
        console.log('error in auth', err);
        next(err)
    }
}

module.exports = authentication