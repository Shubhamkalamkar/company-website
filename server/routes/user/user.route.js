const userController = require('../../controllers/user/main.user.controller')

const userRoute = require('express').Router()

userRoute.post('/create', userController.create)

module.exports = userRoute