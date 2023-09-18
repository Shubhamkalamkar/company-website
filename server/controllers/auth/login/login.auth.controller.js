const User = require('../../../models/user/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");


const login = (req, res, next) => {
    const data = req.body;
    // console.log(data)
    if(!data.email||!data.password){
        let error = new Error('email and password required')
       return next(error)
    }
    User.findOne({ email: data.email }).then((user) => {
        if (!user) {
            return res.status(401).json({ "Message": "Invalid Email " })
        } else {

            bcrypt.compare(data.password, user.password, (err, result) => {

                if (err) {
                    err.Message = "Error while verifying password";
                    throw err;
                }
                if (result === true) {
                    let tokenPayload = {
                        email: user.email,
                        // deviceType: deviceType,
                        _id: user._id,
                        role: user.role
                    };
                    let token = jwt.sign(tokenPayload, "jhubkwefkjfsdajfhv");
                    res.status(200).json({ Message: "signIn Successfully", role: user.role, token: token })
                } else {
                    let error = new Error("Invalid Password");
                    error.status = 404;
                    next(error);
                }
            })
            // else {
            //     return res.status(401).json({ "message": "Invalid Password " })
            // }
        }
    })

}

module.exports = login