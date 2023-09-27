const userRoute = require('./user/user.route')
const authRoute = require('./auth/auth.route')
const taskRoute = require('./task/task.route')

const mainRoute = require('express').Router();

mainRoute.use('/user',userRoute)
mainRoute.use('/auth',authRoute)
mainRoute.use('/tasks',taskRoute);

module.exports = mainRoute;