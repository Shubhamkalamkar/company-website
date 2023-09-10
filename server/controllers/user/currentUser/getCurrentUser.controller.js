const User = require("../../../models/user/user.model");

const getCurrentUser = (req, res, next) => {
    let user = req.user;

    User.findOne({ email: user.email })
        .then((user) => {
            if (!user) {
                // User not found, return a 404 response
                return res.status(404).json({ message: 'User not found' });
            }
            res.send(user);
        })
        .catch((err) => {
            // Handle database errors
            console.error('Error finding user:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
};

module.exports = getCurrentUser;
