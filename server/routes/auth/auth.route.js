const logincontroller = require('../../controllers/auth/login/login.auth.controller')
const userStatus = require('../../controllers/auth/userStatus/userStatus.auth.controller')
const authntication = require('../../middlewares/authentication')

const authRoute = require('express').Router()

authRoute.post('/login',logincontroller)
authRoute.get('/userstatus', authntication ,userStatus)

module.exports = authRoute