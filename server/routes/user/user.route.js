const userController = require('../../controllers/user/main.user.controller')
const getCurrentUser = require('../../controllers/user/main.user.controller')
const authMiddleware = require('../../middlewares/authentication/authentication.middleware')

const userRoute = require('express').Router()

userRoute.post('/create', userController.create)
userRoute.get('/getCurrentUser', authMiddleware ,userController.getCurrentUser)

module.exports = userRoute