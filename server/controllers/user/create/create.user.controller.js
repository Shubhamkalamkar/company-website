const User = require('../../../models/user/user.model');
const bcrypt = require('bcrypt');

const createUser = (req, res, next) => {
    const data = req.body;

    bcrypt.hash(data.password, 10, async (err, encrypted) => {
        if (err) {
            err.message = 'Something went wrong while hashing the password!';
            if (!err.status) err.status = 503;
            next(err);
        } else {
            // Hashed password is available here
            console.log(encrypted);

            // Update the password in the data object
            data.password = encrypted;

            // Create the user and save it to the database
            const user = new User(data);
            user
                .save()
                .then(() => {
                    res.send('User Created Successfully');
                })
                .catch((err) => {
                    if (err.code === 11000 && err.keyPattern.email === 1) {
                        // Handle duplicate key error (E11000) for the email field
                        const duplicateError = new Error('Email address is already in use.');
                        duplicateError.status = 400; // You can set an appropriate status code
                        next(duplicateError);
                    } else if (err.code === 11000 && err.keyPattern.internId === 1) {
                        // Handle duplicate key error (E11000) for the internId field
                        const duplicateError = new Error('InternId is already in use.');
                        duplicateError.status = 400; // You can set an appropriate status code
                        next(duplicateError);
                    } else {
                        // Handle other errors
                        if (!err.message) err.message = 'Error while creating user';
                        if (!err.status) err.status = 400;
                        next(err);
                    }
                });
        }
    });
};

module.exports = createUser;
