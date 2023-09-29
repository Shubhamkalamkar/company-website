const userController = require('../../controllers/user/main.user.controller')
const authentication = require('../../middlewares/authentication')

const userRoute = require('express').Router()

userRoute.post('/create', authentication, userController.create)
userRoute.get('/getall', authentication, userController.getAll)
userRoute.get('/getbyid/:id', authentication, userController.getById)
module.exports = userRoute