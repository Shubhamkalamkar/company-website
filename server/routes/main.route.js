const userRoute = require('./user/user.route')
const authRoute = require('./auth/auth.route')

const mainRoute = require('express').Router();

mainRoute.use('/user',userRoute)
mainRoute.use('/auth',authRoute)

module.exports = mainRoute;