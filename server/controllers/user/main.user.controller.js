const createUser = require('./create/create.user.controller');
const getCurrentUser = require('./currentUser/getCurrentUser.controller');

const userController = {
    create:createUser,
    getCurrentUser:getCurrentUser
}

module.exports = userController;