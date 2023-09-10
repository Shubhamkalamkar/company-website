const User = require('../../../models/user/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = (req, res, next) => {
    const data = req.body;
    User.findOne({ email: data.email }).then((user) => {
        if (!user) {
            // If no user with the provided email exists, return an error
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        user.comparePassword(data.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (!isMatch) {
                // If the password does not match, return an error
                return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            }
            const tokenPayload = {
                email: user.email,
                _id: user._id,
                role: user.role,
            };
            const token = jwt.sign(tokenPayload, process.env.AUTH_TOKEN_SECRET);
            
            // Return the token in the response
            res.status(200).json({ message: 'Login successful', token });
        });
    })
    .catch((err) => {
        // Handle any other errors
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}

module.exports = login;
