const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        let token = req.headers?.['token']
        if (!token) {
            // user sign up
            //need intern id
            next()
        }
        else {
            // admin add user
            let decode = jwt.verify(token, "jhubkwefkjfsdajfhv");
            if (decode) {
                console.log(decode)
                req.user = decode
                if (decode.role == "admin") {
                    next()
                }
                else {
                    return res.status(401).json({ Message: "user not authorized " })
                }
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