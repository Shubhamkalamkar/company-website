const userController = require('../../controllers/user/main.user.controller')
const authentication = require('../../middlewares/authentication')

const userRoute = require('express').Router()

userRoute.post('/create', authentication, userController.create)

module.exports = userRoute